export const ROLES = {
  SUPER_ADMIN: 'super_admin',
  ADMIN: 'admin',
  ANALYST: 'analyst',
  USER: 'user',
  PENDING: 'pending',
} as const;

export const RESOURCES = {
  USERS: 'users',
  OPPORTUNITIES: 'opportunities',
  REVIEWS: 'reviews',
  SETTINGS: 'settings',
} as const;

export const ACTIONS = {
  CREATE: 'create',
  READ: 'read',
  UPDATE: 'update',
  DELETE: 'delete',
} as const;

export type Role = typeof ROLES[keyof typeof ROLES];
export type Resource = typeof RESOURCES[keyof typeof RESOURCES];
export type Action = typeof ACTIONS[keyof typeof ACTIONS];
