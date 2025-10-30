
import { MainLayout } from "@/components/layout/main-layout";
import { notFound } from 'next/navigation';
import type { Berita } from "@/models/Berita";
import { connectToDatabase } from "@/lib/mongodb"; // 1. Import koneksi DB

// 2. Modifikasi fungsi untuk mengambil data langsung dari DB
async function getBerita(slug: string): Promise<Berita | null> {
  try {
    const db = await connectToDatabase();
    const beritaCollection = db.collection('berita');

    // Cari artikel berdasarkan slug
    const news = await beritaCollection.findOne({ slug: slug });

    if (!news) {
      return null;
    }
    
    // Serialisasi data untuk memastikan aman dikirim dari server ke client component
    return JSON.parse(JSON.stringify(news));

  } catch (error) {
    console.error("Error saat fetching berita dari DB:", error);
    return null;
  }
}

export default async function BeritaDetailPage({ params }: { params: { slug: string } }) {
  const news = await getBerita(params.slug);

  if (!news) {
    notFound();
  }

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-12">
        <article className="max-w-4xl mx-auto bg-white p-6 sm:p-8 rounded-lg shadow-md">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">{news.title}</h1>
          <p className="text-gray-500 mb-6">Dipublikasikan pada: {new Date(news.date).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
          
          {news.image && (
             <img 
                src={news.image} 
                alt={news.title} 
                className="w-full h-auto rounded-lg shadow-lg mb-8" 
             />
          )}
          
          <div 
            className="prose lg:prose-xl max-w-none text-gray-800"
            dangerouslySetInnerHTML={{ __html: news.content }}
          ></div>
        </article>
      </div>
    </MainLayout>
  );
}
