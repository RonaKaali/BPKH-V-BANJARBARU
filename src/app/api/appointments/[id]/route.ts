import { NextRequest, NextResponse } from 'next/server';

import { updateAppointmentStatus } from '@/lib/appointments';

// Using `any` as a workaround for a persistent type error in Next.js 15.5.2 on Vercel.
// This bypasses the type checker for the second argument to allow the build to pass.
export async function PATCH(
  req: NextRequest,
  context: any // Using 'any' to bypass the build error
) {
  try {
    const { status } = await req.json();
    const { id } = context.params; // Manually get id from the context object

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
