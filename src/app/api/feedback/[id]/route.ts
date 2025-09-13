import { NextResponse } from 'next/server';
import { deleteFeedbackById } from '@/lib/feedback';

// Handler untuk DELETE request
export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    // Langsung gunakan params.id untuk menghindari error di Next.js versi baru
    const success = await deleteFeedbackById(params.id);

    if (!success) {
      return new NextResponse('Feedback tidak ditemukan', { status: 404 });
    }

    return new NextResponse(null, { status: 204 }); // 204 No Content

  } catch (error) {
    console.error('[API_FEEDBACK_DELETE]', error);
    return new NextResponse('Kesalahan Internal Server', { status: 500 });
  }
}
