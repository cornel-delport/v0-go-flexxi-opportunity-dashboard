
import { ROLES } from '@/lib/roles/constants';
import { User } from '@/lib/firestore-data';
import { Timestamp } from 'firebase/firestore';

/**
 * A utility to create a user object that can be stored in Firestore.
 * @param user The user object from Firebase Auth.
 */
export function createInitialUser(user: { uid: string; email: string | null; displayName: string | null; photoURL: string | null; }): User {
  return {
    id: user.uid,
    displayName: user.displayName,
    email: user.email,
    photoURL: user.photoURL,
    role: ROLES.PENDING,
    organizationId: null,
    teamId: null,
    createdAt: Timestamp.now(),
    updatedAt: Timestamp.now(),
    lastLoginAt: Timestamp.now(),
    status: 'pending',
  };
}
