import { isAdmin } from '@lib/guards/adminguard';
import { createAlbum } from '@lib/services/albums.admin.service';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest): Promise<NextResponse> {
  if (!(await isAdmin()))
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const { album } = await req.json();

    if (!album)
      return NextResponse.json(
        { error: 'Failed to create album. Missing Data' },
        { status: 400 }
      );

    const data = await createAlbum(album);

    if (data.error)
      return NextResponse.json({ error: data.error.message }, { status: 500 });

    return NextResponse.json({
      message: 'Album created successfully',
      data
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: 'Failed to create album', message: err.message },
      { status: 500 }
    );
  }
}
