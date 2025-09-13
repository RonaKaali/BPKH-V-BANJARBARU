import { NextRequest, NextResponse } from 'next/server';
import { updateAppointmentStatus } from '@/lib/appointments';

// The second argument's type for route handlers in Next.js App Router
// is an object containing the `params` object.
// We will use the more specific `NextRequest` type for the request object.
export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { status } = await req.json();
    const { id } = params;

    if (!status || typeof status !== 'string') {
      return NextResponse.json({ message: 'Status tidak boleh kosong dan harus berupa string' }, { status: 400 });
    }

    // Standardize status to "Title Case"
    const formattedStatus = status
      .toLowerCase()
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');

    await updateAppointmentStatus(id, formattedStatus);

    return NextResponse.json({ message: 'Status berhasil diperbarui' });

  } catch (error) {
    console.error('[API_APPOINTMENTS_ID_PATCH]', error);
    
    if (error instanceof Error && error.message.includes('tidak ditemukan')) {
        return NextResponse.json({ message: error.message }, { status: 404 });
    }

    const errorMessage = error instanceof Error ? error.message : 'Kesalahan Internal Server';
    return NextResponse.json({ message: errorMessage }, { status: 500 });
  }
}
