
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { auth } from '@/lib/firebase-admin';
import { logAuditEvent } from '@/lib/audit';

export async function POST() {
  const cookieStore = cookies();
  const sessionCookie = cookieStore.get('session')?.value;
  if (sessionCookie) {
    try {
      const decodedToken = await auth.verifySessionCookie(sessionCookie);
      await auth.revokeRefreshTokens(decodedToken.sub);

      // Audit log
      await logAuditEvent({
        actorUserId: decodedToken.uid,
        actorEmail: decodedToken.email || 'N/A',
        actionType: 'user.logout',
        entityType: 'user',
        entityId: decodedToken.uid,
        source: 'web-app',
        ipPlaceholder: '127.0.0.1', // Replace with actual IP if available
      });
    } catch (error) {
      console.error('Error revoking session cookie:', error);
    }
  }

  const response = NextResponse.json({ status: 'success' });
  response.cookies.delete('session');

  return response;
}
