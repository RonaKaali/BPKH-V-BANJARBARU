import { MongoClient, Db } from 'mongodb';

const uri = process.env.MONGODB_URI;

// Pemeriksaan ini penting untuk menghentikan build jika variabel tidak ada.
if (!uri) {
    throw new Error('CRITICAL: The MONGODB_URI environment variable was not found. Please re-check Vercel settings.');
}

// Client dibuat di sini, di mana `uri` sudah pasti ada.
const client = new MongoClient(uri);

let db: Db;

export async function connectToDatabase() {
  if (db) {
    return db;
  }

  try {
    await client.connect();
    db = client.db('bpkh_db'); 
    console.log('Connected to MongoDB successfully!');
    return db;
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    
    // Meskipun kita sudah memeriksa `uri` di atas, TypeScript butuh pemeriksaan di sini juga.
    if (uri) {
        const safeUri = uri.replace(/:\/\/.*@/, '://<credentials>@');
        console.error('Attempted to connect with this URI:', safeUri);
    } else {
        console.error('Attempted to connect, but MONGODB_URI was undefined at the point of error.');
    }
    
    throw error;
  }
}
