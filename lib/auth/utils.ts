import { ROLES, Role } from '@/lib/roles';
import { FirestoreData } from '@/lib/firestore-data-model';

// This is a simplified version of the User interface for auth purposes
interface AuthUser {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  role?: Role;
}

/**
 * A utility to check if a user has the required role.
 * This is a basic example and can be expanded based on your needs.
 */
export function hasRequiredRole(user: AuthUser, requiredRole: Role): boolean {
  if (!user.role) return false;

  const roleHierarchy = {
    [ROLES.PENDING]: 0,
    [ROLES.USER]: 1,
    [ROLES.ANALYST]: 2,
    [ROLES.ADMIN]: 3,
    [ROLES.SUPER_ADMIN]: 4,
  };

  const userLevel = roleHierarchy[user.role] || 0;
  const requiredLevel = roleHierarchy[requiredRole];

  return userLevel >= requiredLevel;
}

/**
 * A utility to create a user object that can be stored in Firestore.
 * @param user The user object from Firebase Auth.
 */
export function createInitialUser(user: { uid: string; email: string | null; displayName: string | null; photoURL: string | null; }): FirestoreData.User {
  return {
    id: user.uid,
    displayName: user.displayName,
    email: user.email,
    photoURL: user.photoURL,
    role: ROLES.PENDING,
    organizationId: null,
    teamId: null,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    lastLoginAt: new Date().toISOString(),
  };
}
