import { createServerFn } from "@tanstack/react-start";
import { getRequestHeaders } from "@tanstack/react-start/server";
import { getAuth } from "@/lib/auth";
import { getPrisma } from "@/lib/db";

export type CurrentUserContext = {
  id: string;
  name: string;
  email: string;
  platformRole: string;
  activeOrganizationId: string | null;
};

/**
 * Return only session data that has been re-checked against the database.
 * In particular, never trust activeOrganizationId from the session alone:
 * confirm the user still has a membership in that organization.
 */
export const getCurrentUser = createServerFn({ method: "GET" }).handler(
  async (): Promise<CurrentUserContext | null> => {
    const session = await getAuth().api.getSession({ headers: getRequestHeaders() });
    if (!session) return null;

    const organizationId = session.session.activeOrganizationId ?? null;
    const [user, membership] = await Promise.all([
      getPrisma().user.findUnique({
        where: { id: session.user.id },
        select: { platformRole: true },
      }),
      organizationId
        ? getPrisma().member.findUnique({
            where: {
              organizationId_userId: {
                organizationId,
                userId: session.user.id,
              },
            },
            select: { id: true },
          })
        : Promise.resolve(null),
    ]);

    return {
      id: session.user.id,
      name: session.user.name,
      email: session.user.email,
      platformRole: user?.platformRole ?? "USER",
      activeOrganizationId: membership ? organizationId : null,
    };
  },
);
