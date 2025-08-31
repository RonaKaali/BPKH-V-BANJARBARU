import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

const dataFilePath = path.join(process.cwd(), 'data', 'feedback.json');

async function ensureDirectoryExists() {
  try {
    await fs.mkdir(path.dirname(dataFilePath), { recursive: true });
  } catch (error: any) {
    if (error.code !== 'EEXIST') {
      throw error;
    }
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, message } = body;

    if (!name || !message) {
      return NextResponse.json({ message: 'Nama dan pesan harus diisi.' }, { status: 400 });
    }

    await ensureDirectoryExists();

    const newFeedback = {
      id: Date.now().toString(),
      name,
      message,
      timestamp: new Date().toISOString(),
    };

    let feedbacks = [];
    try {
      const fileContent = await fs.readFile(dataFilePath, 'utf-8');
      feedbacks = JSON.parse(fileContent);
    } catch (error: any) {
      if (error.code !== 'ENOENT') {
        console.error("Error reading feedback file, will overwrite:", error);
      }
    }

    feedbacks.push(newFeedback);

    await fs.writeFile(dataFilePath, JSON.stringify(feedbacks, null, 2));

    return NextResponse.json({ message: 'Terima kasih atas masukan Anda!' }, { status: 201 });
  } catch (error) {
    console.error('Error processing feedback:', error);
    return NextResponse.json({ message: 'Terjadi kesalahan internal.' }, { status: 500 });
  }
}
