// lib/roles/utils.ts
import { cookies } from 'next/headers';
import { authAdmin as auth, dbAdmin as db } from '@/lib/firebase/admin';
import { hasPermission, Role, Resource, Action } from './index';

interface UserData {
  uid: string;
  role: Role;
  email: string;
}

/**
 * Server-side authorization check.
 * Verifies the user's session, fetches their role, and checks permissions.
 *
 * @param resource The resource being accessed.
 * @param action The action being performed.
 * @returns A promise that resolves with the user's data if authorized,
 * or rejects with an error if unauthorized.
 */
export async function authorize(resource: Resource | string, action: Action): Promise<UserData> {
  const sessionCookie = (await cookies()).get('session')?.value;
  if (!sessionCookie) {
    throw new Error('Unauthorized: No session cookie provided.');
  }

  try {
    const decodedToken = await auth.verifySessionCookie(sessionCookie, true);
    const uid = decodedToken.uid;
    const email = decodedToken.email || '';

    const userDoc = await db.collection('users').doc(uid).get();

    if (!userDoc.exists) {
      throw new Error('Unauthorized: User profile not found.');
    }

    const userData = userDoc.data() as { role: Role };
    const userRole = userData.role;

    if (!hasPermission(userRole, resource as Resource, action)) {
      throw new Error(`Forbidden: Role '${userRole}' does not have permission for ${action} on ${resource}.`);
    }

    return { uid, role: userRole, email };
  } catch (error) {
    console.error('Authorization error:', (error as Error).message);
    // Re-throw a generic error to avoid leaking implementation details
    throw new Error('An error occurred during authorization.');
  }
}
