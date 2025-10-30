import { NextResponse } from 'next/server';
import { deleteFeedbackById } from '@/lib/feedback';

export async function DELETE(
  req: Request
) {
  try {
    // Workaround: Manually parse the ID from the request URL
    const id = req.url.split('/').pop();

    if (!id || id === 'undefined') {
        return new NextResponse('Feedback ID is missing or invalid', { status: 400 });
    }

    const result = await deleteFeedbackById(id);

    if (!result.success) {
      return new NextResponse(result.message, { status: 404 });
    }

    // Successfully deleted
    return new NextResponse(null, { status: 204 });

  } catch (error) {
    console.error('[API_FEEDBACK_DELETE]', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
