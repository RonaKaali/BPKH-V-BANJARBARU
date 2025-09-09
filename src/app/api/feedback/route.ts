
import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

const dataDir = path.join(process.cwd(), 'data');
const feedbackFilePath = path.join(dataDir, 'feedback.json');

// Fungsi untuk memastikan direktori ada
async function ensureDirectoryExists() {
  try {
    await fs.mkdir(dataDir, { recursive: true });
  } catch (error) {
    console.error('Gagal membuat direktori:', error);
    // Melemparkan ulang kesalahan untuk ditangani oleh pemanggil
    throw new Error('Gagal memastikan direktori data ada.');
  }
}

// Fungsi untuk membaca feedback
async function getFeedback() {
  try {
    await ensureDirectoryExists(); // Pastikan direktori ada sebelum membaca
    const data = await fs.readFile(feedbackFilePath, 'utf-8');
    // Jika file kosong, kembalikan array kosong untuk menghindari kesalahan parse JSON
    if (!data) {
      return [];
    }
    return JSON.parse(data);
  } catch (error) {
    // Jika file tidak ada (ENOENT) atau terjadi kesalahan lain, kembalikan array kosong
    return [];
  }
}

// Handler untuk GET request
export async function GET() {
  try {
    const feedback = await getFeedback();
    return NextResponse.json(feedback);
  } catch (error) {
    console.error('[API_FEEDBACK_GET]', error);
    return new NextResponse('Kesalahan Internal Server saat mengambil data', { status: 500 });
  }
}

// Handler untuk POST request
export async function POST(req: Request) {
  try {
    const feedback = await getFeedback();
    const newFeedback = await req.json();

    if (!newFeedback.name || !newFeedback.message) {
        return new NextResponse('Nama dan pesan tidak boleh kosong', { status: 400 });
    }

    const feedbackToAdd = {
        id: Date.now().toString(),
        timestamp: new Date().toISOString(),
        ...newFeedback
    };

    feedback.push(feedbackToAdd);

    await ensureDirectoryExists(); // Pastikan direktori ada sebelum menulis
    await fs.writeFile(feedbackFilePath, JSON.stringify(feedback, null, 2));

    return NextResponse.json(feedbackToAdd, { status: 201 });

  } catch (error) {
    console.error('[API_FEEDBACK_POST]', error);
    return new NextResponse('Kesalahan Internal Server', { status: 500 });
  }
}
