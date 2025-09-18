import { connectToDatabase } from "./mongodb";
import { ObjectId } from "mongodb";

async function getAppointmentsCollection() {
  try {
    const db = await connectToDatabase();
    return db.collection("appointments");
  } catch (error) {
    console.error("DB connection failed:", error);
    return null; // fallback untuk build agar tidak crash
  }
}

// Ambil semua appointments
export const getAppointments = async () => {
  const collection = await getAppointmentsCollection();
  if (!collection) return []; // fallback kalau DB tidak tersedia

  const appointments = await collection.find({}).toArray();
  return appointments.map((doc: any) => ({
    id: doc._id.toString(),
    ...doc,
  }));
};

// Tambah appointment baru
export const addAppointment = async (appointment: { name: string; email: string; phone: string; date: string; purpose: string }) => {
  const collection = await getAppointmentsCollection();
  if (!collection) throw new Error("Database tidak tersedia");

  const result = await collection.insertOne({
    ...appointment,
    status: "Pending",
    timestamp: new Date(),
  });

  return result.insertedId.toString();
};

// Update status appointment
export const updateAppointmentStatus = async (id: string, status: string) => {
  const collection = await getAppointmentsCollection();
  if (!collection) throw new Error("Database tidak tersedia");

  const result = await collection.updateOne(
    { _id: new ObjectId(id) },
    { $set: { status } }
  );

  if (result.matchedCount === 0) {
    throw new Error("Janji temu tidak ditemukan");
  }
};
