import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest): Promise<NextResponse> {
  const { password } = await request.json();

  if (password !== process.env.BASIC_AUTH_PASSWORD) {
    return NextResponse.json({ error: 'Invalid password' }, { status: 401 });
  }

  const cookieStore = await cookies();

  cookieStore.set('fa_admin_token', process.env.API_SECRET!, {
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
    maxAge: 60 * 60 * 48 //48 hours
  });

  return NextResponse.json({ login: true });
}
