import { NextRequest, NextResponse } from 'next/server';

/* API for Album links courtes of Songlink/Odesli: https://odesli.co */
export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    const request = await req.json();

    const url = `https://api.song.link/v1-alpha.1/links?url=${request.url}`;
    const soResponse = await fetch(url);

    const data = await soResponse.json();
    const uniqueId = data.linksByPlatform.appleMusic.entityUniqueId;

    const response = {
      title: data.entitiesByUniqueId[uniqueId]?.title,
      artist: data.entitiesByUniqueId[uniqueId]?.artistName,
      cover_url: data.entitiesByUniqueId[uniqueId]?.thumbnailUrl,
      am_link: request.url,
      spotify_link: data.linksByPlatform?.spotify?.url || ''
    };

    return NextResponse.json({ data: response });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message ?? 'Unknown error occurred loading album info' },
      { status: 500 }
    );
  }
}
