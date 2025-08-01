/* eslint-disable @typescript-eslint/no-explicit-any */
import { getPastAlbums } from '@/services/albums.service';
import { NextResponse } from 'next/server';

export const GET = async (): Promise<NextResponse> => {
    try {
        const data = await getPastAlbums();
        return NextResponse.json({
            status: 200,
            data
        });
    } catch(err: any) {
        return NextResponse.json({
            status: 400,
            message: err.message
        });
    }
}
