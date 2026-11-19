
import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { getPrisma } from "@/lib/db";
import {
  requireOrganizationRole,
  requireTenantContext,
} from "@/lib/tenant-context";

const taskStatusSchema = z.enum([
  "TODO",
  "IN_PROGRESS",
  "BLOCKED",
  "DONE",
]);

const taskPrioritySchema = z.enum([
  "LOW",
  "MEDIUM",
  "HIGH",
  "URGENT",
]);

const createTaskInput = z.object({
  eventId: z.string().min(1),
  title: z.string().trim().min(2).max(180),
  description: z.string().trim().max(4000).optional(),
  status: taskStatusSchema.default("TODO"),
  priority: taskPrioritySchema.default("MEDIUM"),
  dueAt: z.coerce.date().optional(),
});

const updateTaskInput = z.object({
  id: z.string().min(1),
  title: z.string().trim().min(2).max(180).optional(),
  description: z.string().trim().max(4000).nullable().optional(),
  status: taskStatusSchema.optional(),
  priority: taskPrioritySchema.optional(),
  dueAt: z.coerce.date().nullable().optional(),
});

const deleteTaskInput = z.object({
  id: z.string().min(1),
});

export const listOrganizationTasks = createServerFn({
  method: "GET",
}).handler(async () => {
  const tenant = await requireTenantContext();

  const rows = await getPrisma().task.findMany({
    where: {
      organizationId: tenant.organizationId,
    },
    orderBy: [
      { dueAt: "asc" },
      { createdAt: "desc" },
    ],
    select: {
      id: true,
      eventId: true,
      title: true,
      description: true,
      status: true,
      priority: true,
      dueAt: true,
      createdAt: true,
      updatedAt: true,
      event: {
        select: {
          name: true,
        },
      },
      assignee: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
    },
  });

  return rows.map((task) => ({
    ...task,
    dueAt: task.dueAt?.toISOString() ?? null,
    createdAt: task.createdAt.toISOString(),
    updatedAt: task.updatedAt.toISOString(),
  }));
});

export const createOrganizationTask = createServerFn({
  method: "POST",
})
  .validator((input: unknown) => createTaskInput.parse(input))
  .handler(async ({ data }) => {
    const tenant = await requireTenantContext();

    requireOrganizationRole(tenant, [
      "owner",
      "admin",
      "manager",
    ]);

    const event = await getPrisma().event.findFirst({
      where: {
        id: data.eventId,
        organizationId: tenant.organizationId,
      },
      select: {
        id: true,
      },
    });

    if (!event) {
      throw new Error(
        "Selected event was not found in this organization.",
      );
    }

    const task = await getPrisma().task.create({
      data: {
        organizationId: tenant.organizationId,
        eventId: event.id,
        title: data.title,
        description: data.description ?? null,
        status: data.status,
        priority: data.priority,
        dueAt: data.dueAt ?? null,
        createdById: tenant.userId,
      },
      select: {
        id: true,
      },
    });

    return { id: task.id };
  });

export const updateOrganizationTask = createServerFn({
  method: "POST",
})
  .validator((input: unknown) => updateTaskInput.parse(input))
  .handler(async ({ data }) => {
    const tenant = await requireTenantContext();

    requireOrganizationRole(tenant, [
      "owner",
      "admin",
      "manager",
    ]);

    const existing = await getPrisma().task.findFirst({
      where: {
        id: data.id,
        organizationId: tenant.organizationId,
      },
      select: {
        id: true,
      },
    });

    if (!existing) {
      throw new Error("Task not found.");
    }

    const { id, ...changes } = data;

    const completionUpdate =
      changes.status === undefined
        ? {}
        : {
            completedAt:
              changes.status === "DONE" ? new Date() : null,
          };

    const updated = await getPrisma().task.update({
      where: {
        id: existing.id,
      },
      data: {
        ...(changes.title !== undefined && {
          title: changes.title,
        }),
        ...(changes.description !== undefined && {
          description: changes.description,
        }),
        ...(changes.status !== undefined && {
          status: changes.status,
        }),
        ...(changes.priority !== undefined && {
          priority: changes.priority,
        }),
        ...(changes.dueAt !== undefined && {
          dueAt: changes.dueAt,
        }),
        ...completionUpdate,
      },
      select: {
        id: true,
      },
    });

    return { id: updated.id };
  });

export const deleteOrganizationTask = createServerFn({
  method: "POST",
})
  .validator((input: unknown) => deleteTaskInput.parse(input))
  .handler(async ({ data }) => {
    const tenant = await requireTenantContext();

    requireOrganizationRole(tenant, [
      "owner",
      "admin",
      "manager",
    ]);

    const result = await getPrisma().task.deleteMany({
      where: {
        id: data.id,
        organizationId: tenant.organizationId,
      },
    });

    if (result.count === 0) {
      throw new Error("Task not found.");
    }

    return { success: true };
  });
