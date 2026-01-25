import { unsubscribe } from '@lib/services/subscription.service';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest): Promise<NextResponse> {
  try {
    const { searchParams } = new URL(req.url);
    const token = searchParams.get('token');

    if (!token) {
      return NextResponse.redirect(
        new URL('/unsubscribe/error?reason=invalid_token', req.url)
      );
    }

    const data = await unsubscribe(token);

    if (!data) {
      return NextResponse.redirect(
        new URL('/unsubscribe/error?reason=invalid_token', req.url)
      );
    }

    return NextResponse.redirect(new URL('/unsubscribe/success', req.url));
  } catch (err: any) {
    console.error(err.message);
    return NextResponse.redirect(
      new URL('/unsubscribe/error?reason=unknown', req.url)
    );
  }
}
