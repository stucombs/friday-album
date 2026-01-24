import { addEmail } from '@lib/services/subscription.service';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json({ error: 'Invalid email' }, { status: 400 });
    }

    await addEmail(email);

    return NextResponse.json({
      success: true,
      message: 'Added email successfully'
    });
  } catch (err: any) {
    switch (err.code) {
      case '23505':
        return NextResponse.json(
          { error: 'Email already exists. Please try another email' },
          { status: 500 }
        );
      default:
        return NextResponse.json(
          { error: err.message || 'Unknown Error' },
          { status: 500 }
        );
    }
  }
}
