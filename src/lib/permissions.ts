import { createAccessControl } from "better-auth/plugins/access";
import {
  adminAc,
  defaultStatements,
  memberAc,
  ownerAc,
} from "better-auth/plugins/organization/access";

const statement = {
  ...defaultStatements,
  event: ["create", "read", "update", "delete"],
  task: ["create", "read", "update", "delete", "assign"],
  vendor: ["create", "read", "update", "delete"],
  finance: ["read", "create", "update", "approve"],
  workforce: ["read", "create", "update", "delete", "assign"],
  sponsor: ["read", "create", "update", "delete"],
  venue: ["read", "create", "update", "delete", "book"],
  document: ["read", "create", "delete"],
  report: ["read", "export"],
} as const;

export const organizationAccess = createAccessControl(statement);

export const ownerRole = organizationAccess.newRole({
  ...ownerAc.statements,
  event: ["create", "read", "update", "delete"],
  task: ["create", "read", "update", "delete", "assign"],
  vendor: ["create", "read", "update", "delete"],
  finance: ["read", "create", "update", "approve"],
  workforce: ["read", "create", "update", "delete", "assign"],
  sponsor: ["read", "create", "update", "delete"],
  venue: ["read", "create", "update", "delete", "book"],
  document: ["read", "create", "delete"],
  report: ["read", "export"],
});

export const adminRole = organizationAccess.newRole({
  ...adminAc.statements,
  event: ["create", "read", "update", "delete"],
  task: ["create", "read", "update", "delete", "assign"],
  vendor: ["create", "read", "update", "delete"],
  finance: ["read", "create", "update", "approve"],
  workforce: ["read", "create", "update", "delete", "assign"],
  sponsor: ["read", "create", "update", "delete"],
  venue: ["read", "create", "update", "delete", "book"],
  document: ["read", "create", "delete"],
  report: ["read", "export"],
});

export const managerRole = organizationAccess.newRole({
  ...memberAc.statements,
  event: ["create", "read", "update"],
  task: ["create", "read", "update", "delete", "assign"],
  vendor: ["create", "read", "update"],
  finance: ["read"],
  workforce: ["read", "create", "update", "assign"],
  sponsor: ["read", "update"],
  venue: ["read", "book"],
  document: ["read", "create"],
  report: ["read", "export"],
});

export const memberRole = organizationAccess.newRole({
  ...memberAc.statements,
  event: ["read"],
  task: ["read", "create", "update"],
  vendor: ["read"],
  finance: ["read"],
  workforce: ["read"],
  sponsor: ["read"],
  venue: ["read"],
  document: ["read", "create"],
  report: ["read"],
});

export const organizationRoles = {
  owner: ownerRole,
  admin: adminRole,
  manager: managerRole,
  member: memberRole,
};
