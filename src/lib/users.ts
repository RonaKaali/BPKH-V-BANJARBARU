import { connectToDatabase } from './mongodb';
import { Collection, ObjectId } from 'mongodb';

// Definisikan tipe data untuk User
interface User {
  _id: ObjectId;
  username: string;
  password: string; // Di aplikasi nyata, ini harusnya password yang sudah di-hash
}

// Fungsi untuk mendapatkan akses ke koleksi 'users'
async function getUsersCollection(): Promise<Collection<User>> {
  const db = await connectToDatabase();
  return db.collection('users');
}

/**
 * Mencari pengguna berdasarkan username.
 * @param username - Username yang akan dicari.
 * @returns Dokumen pengguna jika ditemukan, atau null jika tidak.
 */
export async function findUserByUsername(username: string): Promise<User | null> {
  const usersCollection = await getUsersCollection();
  // Cari pengguna berdasarkan username
  return await usersCollection.findOne({ username });
}
