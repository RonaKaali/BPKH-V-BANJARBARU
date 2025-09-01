
import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

const feedbackFilePath = path.join(process.cwd(), 'data', 'feedback.json');

// Fungsi untuk membaca feedback
async function getFeedback() {
  try {
    const data = await fs.readFile(feedbackFilePath, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    return []; // Jika file tidak ada, kembalikan array kosong
  }
}

// Handler untuk GET request
export async function GET() {
  const feedback = await getFeedback();
  return NextResponse.json(feedback);
}

// Handler untuk POST request
export async function POST(req: Request) {
  try {
    const feedback = await getFeedback();
    const newFeedback = await req.json();

    if (!newFeedback.name || !newFeedback.message) {
        return new NextResponse('Nama dan pesan tidak boleh kosong', { status: 400 });
    }

    // Tambahkan ID unik dan timestamp
    const feedbackToAdd = {
        id: Date.now().toString(),
        timestamp: new Date().toISOString(),
        ...newFeedback
    };

    feedback.push(feedbackToAdd);
    await fs.writeFile(feedbackFilePath, JSON.stringify(feedback, null, 2));

    return NextResponse.json(feedbackToAdd, { status: 201 });

  } catch (error) {
    console.error('[API_FEEDBACK_POST]', error);
    return new NextResponse('Kesalahan Internal Server', { status: 500 });
  }
}
