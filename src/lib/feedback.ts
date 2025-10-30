
import { connectToDatabase } from './mongodb';
import { ObjectId } from 'mongodb';

async function getFeedbackCollection() {
  const db = await connectToDatabase();
  return db.collection('feedback');
}

export const getFeedback = async () => {
  const collection = await getFeedbackCollection();
  const feedback = await collection.find({}).sort({ timestamp: -1 }).toArray();
  // Perbaikan: Konversi _id menjadi string dan kembalikan seluruh dokumen
  return feedback.map((doc) => ({
    ...doc,
    _id: doc._id.toString(),
  }));
};

// PERBAIKAN: Fungsi ini sekarang akan mengembalikan seluruh dokumen yang baru dibuat
export const addFeedback = async (feedback: { name: string, message: string }) => {
  const collection = await getFeedbackCollection();
  const timestamp = new Date();
  
  // 1. Masukkan dokumen baru dengan timestamp server
  const result = await collection.insertOne({ ...feedback, timestamp });

  // 2. Ambil dokumen yang baru saja dimasukkan menggunakan insertedId
  const newFeedback = await collection.findOne({ _id: result.insertedId });

  // 3. Kembalikan seluruh dokumen
  return newFeedback;
};

export const deleteFeedbackById = async (id: string) => {
  const collection = await getFeedbackCollection();
  if (!ObjectId.isValid(id)) {
    return false; // Kembalikan false jika ID tidak valid
  }
  const result = await collection.deleteOne({ _id: new ObjectId(id) });
  return result.deletedCount > 0;
};
