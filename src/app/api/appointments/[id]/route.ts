import { NextResponse } from 'next/server';
import { updateAppointmentStatus } from '@/lib/appointments';

export async function PATCH(req: Request, { params } : any) {
  try {
    const { id } = params;
    const { status } = await req.json();

    if (!status) {
      return NextResponse.json({ message: 'Status tidak boleh kosong' }, { status: 400 });
    }

    await updateAppointmentStatus(id, status);

    return NextResponse.json({ message: 'Status berhasil diperbarui' });

  } catch (error) {
    console.error('[API_APPOINTMENTS_STATUS_PATCH]', error);
    return NextResponse.json({ message: 'Kesalahan Internal Server' }, { status: 500 });
  }
}
