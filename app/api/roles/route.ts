export const runtime = 'nodejs';
import { NextResponse } from 'next/server';

export async function GET() {
  // Add your logic here
  return NextResponse.json({ message: 'Roles API route' });
}
