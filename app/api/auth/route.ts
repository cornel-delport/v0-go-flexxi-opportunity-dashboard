import { NextResponse } from 'next/server';
import { authService } from '@/lib/auth';
import { UserRegistrationSchema, UserProfileSchema } from '@/lib/users';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const validation = UserRegistrationSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(validation.error.errors, { status: 400 });
    }

    const userProfile = await authService.register(validation.data);

    const userProfileValidation = UserProfileSchema.safeParse(userProfile);

    if (!userProfileValidation.success) {
      return NextResponse.json(userProfileValidation.error.errors, { status: 400 });
    }

    return NextResponse.json(userProfile, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
