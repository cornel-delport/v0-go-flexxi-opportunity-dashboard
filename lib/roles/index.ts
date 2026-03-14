"""
// lib/roles/index.ts

// 1. ROLE DEFINITIONS
export const ROLES = {
  SUPER_ADMIN: 'super_admin',
  ADMIN: 'admin',
  REVIEWER: 'reviewer',
  ANALYST: 'analyst',
  COMPLIANCE_OFFICER: 'compliance_officer',
  READ_ONLY: 'read_only',
  PENDING: 'pending', // Default role for new users
} as const;

export type Role = typeof ROLES[keyof typeof ROLES];

// 2. RESOURCE DEFINITIONS (MODULES)
export const RESOURCES = {
  DASHBOARD: 'dashboard',
  OPPORTUNITIES: 'opportunities',
  REVIEWS: 'reviews',
  SOURCES: 'sources',
  CAMPAIGNS: 'campaigns',
  USERS: 'users',
  SETTINGS: 'settings',
  AUDIT_LOGS: 'audit_logs',
  INTEGRATIONS: 'integrations',
  ROLES: 'roles',
} as const;

export type Resource = typeof RESOURCES[keyof typeof RESOURCES];

// 3. ACTION DEFINITIONS (PERMISSIONS)
export const ACTIONS = {
  CREATE: 'create',
  READ: 'read',
  UPDATE: 'update',
  DELETE: 'delete',
  APPROVE: 'approve',
  REJECT: 'reject',
  EXPORT: 'export',
  ASSIGN: 'assign',
} as const;

export type Action = typeof ACTIONS[keyof typeof ACTIONS];

// 4. PERMISSION MATRIX
// Maps roles to their allowed actions for each resource.
// Format: Record<Role, Partial<Record<Resource, Action[]>>>
const PERMISSIONS: Record<Role, Partial<Record<Resource, readonly Action[]>>> = {
  [ROLES.SUPER_ADMIN]: {
    // Super Admin has all permissions on all resources
    [RESOURCES.DASHBOARD]: [ACTIONS.READ, ACTIONS.EXPORT],
    [RESOURCES.OPPORTUNITIES]: [ACTIONS.CREATE, ACTIONS.READ, ACTIONS.UPDATE, ACTIONS.DELETE, ACTIONS.EXPORT],
    [RESOURCES.REVIEWS]: [ACTIONS.CREATE, ACTIONS.READ, ACTIONS.UPDATE, ACTIONS.DELETE, ACTIONS.APPROVE, ACTIONS.REJECT],
    [RESOURCES.SOURCES]: [ACTIONS.CREATE, ACTIONS.READ, ACTIONS.UPDATE, ACTIONS.DELETE],
    [RESOURCES.CAMPAIGNS]: [ACTIONS.CREATE, ACTIONS.READ, ACTIONS.UPDATE, ACTIONS.DELETE],
    [RESOURCES.USERS]: [ACTIONS.CREATE, ACTIONS.READ, ACTIONS.UPDATE, ACTIONS.DELETE],
    [RESOURCES.ROLES]: [ACTIONS.ASSIGN],
    [RESOURCES.SETTINGS]: [ACTIONS.READ, ACTIONS.UPDATE],
    [RESOURCES.AUDIT_LOGS]: [ACTIONS.READ, ACTIONS.EXPORT],
    [RESOURCES.INTEGRATIONS]: [ACTIONS.CREATE, ACTIONS.READ, ACTIONS.UPDATE, ACTIONS.DELETE],
  },
  [ROLES.ADMIN]: {
    // Admin has similar permissions but cannot manage super_admins or critical settings
    [RESOURCES.DASHBOARD]: [ACTIONS.READ, ACTIONS.EXPORT],
    [RESOURCES.OPPORTUNITIES]: [ACTIONS.CREATE, ACTIONS.READ, ACTIONS.UPDATE, ACTIONS.DELETE, ACTIONS.EXPORT],
    [RESOURCES.REVIEWS]: [ACTIONS.CREATE, ACTIONS.READ, ACTIONS.UPDATE, ACTIONS.DELETE, ACTIONS.APPROVE, ACTIONS.REJECT],
    [RESOURCES.SOURCES]: [ACTIONS.CREATE, ACTIONS.READ, ACTIONS.UPDATE, ACTIONS.DELETE],
    [RESOURCES.CAMPAIGNS]: [ACTIONS.CREATE, ACTIONS.READ, ACTIONS.UPDATE, ACTIONS.DELETE],
    [RESOURCES.USERS]: [ACTIONS.CREATE, ACTIONS.READ, ACTIONS.UPDATE, ACTIONS.DELETE],
    [RESOURCES.ROLES]: [ACTIONS.ASSIGN],
    [RESOURCES.SETTINGS]: [ACTIONS.READ, ACTIONS.UPDATE],
    [RESOURCES.AUDIT_LOGS]: [ACTIONS.READ],
    [RESOURCES.INTEGRATIONS]: [ACTIONS.CREATE, ACTIONS.READ, ACTIONS.UPDATE, ACTIONS.DELETE],
  },
  [ROLES.REVIEWER]: {
    [RESOURCES.DASHBOARD]: [ACTIONS.READ],
    [RESOURCES.OPPORTUNITIES]: [ACTIONS.READ, ACTIONS.UPDATE],
    [RESOURCES.REVIEWS]: [ACTIONS.CREATE, ACTIONS.READ, ACTIONS.UPDATE, ACTIONS.APPROVE, ACTIONS.REJECT],
    [RESOURCES.SOURCES]: [ACTIONS.READ],
  },
  [ROLES.ANALYST]: {
    [RESOURCES.DASHBOARD]: [ACTIONS.READ, ACTIONS.EXPORT],
    [RESOURCES.OPPORTUNITIES]: [ACTIONS.READ, ACTIONS.EXPORT],
    [RESOURCES.REVIEWS]: [ACTIONS.READ],
    [RESOURCES.SOURCES]: [ACTIONS.READ],
    [RESOURCES.CAMPAIGNS]: [ACTIONS.READ],
  },
  [ROLES.COMPLIANCE_OFFICER]: {
    [RESOURCES.DASHBOARD]: [ACTIONS.READ],
    [RESOURCES.OPPORTUNITIES]: [ACTIONS.READ],
    [RESOURCES.REVIEWS]: [ACTIONS.READ],
    [RESOURCES.SOURCES]: [ACTIONS.READ],
    [RESOURCES.AUDIT_LOGS]: [ACTIONS.READ, ACTIONS.EXPORT],
  },
  [ROLES.READ_ONLY]: {
    [RESOURCES.DASHBOARD]: [ACTIONS.READ],
    [RESOURCES.OPPORTUNITIES]: [ACTIONS.READ],
  },
  [ROLES.PENDING]: {
    // Pending users have no permissions
  },
};


// 5. REUSABLE AUTHORIZATION HELPERS

/**
 * Checks if a role has a specific permission for a resource.
 *
 * @param role The user's role.
 * @param resource The resource being accessed.
 * @param action The action being performed.
 * @returns True if the user has the permission, false otherwise.
 */
export function hasPermission(role: Role, resource: Resource, action: Action): boolean {
  if (!role) {
    return false;
  }
  
  const rolePermissions = PERMISSIONS[role];
  if (!rolePermissions) {
    return false; // Role not found in the matrix
  }

  const resourcePermissions = rolePermissions[resource];
  if (!resourcePermissions) {
    return false; // Resource not defined for this role
  }

  return resourcePermissions.includes(action);
}

/**
 * Future-proof structure for more granular permissions.
 * This can be extended to check organization or team-specific overrides.
 */
// interface AuthorizationContext {
//   userRole: Role;
//   organizationId?: string;
//   teamId?: string;
//   customRoles?: any; // Define custom role structure
// }
//
// export function can(context: AuthorizationContext, resource: Resource, action: Action): boolean {
//   // 1. Check for temporary elevated access (not implemented yet)
//   // 2. Check for custom role overrides
//   // 3. Check for organization/team specific roles
//   // 4. Fallback to the base role permission
//   return hasPermission(context.userRole, resource, action);
// }

""