export const ROLES = {
  SUPER_ADMIN: "super_admin",
  ADMIN: "admin",
  USER: "user",
  PENDING: "pending",
} as const;

export type Role = (typeof ROLES)[keyof typeof ROLES];
