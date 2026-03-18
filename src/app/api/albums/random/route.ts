import { getRandomAlbum } from '@lib/services/albums.service';
import { NextResponse } from 'next/server';

export async function GET(): Promise<NextResponse> {
  try {
    const randomAlbum = await getRandomAlbum();

    if (!randomAlbum) {
      return NextResponse.json(
        { error: `Failed to retrieve random album` },
        { status: 500 }
      );
    }

    return NextResponse.json({
      data: randomAlbum
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: `Failed to retrieve random album`, message: err.message },
      { status: 500 }
    );
  }
}
