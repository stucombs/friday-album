import { isAdmin } from '@lib/guards/adminguard';
import axios from 'axios';
import { NextRequest, NextResponse } from 'next/server';

/* API for Album links courtes of Songlink/Odesli: https://odesli.co */
export async function POST(req: NextRequest): Promise<NextResponse> {
  if (!(await isAdmin(req)))
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const request = await req.json();

    const url = `https://api.song.link/v1-alpha.1/links?url=${request.url}`;
    const { data } = await axios.get(url);
    const uniqueId = data.linksByPlatform.appleMusic.entityUniqueId;

    const response = {
      title: data.entitiesByUniqueId[uniqueId]?.title,
      artist: data.entitiesByUniqueId[uniqueId]?.artistName,
      cover_url: data.entitiesByUniqueId[uniqueId]?.thumbnailUrl,
      am_link: request.url,
      spotify_link: data.linksByPlatform?.spotify?.url || ''
    };

    return NextResponse.json(response);
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message ?? 'Unknown error occurred loading album info' },
      { status: 500 }
    );
  }
}
