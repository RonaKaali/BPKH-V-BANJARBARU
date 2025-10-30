
import { connectToDatabase } from "./mongodb";
import { ObjectId } from 'mongodb'; // Import ObjectId

// Definisikan tipe data Feedback yang akan digunakan di seluruh aplikasi
export interface Feedback {
  _id: string;
  name: string;
  message: string;
  timestamp: Date;
}

// Tipe untuk data yang masuk saat membuat feedback baru (tanpa _id dan timestamp)
type NewFeedbackData = Omit<Feedback, '_id' | 'timestamp'>;


// Fungsi untuk mengambil semua masukan dari database
export async function getFeedback(): Promise<Feedback[]> {
  try {
    const db = await connectToDatabase();
    const collection = db.collection("feedback");

    const feedbacks = await collection
      .find({})
      .sort({ timestamp: -1 })
      .toArray();

    // Konversi ObjectId ke string untuk semua dokumen agar aman di sisi klien
    const sanitizedFeedbacks = feedbacks.map(fb => ({
      ...fb,
      _id: fb._id.toString(),
    }));

    return JSON.parse(JSON.stringify(sanitizedFeedbacks));

  } catch (error) {
    console.error("Gagal mengambil data masukan:", error);
    return [];
  }
}

// PERBAIKAN: Membuat fungsi addFeedback yang hilang
export async function addFeedback(data: NewFeedbackData): Promise<Feedback> {
  try {
    const db = await connectToDatabase();
    const collection = db.collection("feedback");
    
    const newFeedbackDocument = {
      ...data,
      timestamp: new Date(),
    };

    const result = await collection.insertOne(newFeedbackDocument);

    const insertedFeedback: Feedback = {
      _id: result.insertedId.toString(),
      ...newFeedbackDocument,
    };
    
    return JSON.parse(JSON.stringify(insertedFeedback));

  } catch (error) {
    console.error("Gagal menambahkan masukan:", error);
    throw new Error('Gagal menambahkan masukan ke database.');
  }
}

// Fungsi untuk menghapus masukan berdasarkan ID
export async function deleteFeedbackById(id: string): Promise<{ success: boolean; message?: string }> {
  try {
    // Pastikan ID adalah string yang valid sebelum konversi
    if (!ObjectId.isValid(id)) {
      return { success: false, message: 'Invalid ID format' };
    }

    const db = await connectToDatabase();
    const collection = db.collection("feedback");
    
    const result = await collection.deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 1) {
      return { success: true };
    } else {
      return { success: false, message: 'Feedback not found' };
    }
  } catch (error) {
    console.error("Gagal menghapus masukan:", error);
    return { success: false, message: 'Internal server error' };
  }
}
