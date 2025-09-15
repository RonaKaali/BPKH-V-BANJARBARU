import { MongoClient, Db } from 'mongodb';

// --- BEGIN FINAL FIX DIAGNOSTIC ---
console.log("--- DIAGNOSTIC: CHECKING FOR MONGODB_URI_FIX ---");
const newUri = process.env.MONGODB_URI_FIX;
const oldUri = process.env.MONGODB_URI;

if (newUri) {
  console.log("SUCCESS: MONGODB_URI_FIX is present. Using this new variable.");
} else {
  console.log("WARNING: MONGODB_URI_FIX is NOT set. Falling back to old MONGODB_URI.");
  if (oldUri) {
      console.log("Old MONGODB_URI value:", oldUri);
  } else {
      console.log("CRITICAL: Both MONGODB_URI_FIX and MONGODB_URI are not set!");
  }
}
console.log("--- END DIAGNOSTIC ---");

// Gunakan variabel baru, dengan fallback ke yang lama, lalu ke localhost.
const uri = process.env.MONGODB_URI_FIX || process.env.MONGODB_URI || 'mongodb://localhost:27017';

if (!uri.startsWith('mongodb')) {
    console.error('CRITICAL ERROR: Invalid MongoDB URI after checking variables!');
    throw new Error('Invalid MongoDB URI');
}

const client = new MongoClient(uri);

let db: Db;

export async function connectToDatabase() {
  if (db) {
    return db;
  }

  try {
    await client.connect();
    // Nama database sudah ada di connection string, tapi ini untuk memastikan.
    db = client.db('bpkh_db'); 
    console.log('Connected to MongoDB successfully!');
    return db;
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    throw error;
  }
}
