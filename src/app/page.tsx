
import { connectToDatabase } from "@/lib/mongodb";
import { HomeClient } from "./home-client";
import type { Berita } from "@/models/Berita";

// Tipe data untuk Feedback, pastikan cocok dengan skema DB
interface Feedback {
  _id: string;
  name: string;
  message: string;
  timestamp: Date;
}

// 1. Fungsi untuk mengambil berita terbaru dari database (Server-side)
async function getLatestNews(): Promise<Berita[]> {
  try {
    const db = await connectToDatabase();
    const news = await db
      .collection("berita")
      .find({})
      .sort({ date: -1 }) // Urutkan berdasarkan tanggal terbaru
      .limit(3) // Ambil 3 berita teratas
      .toArray();
    return JSON.parse(JSON.stringify(news));
  } catch (error) {
    console.error("Gagal mengambil berita terbaru:", error);
    return []; // Kembalikan array kosong jika gagal
  }
}

// 2. Fungsi untuk mengambil masukan dari database (Server-side)
async function getFeedbacks(): Promise<Feedback[]> {
  try {
    const db = await connectToDatabase();
    const feedbacks = await db
      .collection("feedback")
      .find({})
      .sort({ timestamp: -1 }) // Urutkan berdasarkan waktu terbaru
      .toArray();
    return JSON.parse(JSON.stringify(feedbacks));
  } catch (error) {
    console.error("Gagal mengambil data masukan:", error);
    return [];
  }
}

// 3. Halaman utama (Server Component)
export default async function Home() {
  // Ambil kedua data secara paralel untuk efisiensi
  const [latestNews, initialFeedbacks] = await Promise.all([
    getLatestNews(),
    getFeedbacks(),
  ]);

  // 4. Render Komponen Klien dan teruskan datanya sebagai props
  return <HomeClient latestNews={latestNews} initialFeedbacks={initialFeedbacks} />;
}
