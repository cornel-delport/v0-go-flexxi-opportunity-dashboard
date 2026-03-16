export const runtime = 'nodejs';
// app/api/admin/users/route.ts
import { NextResponse, NextRequest } from 'next/server';
import { authorize } from '@/lib/roles/utils';
import { RESOURCES, ACTIONS } from '@/lib/roles/constants';
import { dbAdmin as db } from '@/lib/firebase/admin';

export async function GET(request: NextRequest) {
  try {
    // 1. Authorize the request
    await authorize(request, RESOURCES.USERS, ACTIONS.READ);

    // 2. Fetch all users from Firestore
    const usersSnapshot = await db.collection('users').get();
    const users = usersSnapshot.docs.map((doc) => doc.data());

    // 3. Return the user data
    return NextResponse.json(users);
  } catch (error) {
    console.error('Failed to fetch users:', (error as Error).message);
    if ((error as Error).message.includes('Unauthorized') || (error as Error).message.includes('Forbidden')) {
        return new NextResponse((error as Error).message, { status: 403 });
      }
    // Return a generic error response
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
