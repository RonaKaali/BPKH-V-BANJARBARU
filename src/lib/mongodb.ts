import { MongoClient, Db } from 'mongodb';

// --- DEBUGGING LINE ---
console.log(`[DEBUG] MONGODB_URI value is: ${process.env.MONGODB_URI}`);
// --------------------

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
