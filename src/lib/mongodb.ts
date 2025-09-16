import { MongoClient, Db } from 'mongodb';

// --- LANGKAH DIAGNOSTIK: URI DI-HARDCODE ---
// Kita melewati process.env.MONGODB_URI untuk sementara waktu.
const uri = "mongodb+srv://bpkhadmin:selamatdatang123@bpkh5.7fy532l.mongodb.net/bpkh_db?retryWrites=true&w=majority&appName=bpkh5&authSource=admin";
// ---------------------------------------------

if (!uri) {
    throw new Error('CRITICAL: The MONGODB_URI was not found.');
}

const client = new MongoClient(uri);

let db: Db;

export async function connectToDatabase() {
  if (db) {
    return db;
  }

  try {
    await client.connect();
    db = client.db('bpkh_db'); 
    console.log('Connected to MongoDB successfully! (Using hardcoded URI)');
    return db;
  } catch (error) {
    console.error('Error connecting to MongoDB (with hardcoded URI):', error);
    
    // Log versi aman dari URI
    const safeUri = uri.replace(/:\/\/.*@/, '://<credentials>@');
    console.error('Attempted to connect with this URI:', safeUri);
    
    throw error;
  }
}
