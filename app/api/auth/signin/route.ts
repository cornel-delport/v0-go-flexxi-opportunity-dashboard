import { NextResponse } from 'next/server';
import { auth } from '@/lib/firebase/server';
import { cookies } from 'next/headers';

export async function POST(req: Request) {
  try {
    const { idToken } = await req.json();

    const expiresIn = 60 * 60 * 24 * 5 * 1000;
    const sessionCookie = await auth.createSessionCookie(idToken, { expiresIn });

    cookies().set('session', sessionCookie, { httpOnly: true, secure: true });

    return NextResponse.json({ status: 'success' });
  } catch (error) {
    return NextResponse.json({ status: 'error', error: error.message }, { status: 401 });
  }
}
