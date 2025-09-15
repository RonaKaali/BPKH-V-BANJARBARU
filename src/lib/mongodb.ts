import { MongoClient, Db } from 'mongodb';

// --- BEGIN DIAGNOSTIC ---
console.log("--- DIAGNOSTIC: CHECKING ENVIRONMENT VARIABLES ---");
const rawUri = process.env.MONGODB_URI;

if (rawUri) {
  // Untuk debugging ini, kita perlu melihat string mentahnya.
  // Ini akan menunjukkan kepada kita dengan pasti apa yang Vercel berikan ke aplikasi.
  console.log("MONGODB_URI as seen by runtime:", rawUri);
} else {
  console.log("CRITICAL ERROR: MONGODB_URI environment variable is NOT SET!");
}
console.log("--- END DIAGNOSTIC ---");
// --- END DIAGNOSTIC ---

const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017';
const client = new MongoClient(uri);

let db: Db;

export async function connectToDatabase() {
  if (db) {
    return db;
  }

  try {
    await client.connect();
    db = client.db('bpkh_db'); // Menggunakan nama database 'bpkh_db'
    console.log('Connected to MongoDB');
    return db;
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    throw error;
  }
}
