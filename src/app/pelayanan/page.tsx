
import { MainLayout } from "@/components/layout/main-layout";
import { connectToDatabase } from "@/lib/mongodb";
import { FeedbackClient } from "./feedback-client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageSquare } from "lucide-react";

// Definisikan tipe data untuk feedback, pastikan sesuai dengan struktur di DB
interface Feedback {
  _id: string; // MongoDB menggunakan _id
  name: string;
  message: string;
  timestamp: Date; // Timestamp biasanya disimpan sebagai Date object
}

// 1. Fungsi untuk mengambil data langsung dari database (Server-side)
async function getFeedbacks(): Promise<Feedback[]> {
  try {
    const db = await connectToDatabase();
    const feedbacks = await db
      .collection("feedback")
      .find({})
      .sort({ timestamp: -1 }) // Urutkan berdasarkan waktu terbaru
      .toArray();
    
    // Konversi data ke format yang aman untuk dikirim ke client component
    return JSON.parse(JSON.stringify(feedbacks));
  } catch (error) {
    console.error("Gagal mengambil data masukan:", error);
    return []; // Kembalikan array kosong jika terjadi error
  }
}

// 2. Ubah halaman utama menjadi Server Component (hapus 'use client')
export default async function PelayananPage() {
  // Ambil data masukan saat halaman di-render di server
  const feedbacks = await getFeedbacks();

  return (
    <div className="container mx-auto py-12 px-4">
      <CardHeader className="mb-8 text-center">
        <div className="inline-block mx-auto p-3 bg-primary/10 rounded-full">
            <MessageSquare className="h-10 w-10 text-primary" />
        </div>
        <CardTitle className="text-3xl font-bold text-primary tracking-tight mt-4">Kritik & Saran</CardTitle>
        <p className="text-muted-foreground pt-2 max-w-2xl mx-auto">
          Sampaikan kritik, saran, atau masukan Anda untuk membantu kami meningkatkan kualitas pelayanan publik di BPKH Wilayah V Banjarbaru.
        </p>
      </CardHeader>

      {/* 
        3. Gunakan Client Component untuk bagian interaktif (Formulir dan Daftar)
           dan teruskan data yang sudah diambil di server sebagai props.
      */}
      <FeedbackClient initialFeedbacks={feedbacks} />
    </div>
  );
}
