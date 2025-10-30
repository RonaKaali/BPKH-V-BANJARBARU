
import { getFeedback } from "@/lib/feedback";
import { FeedbackClient } from "./feedback-client";

// PERBAIKAN: Memaksa rendering dinamis untuk selalu mendapatkan data terbaru
export const revalidate = 0;

// Ini adalah Server Component untuk halaman Pelayanan
export default async function PelayananPage() {
  // Mengambil data masukan langsung dari database di server
  const initialFeedbacks = await getFeedback();

  return (
    <div className="container mx-auto py-10 px-4">
      <h1 className="text-4xl font-bold text-center mb-10 text-primary">Layanan Masukan & Pengaduan</h1>
      {/* 
        Render Client Component dan teruskan data awal dari server.
        Semua logika interaktif (form, state) ada di dalam FeedbackClient.
      */}
      <FeedbackClient initialFeedbacks={initialFeedbacks} />
    </div>
  );
}
