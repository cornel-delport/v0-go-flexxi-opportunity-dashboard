export const runtime = 'nodejs';
import { NextResponse } from 'next/server';
import { userService } from '@/lib/users/userService';
import { UserSchema } from '@/lib/users/user';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const validation = UserSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(validation.error.errors, { status: 400 });
    }

    const user = await userService.createUser(validation.data);
    return NextResponse.json(user, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
