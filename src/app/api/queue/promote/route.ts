import { isAuthorized } from '@lib/guards/cronguard';
import { getQueue, promoteAlbum, saveQueue } from '@lib/services/queue.service';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest): Promise<NextResponse> {
  if (!isAuthorized(req))
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const queue = await getQueue();

    if (!queue.length) {
      return NextResponse.json(
        { error: `Failed to promote album. No albums in queue` },
        { status: 500 }
      );
    }

    const { albums: nextAlbum } = queue.shift();

    const newQueue = queue.map((album: any) => {
      return {
        album_id: album.album_id,
        position: album.position - 1
      };
    });

    await promoteAlbum(nextAlbum.id);
    await saveQueue(newQueue);

    return NextResponse.json({
      message: `Successfully promoted album ${nextAlbum.title}`
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: 'Failed to promote album.', details: err.message },
      { status: 500 }
    );
  }
}
