'use server';

import { NextResponse } from 'next/server';
import { put } from '@vercel/blob';

export async function POST(request: Request) {
  try {
    const data = await request.formData();
    const file: File | null = data.get('file') as unknown as File;

    if (!file) {
      return NextResponse.json({ message: 'Tidak ada file yang diunggah.' }, { status: 400 });
    }

    const timestamp = Date.now();
    const safeOriginalName = file.name.replace(/[^a-zA-Z0-9._-]/g, '-');
    const uniqueFilename = `${timestamp}-${safeOriginalName}`;

    // Unggah file ke Vercel Blob
    const blob = await put(uniqueFilename, file, {
      access: 'public',
    });

    // `blob.url` akan berisi URL publik dari file yang diunggah
    console.log(`File berhasil diunggah dan tersedia di: ${blob.url}`);

    // Kembalikan URL dari Vercel Blob
    return NextResponse.json({ message: 'File berhasil diunggah', url: blob.url }, { status: 201 });

  } catch (error) {
    console.error('API_UPLOAD_ERROR:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
