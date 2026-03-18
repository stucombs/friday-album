import { getActiveAlbum } from '@lib/services/albums.service';
import { NextResponse } from 'next/server';

export async function GET(): Promise<NextResponse> {
  try {
    const activeAlbum = await getActiveAlbum();

    if (!activeAlbum) {
      return NextResponse.json(
        { error: `Failed to retrieve active album` },
        { status: 500 }
      );
    }

    return NextResponse.json({
      data: activeAlbum
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: `Failed to retrieve active album`, message: err.message },
      { status: 500 }
    );
  }
}
