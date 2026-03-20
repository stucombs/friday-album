import { getQueue, saveQueue } from '@lib/services/queue.service';
import { NextRequest, NextResponse } from 'next/server';

// PROTECT
export async function GET(): Promise<NextResponse> {
  try {
    const data = await getQueue();

    if (!data) {
      return NextResponse.json(
        { error: 'Failed to load queue' },
        { status: 500 }
      );
    }

    return NextResponse.json({ queue: data });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.details || 'Unknown error' },
      { status: 500 }
    );
  }
}
// PROTECT
export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    const { queue } = await req.json();

    const newQueue = await saveQueue(queue);

    return NextResponse.json({
      success: true,
      message: 'Queue saved successfully',
      data: newQueue
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || 'Unknown error' },
      { status: 500 }
    );
  }
}
