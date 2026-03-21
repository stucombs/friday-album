import { isAdmin } from '@lib/guards/adminguard';
import { getSettings, setSettings } from '@lib/services/settings.service';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(): Promise<NextResponse> {
  try {
    const data = await getSettings();

    return NextResponse.json(data);
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || 'Unknown error' },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest): Promise<NextResponse> {
  if (!isAdmin(req))
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const settings = await req.json();

    if (!settings) {
      return NextResponse.json(
        { error: 'No settings up update' },
        { status: 400 }
      );
    }

    await setSettings(settings);

    return NextResponse.json({
      message: 'Updated settings successfully'
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: 'Failed to set settings', message: err.message },
      { status: 500 }
    );
  }
}
