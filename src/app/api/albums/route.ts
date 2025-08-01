import { NextRequest, NextResponse } from 'next/server';
import { addAlbum, getAlbums } from '@/services/albums.service';

export const GET = async (): Promise<NextResponse> => {
    try {
        const data = await getAlbums();

        return NextResponse.json({
            status: 200,
            data
        });

    } catch (err: any) {
        return NextResponse.json({
            status: 400,
            message: err.message
        });
    }
};

export const POST = async (request: NextRequest): Promise<NextResponse> => {
    try {
        const data = await request.json();

        const result = await addAlbum(data);

        return NextResponse.json({
            status: 201,
            message: 'Album created successfully',
            data: result
        });
    } catch (err: any) {
        return NextResponse.json({
            status: 400,
            message: err.message
        });
    }
};
