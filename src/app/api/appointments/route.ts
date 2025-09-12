import { NextResponse } from 'next/server';
import { getAppointments, addAppointment } from '@/lib/appointments';

// Handler untuk GET request (mengambil semua janji temu)
export async function GET() {
  try {
    const appointments = await getAppointments();
    // Urutkan janji temu berdasarkan tanggal terbaru
    const sortedAppointments = appointments.sort((a: { date: string }, b: { date: string }) => new Date(b.date).getTime() - new Date(a.date).getTime());
    return NextResponse.json(sortedAppointments);
  } catch (error) {
    console.error('[API_APPOINTMENTS_GET]', error);
    return NextResponse.json({ message: 'Kesalahan Internal Server' }, { status: 500 });
  }
}

// Handler untuk POST request (menambah janji temu baru)
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
        name,
        email,
        phone,
        date,
        purpose
    } = body;

    // Pastikan semua field yang dibutuhkan ada
    if (!name || !email || !phone || !date || !purpose) {
      return NextResponse.json({ message: 'Semua field harus diisi' }, { status: 400 });
    }

    const newAppointment = {
      name,
      email,
      phone,
      date,
      purpose,
    };

    await addAppointment(newAppointment);

    return NextResponse.json(newAppointment, { status: 201 });

  } catch (error) {
    console.error('[API_APPOINTMENTS_POST]', error);
    return NextResponse.json({ message: 'Kesalahan Internal Server' }, { status: 500 });
  }
}
