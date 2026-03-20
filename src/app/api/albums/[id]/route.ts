import { isAdmin } from '@lib/guards/adminguard';
import { deleteAlbum, getAlbumById } from '@lib/services/albums.admin.service';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
): Promise<NextResponse> {
  if (!(await isAdmin()))
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const { id } = await context.params;
    const albumId = Number(id);
    const album = await getAlbumById(albumId);

    if (!album) {
      return NextResponse.json(
        { error: `Album with ID ${id} not found` },
        { status: 404 }
      );
    }

    return NextResponse.json({
      data: album
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: `Failed to retrieve album`, message: err.message },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
): Promise<NextResponse> {
  if (!(await isAdmin()))
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const { id } = await context.params;
    const albumId = Number(id);
    await deleteAlbum(albumId);

    return NextResponse.json({
      message: `Album with ID ${id} deleted successfully`
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: `Failed to delete album`, details: err.message },
      { status: 500 }
    );
  }
}
