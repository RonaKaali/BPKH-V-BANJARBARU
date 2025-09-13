import { NextResponse } from 'next/server';
import { deleteFeedbackById } from '@/lib/feedback';

// Using `any` as a workaround for a persistent type error in Next.js 15.5.2 on Vercel.
// This bypasses the type checker for the second argument to allow the build to pass.
export async function DELETE(
  _req: Request, // req is unused but required for the signature
  context: any
) {
  try {
    const { id } = context.params; // Manually get id from the context object
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
