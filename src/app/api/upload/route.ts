'use server';

import { NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import path from 'path';

// Fungsi untuk memastikan direktori ada
async function ensureDirectoryExists(directory: string) {
  const fs = require('fs').promises;
  try {
    await fs.mkdir(directory, { recursive: true });
  } catch (error: any) {
    if (error.code !== 'EEXIST') {
      throw error; // Lemparkan error jika bukan karena direktori sudah ada
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

    // Ubah nama file untuk menghindari konflik dan bersihkan karakter tidak aman
    const timestamp = Date.now();
    const safeOriginalName = file.name.replace(/[^a-zA-Z0-9._-]/g, '-');
    const uniqueFilename = `${timestamp}-${safeOriginalName}`;

    // Tentukan path untuk menyimpan file
    const uploadDir = path.join(process.cwd(), 'public', 'uploads');
    const filePath = path.join(uploadDir, uniqueFilename);

    // Pastikan direktori uploads ada
    await ensureDirectoryExists(uploadDir);

    // Baca file sebagai buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Tulis file ke sistem file
    await writeFile(filePath, buffer);

    console.log(`File berhasil diunggah dan disimpan di: ${filePath}`);

    // Kembalikan URL publik dari file yang diunggah
    const publicUrl = `/uploads/${uniqueFilename}`;
    return NextResponse.json({ message: 'File berhasil diunggah', url: publicUrl }, { status: 201 });

  } catch (error) {
    console.error('API_UPLOAD_ERROR:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
