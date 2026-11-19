import { createServerFn } from "@tanstack/react-start";
import { getPrisma } from "@/lib/db";
import { requireTenantContext } from "@/lib/tenant-context";

const MONTH_COUNT = 6;

function getMonthStart(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}

function monthKey(date: Date): string {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
}

function monthLabel(date: Date): string {
  return new Intl.DateTimeFormat("en-IN", { month: "short" }).format(date);
}

export const getOrganizationOverview = createServerFn({ method: "GET" }).handler(
  async () => {
    const tenant = await requireTenantContext();
    const prisma = getPrisma();
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const chartStart = new Date(now.getFullYear(), now.getMonth() - (MONTH_COUNT - 1), 1);

    const [
      events,
      tasks,
      paidExpenseAggregate,
      submittedExpenseCount,
      paidExpensesForChart,
      recentAuditLogs,
      upcomingTasks,
      overdueTaskCount,
      blockedTaskCount,
    ] = await Promise.all([
      prisma.event.findMany({
        where: { organizationId: tenant.organizationId },
        orderBy: { startAt: "asc" },
        select: {
          id: true,
          name: true,
          eventType: true,
          status: true,
          startAt: true,
          endAt: true,
          city: true,
          venueName: true,
          budget: true,
          currency: true,
        },
      }),
      prisma.task.findMany({
        where: { organizationId: tenant.organizationId },
        select: { id: true, status: true },
      }),
      prisma.expense.aggregate({
        where: { organizationId: tenant.organizationId, status: "PAID" },
        _sum: { amount: true },
      }),
      prisma.expense.count({
        where: { organizationId: tenant.organizationId, status: "SUBMITTED" },
      }),
      prisma.expense.findMany({
        where: {
          organizationId: tenant.organizationId,
          status: "PAID",
          expenseDate: { gte: chartStart },
        },
        select: { amount: true, expenseDate: true },
      }),
      prisma.auditLog.findMany({
        where: { organizationId: tenant.organizationId },
        orderBy: { createdAt: "desc" },
        take: 6,
        select: {
          id: true,
          action: true,
          entityType: true,
          createdAt: true,
          actor: { select: { name: true } },
        },
      }),
      prisma.task.findMany({
        where: {
          organizationId: tenant.organizationId,
          status: { not: "DONE" },
          dueAt: { not: null },
        },
        orderBy: { dueAt: "asc" },
        take: 4,
        select: {
          id: true,
          title: true,
          status: true,
          priority: true,
          dueAt: true,
          event: { select: { name: true } },
          assignee: { select: { name: true } },
        },
      }),
      prisma.task.count({
        where: {
          organizationId: tenant.organizationId,
          status: { not: "DONE" },
          dueAt: { lt: now },
        },
      }),
      prisma.task.count({
        where: { organizationId: tenant.organizationId, status: "BLOCKED" },
      }),
    ]);

    const upcomingEvents = events.filter(
      (event) =>
        event.startAt >= today &&
        event.status !== "COMPLETED" &&
        event.status !== "CANCELLED",
    );
    const completedEvents = events.filter((event) => event.status === "COMPLETED").length;
    const totalBudget = events.reduce(
      (sum, event) => sum + (event.budget ? Number(event.budget) : 0),
      0,
    );
    const actualExpenses = Number(paidExpenseAggregate._sum.amount ?? 0);
    const doneTasks = tasks.filter((task) => task.status === "DONE").length;
    const inProgressTasks = tasks.filter((task) => task.status === "IN_PROGRESS").length;
    const todoTasks = tasks.filter((task) => task.status === "TODO").length;
    const blockedTasks = tasks.filter((task) => task.status === "BLOCKED").length;
    const activeTasks = tasks.length - doneTasks;

    const monthly = new Map<string, { month: string; planned: number; actual: number }>();
    for (let offset = 0; offset < MONTH_COUNT; offset += 1) {
      const month = new Date(chartStart.getFullYear(), chartStart.getMonth() + offset, 1);
      monthly.set(monthKey(month), {
        month: monthLabel(month),
        planned: 0,
        actual: 0,
      });
    }

    for (const event of events) {
      const key = monthKey(event.startAt);
      const bucket = monthly.get(key);
      if (bucket) bucket.planned += event.budget ? Number(event.budget) : 0;
    }

    for (const expense of paidExpensesForChart) {
      const key = monthKey(expense.expenseDate);
      const bucket = monthly.get(key);
      if (bucket) bucket.actual += Number(expense.amount);
    }

    const recentActivity = recentAuditLogs.map((log) => ({
      id: log.id,
      who: log.actor?.name ?? "Workspace member",
      action: log.action.replace(/[._]/g, " "),
      entity: log.entityType,
      time: log.createdAt.toISOString(),
    }));

    return {
      generatedAt: now.toISOString(),
      metrics: {
        totalEvents: events.length,
        upcomingEvents: upcomingEvents.length,
        completedEvents,
        activeTasks,
        totalTasks: tasks.length,
        doneTasks,
        inProgressTasks,
        todoTasks,
        blockedTasks,
        totalBudget,
        actualExpenses,
        budgetUtilization: totalBudget > 0 ? (actualExpenses / totalBudget) * 100 : 0,
        pendingApprovals: submittedExpenseCount,
        overdueTasks: overdueTaskCount,
        blockedTaskCount,
      },
      upcomingEvents: upcomingEvents.slice(0, 4).map((event) => ({
        id: event.id,
        name: event.name,
        eventType: event.eventType,
        status: event.status,
        startAt: event.startAt.toISOString(),
        endAt: event.endAt?.toISOString() ?? null,
        city: event.city,
        venueName: event.venueName,
        budget: event.budget?.toString() ?? null,
        currency: event.currency,
      })),
      budgetSeries: [...monthly.values()].map((item) => ({
        month: item.month,
        planned: item.planned,
        actual: item.actual,
      })),
      recentActivity,
      upcomingTasks: upcomingTasks.map((task) => ({
        id: task.id,
        title: task.title,
        status: task.status,
        priority: task.priority,
        dueAt: task.dueAt?.toISOString() ?? null,
        eventName: task.event.name,
        assigneeName: task.assignee?.name ?? "Unassigned",
      })),
      attentionItems: [
        ...(submittedExpenseCount > 0
          ? [{ id: "pending-expenses", title: "Expenses awaiting approval", detail: `${submittedExpenseCount} submitted expense${submittedExpenseCount === 1 ? "" : "s"}`, label: "Review" }]
          : []),
        ...(blockedTaskCount > 0
          ? [{ id: "blocked-tasks", title: "Blocked tasks need attention", detail: `${blockedTaskCount} blocked task${blockedTaskCount === 1 ? "" : "s"}`, label: "Resolve" }]
          : []),
        ...(overdueTaskCount > 0
          ? [{ id: "overdue-tasks", title: "Overdue tasks", detail: `${overdueTaskCount} task${overdueTaskCount === 1 ? "" : "s"} past due`, label: "Review" }]
          : []),
      ],
    };
  },
);
