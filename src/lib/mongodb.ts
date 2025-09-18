import { MongoClient, Db } from "mongodb";

const uri = process.env.MONGODB_URI;

let client: MongoClient | null = null;
let db: Db | null = null;

export async function connectToDatabase() {
  if (!uri) {
    console.warn("⚠️ MONGODB_URI tidak ditemukan. Koneksi DB tidak bisa dibuat.");
    throw new Error("Database connection string (MONGODB_URI) tidak ada");
  }

  if (db) {
    return db;
  }

  if (!client) {
    client = new MongoClient(uri);
    await client.connect();
  }

  db = client.db("bpkh5"); // ganti kalau DB name berbeda
  return db;
}
