
import { NextResponse } from 'next/server';
import { auth } from '@/lib/firebase-admin';
import { logAuditEvent } from '@/lib/audit';
import { UserProfile } from '@/lib/firestore-data-model';

export async function POST(req: Request) {
  try {
    const { idToken } = await req.json();

    const expiresIn = 60 * 60 * 24 * 5 * 1000;
    const decodedToken = await auth.verifyIdToken(idToken);
    const sessionCookie = await auth.createSessionCookie(idToken, { expiresIn });

    const response = NextResponse.json({ status: 'success' });
    response.cookies.set('session', sessionCookie, { httpOnly: true, secure: true });

    // Audit log
    await logAuditEvent({
      actorUserId: decodedToken.uid,
      actorEmail: decodedToken.email || 'N/A',
      actionType: 'user.login',
      entityType: 'user',
      entityId: decodedToken.uid,
      source: 'web-app',
      ipPlaceholder: '127.0.0.1', // Replace with actual IP if available
    });

    return response;
  } catch (error) {
    return NextResponse.json({ status: 'error', error: (error as Error).message }, { status: 401 });
  }
}
