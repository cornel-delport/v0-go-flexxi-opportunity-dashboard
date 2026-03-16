
import { NextResponse, NextRequest } from 'next/server';
import { authorize } from '@/lib/roles/utils';
import { RESOURCES, ACTIONS, ROLES, Role } from '@/lib/roles/constants';
import { dbAdmin as db } from '@/lib/firebase/admin';
import { logAuditEvent } from '@/lib/audit';
import { auth } from '@/lib/firebase-admin';

export async function PUT(request: NextRequest, context: { params: { uid: string } }) {
  const { uid } = context.params;
  const { role } = (await request.json()) as { role: Role };

  // 1. Validate the incoming role
  if (!Object.values(ROLES).includes(role)) {
    return new NextResponse('Invalid role provided', { status: 400 });
  }

  try {
    // 2. Authorize the request
    const actor = await authorize(request, RESOURCES.USERS, ACTIONS.UPDATE);

    const userDocRef = db.collection('users').doc(uid);
    const userDoc = await userDocRef.get();
    const userToEdit = userDoc.data();

    // 3. Prevent admins from editing super_admins
    if (userToEdit?.role === ROLES.SUPER_ADMIN) {
        if (actor.role !== ROLES.SUPER_ADMIN) {
            return new NextResponse('Admins cannot modify Super Admins', { status: 403 });
        }
    }

    const oldRole = userToEdit?.role;

    // 4. Update the user's role in Firestore
    await userDocRef.update({
      role: role,
      updatedAt: new Date().toISOString(),
    });

    // 5. Audit log
    await logAuditEvent({
      actorUserId: actor.id,
      actorEmail: actor.email || '',
      actionType: 'role.assignment',
      entityType: 'user',
      entityId: uid,
      oldValueSummary: `Role: ${oldRole}`,
      newValueSummary: `Role: ${role}`,
      source: 'web-app',
    });

    // 6. Return a success response
    return NextResponse.json({ message: 'User role updated successfully.' });
  } catch (error) {
    console.error(`Failed to update role for user ${uid}:`, (error as Error).message);
    // Correctly handle authorization errors vs. other server errors
    if ((error as Error).message.includes('Unauthorized') || (error as Error).message.includes('Forbidden')) {
      return new NextResponse((error as Error).message, { status: 403 });
    }
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}

export async function PATCH(request: NextRequest, context: { params: { uid: string } }) {
  const { uid } = context.params;
  const { disabled } = (await request.json()) as { disabled: boolean };

  try {
    // 1. Authorize the request
    const actor = await authorize(request, RESOURCES.USERS, ACTIONS.UPDATE);

    const userDocRef = db.collection('users').doc(uid);
    const userDoc = await userDocRef.get();
    const userToEdit = userDoc.data();

    // 2. Prevent admins from editing super_admins
    if (userToEdit?.role === ROLES.SUPER_ADMIN) {
      if (actor.role !== ROLES.SUPER_ADMIN) {
        return new NextResponse('Admins cannot modify Super Admins', { status: 403 });
      }
    }

    // 3. Update the user's status in Firebase Authentication
    await auth.updateUser(uid, { disabled });

    // 4. Update the user's status in Firestore
    await userDocRef.update({
      disabled: disabled,
      updatedAt: new Date().toISOString(),
    });

    // 5. Audit log
    await logAuditEvent({
        actorUserId: actor.id,
        actorEmail: actor.email || '',
        actionType: 'user.status_change',
        entityType: 'user',
        entityId: uid,
        oldValueSummary: `Disabled: ${userToEdit?.disabled}`,
        newValueSummary: `Disabled: ${disabled}`,
        source: 'web-app',
      });

    // 6. Return a success response
    return NextResponse.json({ message: `User ${disabled ? 'disabled' : 'enabled'} successfully.` });
  } catch (error) {
    console.error(`Failed to update status for user ${uid}:`, (error as Error).message);
    if ((error as Error).message.includes('Unauthorized') || (error as Error).message.includes('Forbidden')) {
      return new NextResponse((error as Error).message, { status: 403 });
    }
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
