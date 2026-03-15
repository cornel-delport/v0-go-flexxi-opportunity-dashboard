import { NextRequest, NextResponse } from 'next/server';
import { userService } from '@/lib/services/user.service';
import { User } from '@/lib/types';

export async function GET(request: NextRequest, { params }: { params: Promise<{ userId: string }> }) {
    const { userId } = await params;
  try {
    const user = await userService.getUserById(userId);
    if (user) {
      return NextResponse.json(user, { status: 200 });
    } else {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }
  } catch (error) {
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ userId: string }> }) {
    const { userId } = await params;
  try {
    const body = await request.json();
    const user = await userService.updateUser(userId, body);
    if (user) {
      return NextResponse.json(user, { status: 200 });
    } else {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }
  } catch (error) {
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ userId: string }> }) {
    const { userId } = await params;
  try {
    await userService.deleteUser(userId);
    return new Response(null, { status: 204 });
  } catch (error) {
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
