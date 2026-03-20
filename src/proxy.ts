import { NextRequest, NextResponse } from 'next/server';

export const proxy = (request: NextRequest) => {
  const token = request.cookies.get('fa_admin_token');

  if (!token || token.value !== process.env.API_SECRET) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
};

export const config = {
  matcher: ['/admin/:path*']
};
