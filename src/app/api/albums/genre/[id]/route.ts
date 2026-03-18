import { deleteGenre } from '@lib/services/genre.service';
import { NextRequest, NextResponse } from 'next/server';

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: number }> }
): Promise<NextResponse> {
  try {
    const { id } = await params;
    await deleteGenre(id);

    return NextResponse.json({
      message: 'Genre deleted successfully'
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: 'Failed to delete genre', message: err.message },
      { status: 500 }
    );
  }
}
