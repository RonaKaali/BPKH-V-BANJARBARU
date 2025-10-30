
import { connectToDatabase } from "./mongodb";
import { ObjectId } from 'mongodb'; // Import ObjectId

// Definisikan tipe data Feedback yang konsisten
interface Feedback {
  _id: string;
  name: string;
  message: string;
  timestamp: Date;
}

// Fungsi untuk mengambil semua masukan dari database
export async function getFeedback(): Promise<Feedback[]> {
  try {
    const db = await connectToDatabase();
    const collection = db.collection<Feedback>("feedback");

    const feedbacks = await collection
      .find({})
      .sort({ timestamp: -1 })
      .toArray();

    return JSON.parse(JSON.stringify(feedbacks));

  } catch (error) {
    console.error("Gagal mengambil data masukan:", error);
    return [];
  }
}

// PERBAIKAN: Membuat fungsi deleteFeedbackById yang hilang
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
