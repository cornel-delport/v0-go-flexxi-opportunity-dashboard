import { NextRequest, NextResponse } from 'next/server';
import { userService } from '@/lib/services/user.service';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const user = await userService.createUser(body);
    return NextResponse.json(user, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    const email = req.nextUrl.searchParams.get('email');
    if (email) {
      const user = await userService.getUserByEmail(email);
      return NextResponse.json(user, { status: 200 });
    } 
    const users = await userService.getAllUsers();
    return NextResponse.json(users, { status: 200 });

  } catch (error) {
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
