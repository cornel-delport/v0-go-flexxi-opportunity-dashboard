export enum Role {
  SUPER_ADMIN = "super_admin",
  ADMIN = "admin",
  ANALYST = "analyst",
  USER = "user",
  PENDING = "pending",
}

export const ROLES = {
  SUPER_ADMIN: "super_admin",
  ADMIN: "admin",
  ANALYST: "analyst",
  USER: "user",
  PENDING: "pending",
} as const;
