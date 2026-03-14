// app/api/admin/users/[uid]/route.ts
import { NextResponse } from 'next/server';
import { authorize } from '@/lib/roles/utils';
import { RESOURCES, ACTIONS, ROLES, Role } from '@/lib/roles';
import { db } from '@/lib/firebase/server';

interface Params {
  params: { uid: string };
}

export async function PUT(request: Request, { params }: Params) {
  const { uid } = params;
  const { role } = (await request.json()) as { role: Role };

  // 1. Validate the incoming role
  if (!Object.values(ROLES).includes(role)) {
    return new NextResponse('Invalid role provided', { status: 400 });
  }

  try {
    // 2. Authorize the request
    const { role: adminRole } = await authorize(RESOURCES.ROLES, ACTIONS.ASSIGN);

    // 3. Prevent admins from editing super_admins
    if (adminRole === ROLES.ADMIN) {
      const userDoc = await db.collection('users').doc(uid).get();
      const userToEdit = userDoc.data();
      if (userToEdit?.role === ROLES.SUPER_ADMIN) {
        return new NextResponse('Admins cannot modify Super Admins', { status: 403 });
      }
    }

    // 4. Update the user's role in Firestore
    await db.collection('users').doc(uid).update({
      role: role,
      updatedAt: new Date().toISOString(),
    });

    // 5. Return a success response
    return NextResponse.json({ message: 'User role updated successfully.' });
  } catch (error) {
    console.error(`Failed to update role for user ${uid}:`, error.message);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
