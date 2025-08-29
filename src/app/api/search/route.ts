import { NextResponse } from 'next/server';

const allContent = [
  {
    title: 'Profil BPKH Wilayah V Banjarbaru',
    summary: 'Sejarah, visi, misi, dan tugas pokok BPKH Wilayah V Banjarbaru.',
    href: '/tentang-balai/profil',
  },
  {
    title: 'Struktur Organisasi',
    summary: 'Bagan struktur organisasi BPKH Wilayah V Banjarbaru.',
    href: '/tentang-balai/struktur-organisasi',
  },
  {
    title: 'Dokumen Perencanaan',
    summary: 'Kumpulan dokumen perencanaan BPKH Wilayah V Banjarbaru.',
    href: '/tata-usaha/dokumen-perencanaan',
  },
  {
    title: 'Pengukuhan Kawasan Hutan',
    summary: 'Informasi mengenai proses pengukuhan kawasan hutan.',
    href: '/ppkh/pengukuhan-kawasan-hutan',
  },
  {
    title: 'BPKH WILAYAH V BANJARBARU',
    summary: 'Sumber utama Anda untuk memahami dan menavigasi kebijakan, peraturan, dan upaya konservasi kehutanan. Balai Pemantapan Kawasan Hutan (BPKH) adalah garda terdepan dalam menjaga kelestarian hutan Indonesia. Kami bertugas untuk memantapkan kawasan hutan, memastikan batas-batasnya jelas, dan merencanakan pemanfaatannya secara berkelanjutan. Melalui teknologi mutakhir dan dedikasi tinggi, kami bekerja untuk menciptakan keseimbangan antara kebutuhan manusia dan kelestarian alam, demi masa depan bumi yang lebih hijau.',
    href: '/',
  },
  {
    title: 'Hubungi Kami',
    summary: 'Temukan cabang Kementerian Kehutanan terdekat. Kami siap membantu.',
    href: '/contact',
  },
  {
    title: 'Tanya Jawab dengan AI',
    summary: 'Punya pertanyaan tentang kebijakan atau peraturan kehutanan? Tanyakan pada asisten AI kami untuk jawaban yang jelas dan ringkas.',
    href: '/faq',
  },
  {
    title: 'Peraturan Kehutanan',
    summary: 'Tinjauan umum tentang kebijakan utama dan kerangka hukum yang mengatur hutan kita.',
    href: '/regulations',
  },
];

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q');

  if (!query) {
    return NextResponse.json([]);
  }

  const results = allContent.filter(
    (item) =>
      item.title.toLowerCase().includes(query.toLowerCase()) ||
      item.summary.toLowerCase().includes(query.toLowerCase())
  );

  return NextResponse.json(results);
}
