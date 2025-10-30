
import { connectToDatabase } from "./mongodb";

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

    // PERBAIKAN: Hapus `projection` untuk mengambil semua field
    const feedbacks = await collection
      .find({})
      .sort({ timestamp: -1 }) // Urutkan berdasarkan waktu terbaru
      .toArray();

    // Kembalikan data lengkap yang sudah sesuai dengan tipe Feedback
    return JSON.parse(JSON.stringify(feedbacks));

  } catch (error) {
    console.error("Gagal mengambil data masukan:", error);
    return []; // Kembalikan array kosong jika terjadi kesalahan
  }
}
