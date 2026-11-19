import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { getPrisma } from "@/lib/db";
import { requireOrganizationRole, requireTenantContext } from "@/lib/tenant-context";

const createEventInput = z.object({
  name: z.string().trim().min(2).max(160),
  description: z.string().trim().max(4000).optional(),
  eventType: z.string().trim().min(2).max(80),
  startAt: z.coerce.date(),
  endAt: z.coerce.date().optional(),
  timezone: z.string().trim().min(2).max(80).default("Asia/Kolkata"),
  venueName: z.string().trim().max(180).optional(),
  city: z.string().trim().min(2).max(100),
  state: z.string().trim().max(100).optional(),
  budget: z.number().nonnegative().max(9_999_999_999).optional(),
  currency: z.string().length(3).default("INR"),
});

export const listOrganizationEvents = createServerFn({ method: "GET" }).handler(async () => {
  const tenant = await requireTenantContext();
  const events = await getPrisma().event.findMany({
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
  });

  return events.map((event) => ({
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
  }));
});

export const createOrganizationEvent = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => createEventInput.parse(input))
  .handler(async ({ data }) => {
    const tenant = await requireTenantContext();
    requireOrganizationRole(tenant, ["owner", "admin", "manager"]);

    if (data.endAt && data.endAt < data.startAt) {
      throw new Error("Event end date must be after the start date.");
    }

    // Keep the business write and its audit entry atomic. If audit logging
    // fails, the event creation rolls back instead of silently losing history.
    return getPrisma().$transaction(async (tx) => {
      const event = await tx.event.create({
        data: {
          organizationId: tenant.organizationId,
          createdById: tenant.userId,
          name: data.name,
          description: data.description ?? null,
          eventType: data.eventType,
          startAt: data.startAt,
          endAt: data.endAt ?? null,
          timezone: data.timezone,
          venueName: data.venueName ?? null,
          city: data.city,
          state: data.state ?? null,
          budget: data.budget ?? null,
          currency: data.currency.toUpperCase(),
        },
        select: {
          id: true,
          name: true,
          status: true,
          startAt: true,
          endAt: true,
          city: true,
          venueName: true,
          budget: true,
          currency: true,
        },
      });

      await tx.auditLog.create({
        data: {
          organizationId: tenant.organizationId,
          actorId: tenant.userId,
          action: "event.created",
          entityType: "Event",
          entityId: event.id,
          metadata: { name: event.name },
        },
      });

      // TanStack server functions must return transport-safe values. Prisma
      // Decimal and Date instances are normalized to strings at this boundary.
      return {
        id: event.id,
        name: event.name,
        status: event.status,
        startAt: event.startAt.toISOString(),
        endAt: event.endAt?.toISOString() ?? null,
        city: event.city,
        venueName: event.venueName,
        budget: event.budget?.toString() ?? null,
        currency: event.currency,
      };
    });
  });
