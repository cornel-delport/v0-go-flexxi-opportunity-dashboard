import { NextRequest } from 'next/server';
import { cookies } from 'next/headers';
import { auth } from '@/lib/firebase-admin';
import { dbAdmin } from '@/lib/firebase/admin';
import { ROLES, Role, Resource, Action, RESOURCES, ACTIONS } from './constants';
import { FirestoreData } from '@/lib/firestore-data-model';
import UserProfile = FirestoreData.UserProfile;

const permissions: { [key in Role]?: { [key in Resource]?: Action[] } } = {
    [ROLES.MEMBER]: {
        [RESOURCES.OPPORTUNITIES]: [ACTIONS.READ],
        [RESOURCES.REVIEWS]: [ACTIONS.CREATE, ACTIONS.READ],
      },
      [ROLES.ADMIN]: {
        [RESOURCES.USERS]: [ACTIONS.READ, ACTIONS.UPDATE],
        [RESOURCES.OPPORTUNITIES]: [ACTIONS.CREATE, ACTIONS.READ, ACTIONS.UPDATE],
        [RESOURCES.REVIEWS]: [ACTIONS.CREATE, ACTIONS.READ, ACTIONS.UPDATE],
        [RESOURCES.SETTINGS]: [ACTIONS.READ, ACTIONS.UPDATE],
      },
      [ROLES.SUPER_ADMIN]: {
        [RESOURCES.USERS]: [ACTIONS.CREATE, ACTIONS.READ, ACTIONS.UPDATE, ACTIONS.DELETE],
        [RESOURCES.OPPORTUNITIES]: [ACTIONS.CREATE, ACTIONS.READ, ACTIONS.UPDATE, ACTIONS.DELETE],
        [RESOURCES.REVIEWS]: [ACTIONS.CREATE, ACTIONS.READ, ACTIONS.UPDATE, ACTIONS.DELETE],
        [RESOURCES.SETTINGS]: [ACTIONS.CREATE, ACTIONS.READ, ACTIONS.UPDATE, ACTIONS.DELETE],
      },
};

export const hasPermission = (userRole: Role, resource: Resource, action: Action): boolean => {
    if (!userRole) return false;

    // Super admins have all permissions
    if (userRole === ROLES.SUPER_ADMIN) return true;

    const userPermissions = permissions[userRole];
    if (!userPermissions) return false;

    const resourcePermissions = userPermissions[resource];
    if (!resourcePermissions) return false;

    return resourcePermissions.includes(action);
};

export const authorize = async (request: NextRequest, resource: Resource, action: Action): Promise<UserProfile> => {
    const session = cookies().get('session')?.value || '';

    // 1. Check for session cookie
    if (!session) {
      throw new Error('Unauthorized: No session cookie found');
    }

    // 2. Verify session cookie and get user
    const decodedToken = await auth.verifySessionCookie(session, true);
    const userRef = dbAdmin.collection('users').doc(decodedToken.uid);
    const userDoc = await userRef.get();

    if (!userDoc.exists) {
      throw new Error('Unauthorized: User not found');
    }

    const user = userDoc.data() as UserProfile;

    // 3. Check for permissions
    if (!hasPermission(user.role, resource, action)) {
      throw new Error('Forbidden: Insufficient permissions');
    }

    // 4. Return the authenticated and authorized user
    return user;
  };
