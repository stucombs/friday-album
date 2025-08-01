import { NextRequest, NextResponse } from 'next/server';
import { promoteAlbum } from '@/lib/services/albums.service';

export const POST = async (
    request: NextRequest,
    { params }: { params: Promise<{ id: number }> }
) => {
    try {
      const id = (await params).id;
      const response = await promoteAlbum(id);

      return NextResponse.json({
        status: 200,
        message: `Successfully promoted album ${id}`,
        data: response
      });
    } catch (err: any) {
        return NextResponse.json({
            status: 400,
            message: err.message
        });
    }
};
