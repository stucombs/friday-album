import { deleteAlbum, getAlbumById } from '@lib/services/albums.admin.service';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: number }> }
): Promise<NextResponse> {
  try {
    const { id } = await params;
    const album = await getAlbumById(id);

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
  { params }: { params: Promise<{ id: number }> }
): Promise<NextResponse> {
  try {
    const { id } = await params;
    await deleteAlbum(id);

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
