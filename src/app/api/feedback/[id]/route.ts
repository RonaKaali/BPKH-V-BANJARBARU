
import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

const feedbackFilePath = path.join(process.cwd(), 'data', 'feedback.json');

// Fungsi untuk membaca semua feedback
async function getFeedback() {
  try {
    const data = await fs.readFile(feedbackFilePath, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
}

// Handler untuk DELETE request
export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    let feedback = await getFeedback();

    // Filter untuk menghapus feedback berdasarkan ID
    const updatedFeedback = feedback.filter((fb: any) => fb.id !== id);

    // Jika panjang array tidak berubah, berarti ID tidak ditemukan
    if (feedback.length === updatedFeedback.length) {
      return new NextResponse('Feedback tidak ditemukan', { status: 404 });
    }

    // Tulis kembali data yang sudah diperbarui ke file
    await fs.writeFile(feedbackFilePath, JSON.stringify(updatedFeedback, null, 2));

    return new NextResponse(null, { status: 204 }); // 204 No Content

  } catch (error) {
    console.error('[API_FEEDBACK_DELETE]', error);
    return new NextResponse('Kesalahan Internal Server', { status: 500 });
  }
}
