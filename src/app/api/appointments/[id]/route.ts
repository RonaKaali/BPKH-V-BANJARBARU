import { NextResponse } from 'next/server';
import { updateAppointmentStatus } from '@/lib/appointments';

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  try {
    let { status } = await req.json();

    if (!status) {
      return NextResponse.json({ message: 'Status tidak boleh kosong' }, { status: 400 });
    }

    // Standardize status to Title Case
    let finalStatus = status;
    if (status === 'on going') {
      finalStatus = 'On Going';
    } else {
      finalStatus = status.charAt(0).toUpperCase() + status.slice(1);
    }

    // Langsung gunakan params.id untuk menghindari error di Next.js versi baru
    await updateAppointmentStatus(params.id, finalStatus);

    return NextResponse.json({ message: 'Status berhasil diperbarui' });

  } catch (error) {
    console.error('[API_APPOINTMENTS_STATUS_PATCH]', error);
    // Asumsikan kesalahan berasal dari `updateAppointmentStatus` yang melemparkan kesalahan (mis. tidak ditemukan)
    const errorMessage = error instanceof Error ? error.message : 'Kesalahan Internal Server';
    return NextResponse.json({ message: errorMessage }, { status: 500 });
  }
}
