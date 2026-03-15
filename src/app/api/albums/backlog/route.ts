import { getAlbumBacklog } from '@lib/services/albums.service';
import { NextResponse } from 'next/server';

export async function GET(): Promise<NextResponse> {
  try {
    const data = await getAlbumBacklog();

    if (!data) {
      return NextResponse.json(
        { error: 'Failed to load album backlog' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      data
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message ?? 'Unknown error loading backlog' },
      { status: 500 }
    );
  }
}
