
import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import fs from 'fs/promises';
import path from 'path';

const dbPath = path.join(process.cwd(), 'database', 'appointments.json');

// Middleware to check for admin session
async function isAdmin(req: NextRequest) {
  const cookieStore = cookies();
  return cookieStore.has('admin-session');
}

async function getAppointments() {
  try {
    const fileContent = await fs.readFile(dbPath, 'utf-8');
    return JSON.parse(fileContent);
  } catch (error) {
    // If the file doesn't exist or is empty, return an empty array
    if (error.code === 'ENOENT') {
        await fs.mkdir(path.dirname(dbPath), { recursive: true });
        await fs.writeFile(dbPath, JSON.stringify([]));
        return [];
    }
    return [];
  }
}

export async function POST(req: NextRequest) {
  try {
    const newAppointment = await req.json();
    newAppointment.id = Date.now().toString(); // Ensure ID is a string
    newAppointment.status = 'Pending'; // Default status

    const appointments = await getAppointments();
    appointments.push(newAppointment);

    await fs.writeFile(dbPath, JSON.stringify(appointments, null, 2));

    return NextResponse.json({ message: 'Permintaan janji temu berhasil dikirim!', appointment: newAppointment }, { status: 201 });
  } catch (error) {
    console.error('Gagal memproses permintaan:', error);
    return NextResponse.json({ message: 'Gagal membuat janji temu' }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
    if (!(await isAdmin(req))) {
        return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    try {
        const appointments = await getAppointments();
        return NextResponse.json(appointments);
    } catch (error) {
        console.error('Gagal membaca data janji temu:', error);
        return NextResponse.json({ message: 'Gagal mengambil data janji temu' }, { status: 500 });
    }
}
