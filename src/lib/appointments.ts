import { connectToDatabase } from './mongodb';
import { ObjectId } from 'mongodb';

async function getAppointmentsCollection() {
  const db = await connectToDatabase();
  return db.collection('appointments');
}

export const getAppointments = async () => {
  const collection = await getAppointmentsCollection();
  const appointments = await collection.find({}).toArray();
  // Explicitly type `doc` as `any` to resolve the build error.
  return appointments.map((doc: any) => ({ id: doc._id.toString(), ...doc }));
};

export const addAppointment = async (appointment: { name: string, email: string, phone: string, date: string, purpose: string }) => {
  const collection = await getAppointmentsCollection();
  const result = await collection.insertOne({ ...appointment, status: 'Pending', timestamp: new Date() });
  return result.insertedId.toString();
};

export const updateAppointmentStatus = async (id: string, status: string) => {
  const collection = await getAppointmentsCollection();
  const result = await collection.updateOne({ _id: new ObjectId(id) }, { $set: { status } });

  if (result.matchedCount === 0) {
    throw new Error('Janji temu tidak ditemukan');
  }

  if (result.modifiedCount === 0) {
    // Tidak ada yang diubah, bisa jadi statusnya sama
  }
};
