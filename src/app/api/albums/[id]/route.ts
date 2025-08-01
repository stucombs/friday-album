import { NextRequest, NextResponse } from 'next/server';
import { getAlbumById } from '@/lib/services/albums.service';

export const GET = async (
    request: NextRequest,
    { params }: { params: Promise<{ id: number }> }
): Promise<NextResponse> => {
    const id = (await params).id;

    try {
        const data = await getAlbumById(id);

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
};
