import { isAdmin } from '@lib/guards/adminguard';
import { createGenre, getGenres } from '@lib/services/genre.service';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(): Promise<NextResponse> {
  try {
    const data = await getGenres();

    return NextResponse.json({ genres: data });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || 'Unknown Error' },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest): Promise<NextResponse> {
  if (!(await isAdmin(req)))
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const genre = await req.json();

    if (!genre) {
      return NextResponse.json(
        { error: 'No genre to update' },
        { status: 400 }
      );
    }

    await createGenre(genre);

    return NextResponse.json({
      message: 'Genre created successfully'
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: 'Failed to create genre', message: err.message },
      { status: 500 }
    );
  }
}
