import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

const dataFilePath = path.join(process.cwd(), 'data', 'feedback.json');

export async function GET() {
  try {
    const fileContent = await fs.readFile(dataFilePath, 'utf-8');
    const feedbacks = JSON.parse(fileContent);
    // sort feedback by timestamp descending
    feedbacks.sort((a: any, b: any) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
    return NextResponse.json(feedbacks, { status: 200 });
  } catch (error: any) {
    if (error.code === 'ENOENT') {
      return NextResponse.json([], { status: 200 }); // Return empty array if file doesn't exist
    }
    console.error('Error reading feedback:', error);
    return NextResponse.json({ message: 'Terjadi kesalahan internal saat membaca data.' }, { status: 500 });
  }
}
