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
    const body = await req.json();
    const { name, message } = body;

    if (!name || !message) {
        return new NextResponse('Nama dan pesan tidak boleh kosong', { status: 400 });
    }

    // Panggil fungsi addFeedback yang sudah diperbarui
    const newFeedbackDocument = await addFeedback({ name, message });

    if (!newFeedbackDocument) {
        throw new Error('Gagal membuat dokumen feedback di database.');
    }

    // Kembalikan seluruh dokumen feedback yang baru sebagai respons
    // Ini akan digunakan oleh client untuk optimistic UI update
    return NextResponse.json({ newFeedback: newFeedbackDocument }, { status: 201 });

  } catch (error) {
    console.error('[API_FEEDBACK_POST]', error);
    return new NextResponse('Kesalahan Internal Server', { status: 500 });
  }
}
