import { NextResponse } from 'next/server';
import { updateAppointmentStatus } from '@/lib/appointments';

// Define a specific interface for the context to ensure type safety
interface RouteContext {
  params: {
    id: string;
  };
}

export async function PATCH(req: Request, context: RouteContext) {
  try {
    const { status } = await req.json();
    const { id } = context.params; // Extract id from context

    if (!status || typeof status !== 'string') {
      return NextResponse.json({ message: 'Status tidak boleh kosong dan harus berupa string' }, { status: 400 });
    }

    // Standardize status to "Title Case" (e.g., "on going" -> "On Going", "pending" -> "Pending")
    const formattedStatus = status
      .toLowerCase()
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');

    await updateAppointmentStatus(id, formattedStatus);

    return NextResponse.json({ message: 'Status berhasil diperbarui' });

  } catch (error) {
    console.error('[API_APPOINTMENTS_ID_PATCH]', error);
    
    // Check if the error is a known 'Not Found' error from the library
    if (error instanceof Error && error.message.includes('tidak ditemukan')) {
        return NextResponse.json({ message: error.message }, { status: 404 });
    }

    // Generic internal server error
    const errorMessage = error instanceof Error ? error.message : 'Kesalahan Internal Server';
    return NextResponse.json({ message: errorMessage }, { status: 500 });
  }
}
