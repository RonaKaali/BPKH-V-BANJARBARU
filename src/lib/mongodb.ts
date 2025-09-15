import { MongoClient, Db } from 'mongodb';

const uri = process.env.MONGODB_URI;

if (!uri) {
    // Error ini akan sangat jelas jika Vercel masih gagal memberikan variabelnya.
    throw new Error('CRITICAL: The MONGODB_URI environment variable was not found. Please re-check Vercel settings.');
}

const client = new MongoClient(uri);

let db: Db;

export async function connectToDatabase() {
  if (db) {
    return db;
  }

  try {
    await client.connect();
    // Nama DB sudah ada di URI, ini hanya untuk memastikan.
    db = client.db('bpkh_db'); 
    console.log('Connected to MongoDB successfully!');
    return db;
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    
    // Log versi aman dari URI untuk debugging terakhir jika masih gagal.
    const safeUri = uri.replace(/:\/\/.*@/, '://<credentials>@');
    console.error('Attempted to connect with this URI:', safeUri);
    
    throw error;
  }
}
