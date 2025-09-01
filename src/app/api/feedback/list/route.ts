// src/app/api/feedback/list/route.ts
import { NextResponse } from 'next/server';
import { getFeedback } from '@/lib/feedback';

export async function GET() {
  try {
    const feedbacks = await getFeedback();
    // sort feedback by timestamp descending
    feedbacks.sort((a: any, b: any) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
    return NextResponse.json(feedbacks, { status: 200 });
  } catch (error: any) {
    console.error('Error reading feedback:', error);
    return NextResponse.json({ message: 'Terjadi kesalahan internal saat membaca data.' }, { status: 500 });
  }
}
