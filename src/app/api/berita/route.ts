'use server';

import { NextResponse, NextRequest } from 'next/server'; // Import NextRequest
import { connectToDatabase } from '@/lib/mongodb';
import { Berita } from '@/models/Berita';

// GET all news articles with optional limit
export async function GET(request: NextRequest) { // Terima request sebagai parameter
  try {
    const db = await connectToDatabase();
    const beritaCollection = db.collection<Berita>('berita');
    
    // Ambil `limit` dari query parameter
    const { searchParams } = new URL(request.url);
    const limit = searchParams.get('limit');

    let query = beritaCollection.find({}).sort({ date: -1 });

    // Jika ada limit, terapkan pada query
    if (limit) {
      const limitNumber = parseInt(limit, 10);
      if (!isNaN(limitNumber)) {
        query = query.limit(limitNumber);
      }
    }
    
    const allBerita = await query.toArray();

    return NextResponse.json(allBerita);
  } catch (error) {
    console.error('API_BERITA_GET_ERROR:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}

// POST a new news article
export async function POST(request: Request) {
  try {
    const data: Partial<Berita> = await request.json();
    
    if (!data.title || !data.content) {
      return NextResponse.json({ message: 'Title and content are required' }, { status: 400 });
    }

    // Generate a slug from the title
    const newSlug = data.title.toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
      .replace(/\s+/g, '-') // Replace spaces with hyphens
      .slice(0, 75); // Limit slug length

    const newArticle: Berita = {
      slug: newSlug,
      title: data.title,
      content: data.content,
      date: new Date().toISOString(), // Use full ISO string for more precise sorting
      image: data.image || '/images/news/default.jpg', // Handle optional image
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const db = await connectToDatabase();
    const beritaCollection = db.collection<Berita>('berita');

    const result = await beritaCollection.insertOne(newArticle);

    if (!result.insertedId) {
        throw new Error('Failed to insert the document.');
    }

    return NextResponse.json({ message: 'Berita berhasil dibuat', articleId: result.insertedId }, { status: 201 });

  } catch (error) {
    console.error('API_BERITA_POST_ERROR:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
