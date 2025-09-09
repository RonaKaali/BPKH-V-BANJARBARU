
import { NextResponse } from 'next/server';
import { updateAppointmentStatus } from '@/lib/data';

export async function PATCH(req: Request, { params } : any) {
  try {
    const { id } = params;
    const { status } = await req.json();

    if (!status) {
      return NextResponse.json({ message: 'Status tidak boleh kosong' }, { status: 400 });
    }

    const success = await updateAppointmentStatus(id, status);

    if (!success) {
      return NextResponse.json({ message: 'Janji temu tidak ditemukan' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Status berhasil diperbarui' });

  } catch (error) {
    console.error('[API_APPOINTMENTS_STATUS_PATCH]', error);
    return NextResponse.json({ message: 'Kesalahan Internal Server' }, { status: 500 });
  }
}
