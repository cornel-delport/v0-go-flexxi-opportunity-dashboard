export const runtime = 'nodejs';
import { NextResponse } from 'next/server';
import { auth } from '@/lib/firebase/server';

export async function POST(req: Request) {
  try {
    const { idToken } = await req.json();

    const expiresIn = 60 * 60 * 24 * 5 * 1000;
    const sessionCookie = await auth.createSessionCookie(idToken, { expiresIn });

    const response = NextResponse.json({ status: 'success' });
    response.cookies.set('session', sessionCookie, { httpOnly: true, secure: true });

    return response;
  } catch (error) {
    return NextResponse.json({ status: 'error', error: (error as Error).message }, { status: 401 });
  }
}
