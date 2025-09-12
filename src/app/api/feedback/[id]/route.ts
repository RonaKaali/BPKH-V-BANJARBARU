import { NextResponse } from 'next/server';
import { deleteFeedbackById } from '@/lib/feedback';

// Handler untuk DELETE request
export async function DELETE(
  req: Request,
  { params }: any
) {
  try {
    const { id } = params;
    const success = await deleteFeedbackById(id);

    if (!success) {
      return new NextResponse('Feedback tidak ditemukan', { status: 404 });
    }

    return new NextResponse(null, { status: 204 }); // 204 No Content

  } catch (error) {
    console.error('[API_FEEDBACK_DELETE]', error);
    return new NextResponse('Kesalahan Internal Server', { status: 500 });
  }
}
