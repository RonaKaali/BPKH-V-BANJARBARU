import { NextResponse } from 'next/server';
import { getFeedback, addFeedback } from '@/lib/feedback';

// Handler untuk GET request
export async function GET() {
  try {
    const feedback = await getFeedback();
    return NextResponse.json(feedback);
  } catch (error) {
    console.error('[API_FEEDBACK_GET]', error);
    return new NextResponse('Kesalahan Internal Server saat mengambil data', { status: 500 });
  }
}

// Handler untuk POST request
export async function POST(req: Request) {
  try {
    const newFeedback = await req.json();

    if (!newFeedback.name || !newFeedback.message) {
        return new NextResponse('Nama dan pesan tidak boleh kosong', { status: 400 });
    }

    const feedbackId = await addFeedback(newFeedback);

    return NextResponse.json({ id: feedbackId, ...newFeedback }, { status: 201 });

  } catch (error) {
    console.error('[API_FEEDBACK_POST]', error);
    return new NextResponse('Kesalahan Internal Server', { status: 500 });
  }
}
