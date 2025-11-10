'use server';

import { NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';

// Fungsi untuk memastikan direktori ada
async function ensureDirectoryExists(directory: string) {
  try {
    // Menggunakan mkdir yang diimpor dari fs/promises
    await mkdir(directory, { recursive: true });
  } catch (error: any) {
    // Jika direktori sudah ada, abaikan error EEXIST
    if (error.code !== 'EEXIST') {
      throw error;
    }
  }
}

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

    const uploadDir = path.join(process.cwd(), 'public', 'uploads');
    const filePath = path.join(uploadDir, uniqueFilename);

    await ensureDirectoryExists(uploadDir);

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    await writeFile(filePath, buffer);

    console.log(`File berhasil diunggah dan disimpan di: ${filePath}`);

    const publicUrl = `/uploads/${uniqueFilename}`;
    return NextResponse.json({ message: 'File berhasil diunggah', url: publicUrl }, { status: 201 });

  } catch (error) {
    console.error('API_UPLOAD_ERROR:', error);
    // Mengembalikan pesan error yang lebih spesifik jika memungkinkan,
    // namun untuk keamanan, 'Internal Server Error' sudah cukup.
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
