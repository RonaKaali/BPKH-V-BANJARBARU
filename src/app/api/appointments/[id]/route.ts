
import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import fs from 'fs/promises';
import path from 'path';

const dbPath = path.resolve(process.cwd(), 'database/appointments.json');

// Middleware to check for admin session
async function isAdmin(req: NextRequest) {
  const cookieStore = cookies();
  return cookieStore.has('admin-session');
}

async function readDb() {
  try {
    const data = await fs.readFile(dbPath, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    // If the file doesn't exist, return an empty array
    if (error.code === 'ENOENT') {
      return [];
    }
    throw error;
  }
}

async function writeDb(data: any) {
  await fs.writeFile(dbPath, JSON.stringify(data, null, 2), 'utf-8');
}

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  if (!(await isAdmin(req))) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { id } = params;
    const { status } = await req.json();

    if (!['Pending', 'On Going', 'Done'].includes(status)) {
      return NextResponse.json({ message: 'Invalid status' }, { status: 400 });
    }

    const appointments = await readDb();
    // Use non-strict equality (==) to handle type difference between string and number
    const appointmentIndex = appointments.findIndex((appt: any) => appt.id == id);

    if (appointmentIndex === -1) {
      return NextResponse.json({ message: 'Appointment not found' }, { status: 404 });
    }

    appointments[appointmentIndex].status = status;
    await writeDb(appointments);

    return NextResponse.json(appointments[appointmentIndex]);
  } catch (error) {
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
