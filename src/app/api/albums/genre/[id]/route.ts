import { deleteGenre } from '@lib/services/genre.service';
import { NextRequest, NextResponse } from 'next/server';

export async function DELETE(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
): Promise<NextResponse> {
  try {
    const { id } = await context.params;
    const genreId = Number(id);
    await deleteGenre(genreId);

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
