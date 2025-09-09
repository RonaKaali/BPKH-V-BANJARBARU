
import fs from 'fs/promises';
import path from 'path';

const dataDir = path.join(process.cwd(), 'data');
const appointmentsFilePath = path.join(dataDir, 'appointments.json');
const usersFilePath = path.join(dataDir, 'users.json');
const feedbackFilePath = path.join(dataDir, 'feedback.json');

// Fungsi untuk memastikan direktori ada
async function ensureDataDirExists() {
  try {
    await fs.mkdir(dataDir, { recursive: true });
  } catch (error) {
    console.error('Gagal membuat direktori data:', error);
    throw new Error('Gagal memastikan direktori data ada.');
  }
}

// --- Users Functions ---
export async function getUsers() {
  try {
    await ensureDataDirExists();
    const data = await fs.readFile(usersFilePath, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    if (typeof error === 'object' && error !== null && (error as { code?: string }).code === 'ENOENT') {
      await fs.writeFile(usersFilePath, JSON.stringify([], null, 2));
      return [];
    }
    console.error("Gagal membaca users.json:", error);
    return [];
  }
}

// --- Appointments Functions ---
export async function getAppointments() {
  try {
    await ensureDataDirExists();
    const data = await fs.readFile(appointmentsFilePath, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    if (typeof error === 'object' && error !== null && (error as { code?: string }).code === 'ENOENT') {
      return [];
    }
    throw error;
  }
}

export async function addAppointment(appointment: any) {
  await ensureDataDirExists();
  const appointments = await getAppointments();
  const newAppointment = {
    id: Date.now().toString(),
    status: 'pending',
    ...appointment,
  };
  appointments.push(newAppointment);
  await fs.writeFile(appointmentsFilePath, JSON.stringify(appointments, null, 2));
}

export async function updateAppointmentStatus(id: string, status: string) {
  await ensureDataDirExists();
  const appointments = await getAppointments();
  const index = appointments.findIndex((appt: any) => appt.id === id);

  if (index === -1) {
    return false;
  }

  appointments[index].status = status;
  await fs.writeFile(appointmentsFilePath, JSON.stringify(appointments, null, 2));
  return true;
}

// --- Feedback Functions ---
export async function getFeedback() {
  try {
    await ensureDataDirExists();
    const data = await fs.readFile(feedbackFilePath, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    if (typeof error === 'object' && error !== null && (error as { code?: string }).code === 'ENOENT') {
      return [];
    }
    throw error;
  }
}

export async function addFeedback(feedbackItem: any) {
    await ensureDataDirExists();
    const feedback = await getFeedback();
    const feedbackToAdd = {
        id: Date.now().toString(),
        timestamp: new Date().toISOString(),
        ...feedbackItem
    };
    feedback.push(feedbackToAdd);
    await fs.writeFile(feedbackFilePath, JSON.stringify(feedback, null, 2));
    return feedbackToAdd;
}

export async function deleteFeedback(id: string) {
    await ensureDataDirExists();
    const feedback = await getFeedback();
    const updatedFeedback = feedback.filter((fb: any) => fb.id !== id);

    if (feedback.length === updatedFeedback.length) {
        return false;
    }

    await fs.writeFile(feedbackFilePath, JSON.stringify(updatedFeedback, null, 2));
    return true;
}
