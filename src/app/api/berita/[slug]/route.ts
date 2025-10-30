'use server';

import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import { Berita } from '@/models/Berita';
import { ObjectId } from 'mongodb';

// GET a single news article by slug
export async function GET(request: Request, { params }: { params: { slug: string } }) {
  try {
    const db = await connectToDatabase();
    const beritaCollection = db.collection<Berita>('berita');
    const article = await beritaCollection.findOne({ slug: params.slug });

    if (!article) {
      return NextResponse.json({ message: 'Berita tidak ditemukan' }, { status: 404 });
    }

    return NextResponse.json(article);
  } catch (error) {
    console.error(`API_BERITA_SLUG_GET_ERROR (slug: ${params.slug}):`, error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}

// PUT (update) a news article by slug
export async function PUT(request: Request, { params }: { params: { slug: string } }) {
  try {
    const data: Partial<Berita> = await request.json();
    const { title, content, image } = data;

    const fieldsToUpdate: any = {
        updatedAt: new Date(),
    };
    if (title) fieldsToUpdate.title = title;
    if (content) fieldsToUpdate.content = content;
    if (image) fieldsToUpdate.image = image;

    if (Object.keys(fieldsToUpdate).length === 1) {
        return NextResponse.json({ message: 'No fields to update' }, { status: 400 });
    }

    const db = await connectToDatabase();
    const beritaCollection = db.collection<Berita>('berita');

    const result = await beritaCollection.updateOne(
      { slug: params.slug },
      { $set: fieldsToUpdate }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json({ message: 'Berita tidak ditemukan' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Berita berhasil diperbarui' });
  } catch (error) {
    console.error(`API_BERITA_SLUG_PUT_ERROR (slug: ${params.slug}):`, error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}

// DELETE a news article by slug
export async function DELETE(request: Request, { params }: { params: { slug: string } }) {
  try {
    const db = await connectToDatabase();
    const beritaCollection = db.collection<Berita>('berita');

    const result = await beritaCollection.deleteOne({ slug: params.slug });

    if (result.deletedCount === 0) {
      return NextResponse.json({ message: 'Berita tidak ditemukan' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Berita berhasil dihapus' }, { status: 200 });
  } catch (error) {
    console.error(`API_BERITA_SLUG_DELETE_ERROR (slug: ${params.slug}):`, error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
