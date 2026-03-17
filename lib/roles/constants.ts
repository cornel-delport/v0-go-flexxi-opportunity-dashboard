export enum Resource {
  USERS = "users",
  OPPORTUNITIES = "opportunities",
  REVIEWS = "reviews",
  SETTINGS = "settings",
}

export enum Action {
  CREATE = "create",
  READ = "read",
  UPDATE = "update",
  DELETE = "delete",
}

export const RESOURCES = {
  USERS: Resource.USERS,
  OPPORTUNITIES: Resource.OPPORTUNITIES,
  REVIEWS: Resource.REVIEWS,
  SETTINGS: Resource.SETTINGS,
} as const;

export const ACTIONS = {
  CREATE: Action.CREATE,
  READ: Action.READ,
  UPDATE: Action.UPDATE,
  DELETE: Action.DELETE,
} as const;
