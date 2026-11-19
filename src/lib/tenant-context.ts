import { getRequestHeaders } from "@tanstack/react-start/server";
import { getAuth } from "@/lib/auth";
import { getPrisma } from "@/lib/db";

export type TenantContext = {
  userId: string;
  organizationId: string;
  role: string;
};

/**
 * Resolve the tenant from the verified Better Auth session, never from a
 * client-provided organizationId. Every future server function that reads or
 * writes tenant data should call this helper first and scope its Prisma query
 * by the returned organizationId.
 */
export async function requireTenantContext(): Promise<TenantContext> {
  const session = await getAuth().api.getSession({ headers: getRequestHeaders() });
  if (!session) throw new Error("Authentication required.");

  const organizationId = session.session.activeOrganizationId;
  if (!organizationId) throw new Error("No active organization is selected.");

  const membership = await getPrisma().member.findUnique({
    where: {
      organizationId_userId: {
        organizationId,
        userId: session.user.id,
      },
    },
    select: { role: true },
  });

  if (!membership) throw new Error("You do not have access to this organization.");

  return {
    userId: session.user.id,
    organizationId,
    role: membership.role,
  };
}

export function requireOrganizationRole(
  context: TenantContext,
  allowedRoles: readonly string[],
): void {
  const memberRoles = context.role.split(",").map((role) => role.trim());
  if (!allowedRoles.some((role) => memberRoles.includes(role))) {
    throw new Error("You do not have permission to perform this action.");
  }
}
