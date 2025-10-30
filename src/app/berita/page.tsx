'use client';

import { MainLayout } from "@/components/layout/main-layout";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

const newsData = [
    {
        slug: 'penanaman-seribu-pohon-di-kalsel',
        title: 'BPKH Wilayah V Sukses Gelar Aksi Penanaman Seribu Pohon di Kalimantan Selatan',
        date: '22 September 2025',
        image: '/images/news/penanaman-pohon.jpg',
        summary: 'Dalam rangka memperingati Hari Hutan Sedunia, BPKH Wilayah V menginisiasi gerakan penanaman seribu pohon yang melibatkan masyarakat dan pelajar untuk meningkatkan kesadaran akan pentingnya kelestarian hutan.',
      },
      {
        slug: 'teknologi-drone-untuk-pemantauan-hutan',
        title: 'Pemanfaatan Teknologi Drone untuk Pemantauan Kawasan Hutan yang Lebih Efektif',
        date: '15 September 2025',
        image: '/images/news/drone-pemantauan.jpg',
        summary: 'BPKH Wilayah V mulai menerapkan teknologi drone canggih untuk memetakan dan memantau kawasan hutan secara real-time, memungkinkan deteksi dini kebakaran dan aktivitas ilegal.',
      },
      {
        slug: 'sosialisasi-perhutanan-sosial',
        title: 'Sosialisasi Program Perhutanan Sosial kepada Masyarakat Desa di Sekitar Hutan',
        date: '5 September 2025',
        image: '/images/news/sosialisasi-desa.jpg',
        summary: 'Sebagai upaya pemberdayaan masyarakat, BPKH Wilayah V mengadakan sosialisasi mengenai program perhutanan sosial yang bertujuan memberikan akses legal kepada masyarakat untuk mengelola hutan secara berkelanjutan.',
      }
];

export default function BeritaPage() {
  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold">Berita & Kegiatan</h1>
          <p className="text-gray-600 mt-2">Ikuti perkembangan dan kegiatan terbaru dari BPKH Wilayah V.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {newsData.map(news => (
            <Card key={news.slug}>
              <img src={news.image} alt={news.title} className="rounded-t-lg w-full h-48 object-cover"/>
              <CardHeader>
                <CardTitle className="h-24 text-ellipsis overflow-hidden">{news.title}</CardTitle>
                <CardDescription>{news.date}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4 h-24 text-ellipsis overflow-hidden">{news.summary}</p>
                <Link href={`/berita/${news.slug}`} className={buttonVariants({ variant: 'link' })}>
                  Baca Selengkapnya
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </MainLayout>
  );
}
