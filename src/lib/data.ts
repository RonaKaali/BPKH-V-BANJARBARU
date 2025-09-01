
import fs from 'fs/promises';
import path from 'path';

const appointmentsFilePath = path.join(process.cwd(), 'data', 'appointments.json');
const usersFilePath = path.join(process.cwd(), 'data', 'users.json');
const feedbackFilePath = path.join(process.cwd(), 'data', 'feedback.json');

// --- Users Functions ---
export async function getUsers() {
  try {
    const data = await fs.readFile(usersFilePath, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error("Gagal membaca users.json:", error);
    return [];
  }
}

// --- Appointments Functions ---
export async function getAppointments() {
  try {
    const data = await fs.readFile(appointmentsFilePath, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
}

export async function addAppointment(appointment: any) {
  const appointments = await getAppointments();
  const newAppointment = {
    id: Date.now().toString(),
    status: 'pending', // Set default status to pending
    ...appointment,
  };
  appointments.push(newAppointment);
  await fs.writeFile(appointmentsFilePath, JSON.stringify(appointments, null, 2));
}

export async function updateAppointmentStatus(id: string, status: string) {
  const appointments = await getAppointments();
  const index = appointments.findIndex((appt: any) => appt.id === id);

  if (index === -1) {
    return false; // Appointment not found
  }

  appointments[index].status = status;
  await fs.writeFile(appointmentsFilePath, JSON.stringify(appointments, null, 2));
  return true; // Success
}


// --- Feedback Functions ---
export async function getFeedback() {
  try {
    const data = await fs.readFile(feedbackFilePath, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
}

export async function addFeedback(feedbackItem: any) {
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
    const feedback = await getFeedback();
    const updatedFeedback = feedback.filter((fb: any) => fb.id !== id);

    if (feedback.length === updatedFeedback.length) {
        return false; // Indicates feedback with the given id was not found
    }

    await fs.writeFile(feedbackFilePath, JSON.stringify(updatedFeedback, null, 2));
    return true; // Indicates success
}
