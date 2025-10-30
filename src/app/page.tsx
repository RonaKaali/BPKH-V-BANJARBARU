'use client';

import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { MainLayout } from "@/components/layout/main-layout";
import { SplashScreen } from "@/components/splash-screen";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import Link from "next/link";
import { motion } from 'framer-motion';
import { mainVariants } from '@/components/animations/variants';
import type { Berita } from "@/models/Berita";
import { useEffect, useState } from "react";

const surveyData = {
  ipk: {
    questions: 17,
    respondents: 100,
    value: 88.34
  },
  skm: {
    questions: 9,
    respondents: 100,
    value: 88.76
  }
}

const services = [
  {
    title: 'Informasi Publik',
    description: 'Akses informasi publik sesuai amanat UU No. 14 Tahun 2008 untuk transparansi dan akuntabilitas.',
    link: '/informasi-publik/berkala',
    icon: 'menu_book'
  },
  {
    title: 'Layanan PPID',
    description: 'Layanan Pejabat Pengelola Informasi dan Dokumentasi untuk memenuhi hak atas informasi.',
    link: '/ppid/peraturan',
    icon: 'contact_support'
  },
  {
    title: 'Data & Statistik Kehutanan',
    description: 'Pusat data dan statistik kehutanan, menyajikan informasi akurat untuk pengambilan kebijakan.',
    link: '/sdh/ground-check',
    icon: 'bar_chart'
  },
  {
    title: 'Pengukuhan & Penataan Kawasan Hutan',
    description: 'Layanan terkait proses pengukuhan dan penataan batas kawasan hutan untuk kepastian hukum.',
    link: '/ppkh/pengukuhan-kawasan-hutan',
    icon: 'layers'
  },
];

const faqData = [
  {
    question: 'Apa saja jenis layanan yang tersedia di BPKH Wilayah V?',
    answer: 'Kami menyediakan berbagai layanan, termasuk informasi publik, layanan PPID, data kehutanan, serta layanan terkait pengukuhan dan penataan kawasan hutan. Selengkapnya dapat dilihat pada bagian Layanan Kami.'
  },
  {
    question: 'Bagaimana cara mengajukan permohonan informasi publik?',
    answer: 'Anda dapat mengajukan permohonan melalui halaman Informasi Publik di situs ini. Di sana, Anda akan menemukan formulir serta prosedur yang harus diikuti.'
  },
  {
    question: 'Apakah BPKH Wilayah V menyediakan data statistik kehutanan?',
    answer: "Ya, kami menyediakan data dan statistik kehutanan yang dapat diakses melalui menu 'Data & Statistik Kehutanan'. Data ini diperbarui secara berkala untuk menjamin akurasi."
  },
  {
    question: 'Bagaimana saya bisa mendapatkan informasi mengenai proses pengukuhan kawasan hutan?',
    answer: "Informasi lengkap mengenai proses pengukuhan dan penataan kawasan hutan tersedia di menu 'Pengukuhan & Penataan Kawasan Hutan'. Anda juga dapat menghubungi kami jika memerlukan informasi lebih lanjut."
  }
];

const leadershipData = [
  {
    name: 'Suhendro A. Basori, S.Hut., M.Sc.',
    title: 'Kepala Balai',
    image: '/images/kepala-balai.jpg'
  },
  {
    name: 'Arief Akbar, S.T., M.M.',
    title: 'Kepala Sub Bagian Tata Usaha',
    image: '/images/arief-akbar.png'
  },
  {
    name: 'Dr. Jovan Sofyan, S.Hut., M.Si',
    title: 'Kepala Seksi Pengukuhan dan Penatagunaan Kawasan Hutan',
    image: '/images/jovan-sofyan.png'
  },
  {
    name: 'Tariyah Kurniawati, S.Hut., M.Si.',
    title: 'Kepala Seksi Sumber Daya Hutan',
    image: '/images/tariyah-kurniawati.png'
  },
];

const feedbackData = [
  { name: 'truth', message: 'baik sekali pelayanan nya', date: '18/9/2025, 10.06.32' },
  { name: 'dano', message: 'keren', date: '18/9/2025, 08.00.28' },
  { name: 'son', message: 'pembersihan lebih ketat', date: '16/9/2025, 22.45.01' },
  { name: 'jo', message: 'gelap kalau malam', date: '15/9/2025, 19.12.54' },
  { name: 'budi', message: 'Tolong lebih responsif dalam membalas email, terima kasih.', date: '14/9/2025, 14.30.11' },
];

export default function Home() {
    const [latestNews, setLatestNews] = useState<Berita[]>([]);

    useEffect(() => {
        async function fetchLatestNews() {
            try {
                const res = await fetch(`/api/berita?limit=3`, { cache: 'no-store' });
                if (!res.ok) {
                    console.error("Gagal mengambil berita terbaru dari API");
                    return;
                }
                const data = await res.json();
                setLatestNews(data);
            } catch (error) {
                console.error("Error saat fetching berita terbaru:", error);
            }
        }

        fetchLatestNews();
    }, []);

  return (
    <>
      <SplashScreen />
      <MainLayout>
        <motion.section
          id="hero"
          className="relative h-[600px] bg-cover bg-center flex items-center justify-center text-white text-center"
          style={{ backgroundImage: "url('/images/hero-background.jpg')" }}
          variants={mainVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="absolute inset-0 bg-black opacity-50"></div>
          <div className="relative z-10 p-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              BPKH WILAYAH V BANJARBARU
            </h1>
            <p className="text-lg md:text-xl max-w-3xl mx-auto">
              Sumber utama Anda untuk memahami dan menavigasi kebijakan, peraturan, dan upaya konservasi kehutanan.
            </p>
            <div className="mt-8 flex justify-center gap-4">
              <Link href="/appointment" className={buttonVariants({ size: 'lg' })}>
                Buat Janji Temu
              </Link>
              <Link href="/contact" className={buttonVariants({ size: 'lg' })}>
                Hubungi Kami
              </Link>
            </div>
          </div>
        </motion.section>
        
        <motion.section 
          id="about" 
          className="py-16"
          variants={mainVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.2 }} // once: false
        >
          <div className="container mx-auto px-4 text-center">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-4">Apa itu BPKH?</h2>
              <p className="text-gray-600 mb-6 text-justify">
                Balai Pemantapan Kawasan Hutan (BPKH) adalah garda terdepan dalam menjaga kelestarian hutan Indonesia. Kami bertugas untuk memantapkan kawasan hutan, memastikan batas-batasnya jelas, dan merencanakan pemanfaatannya secara berkelanjutan. Melalui teknologi mutakhir dan dedikasi tinggi, kami bekerja untuk menciptakan keseimbangan antara kebutuhan manusia dan kelestarian alam, demi masa depan bumi yang lebih hijau.
              </p>
              <h3 className="text-2xl font-bold mb-4">Komitmen Anti-Korupsi</h3>
              <p className="text-gray-600 mb-6 text-justify">
                BPKH Wilayah V Banjarbaru berkomitmen penuh untuk menciptakan lingkungan kerja yang bebas dari korupsi, kolusi, dan nepotisme. Kami menjunjung tinggi integritas dan transparansi dalam setiap aspek pelayanan kami kepada masyarakat dan negara.
              </p>
              <h3 className="text-2xl font-bold mb-4">Budaya Kerja CANGKAL</h3>
              <p className="text-gray-600 text-justify">
                Cerdas, Gigih, Adaptif, Akuntabel, Kolaboratif, dan Loyal. Nilai-nilai ini menjadi landasan kami dalam memberikan pelayanan terbaik dan menjaga kelestarian hutan Indonesia.
              </p>
            </div>

            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
              <img src="/images/maklumat-pelayanan.jpg" alt="Maklumat Pelayanan" className="rounded-lg shadow-lg max-h-96 w-auto mx-auto" />
              <img src="/images/budaya-kerja-cangkal.png" alt="Budaya Kerja CANGKAL" className="rounded-lg shadow-lg max-h-96 w-auto mx-auto" />
              <img src="/images/anti-korupsi.png" alt="Anti Korupsi" className="rounded-lg shadow-lg max-h-96 w-auto mx-auto" />
            </div>

          </div>
        </motion.section>

        <motion.section 
          id="services" 
          className="py-16 bg-gray-50"
          variants={mainVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.2 }} // once: false
        >
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold">Layanan Kami</h2>
              <p className="text-gray-600 mt-2">Menyediakan layanan informasi dan teknis di bidang kehutanan.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {services.map(service => (
                <Card key={service.title} className="text-center">
                  <CardHeader>
                    <div className="mx-auto bg-primary text-white rounded-full p-4 w-fit">
                      <span className="material-icons">{service.icon}</span>
                    </div>
                    <CardTitle>{service.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">{service.description}</p>
                    <Link href={service.link} className={`${buttonVariants({ variant: 'link' })} mt-4`}>
                      Selengkapnya
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </motion.section>

        <motion.section 
          id="latest-news" 
          className="py-16"
          variants={mainVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.2 }} // once: false
        >
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold">Berita Terkini</h2>
              <p className="text-gray-600 mt-2">Ikuti perkembangan dan kegiatan terbaru dari BPKH Wilayah V.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {latestNews.map(news => (
                <Card key={news.slug}>
                  <img src={news.image || '/images/news/placeholder.jpg'} alt={news.title} className="rounded-t-lg w-full h-48 object-cover"/>
                  <CardHeader>
                    <CardTitle className="h-24 text-ellipsis overflow-hidden">{news.title}</CardTitle>
                    <CardDescription>{new Date(news.date).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-gray-600 mb-4 h-24 text-ellipsis overflow-hidden" dangerouslySetInnerHTML={{ __html: (news.content || '').substring(0, 150) + '...' }} />
                    <Link href={`/berita/${news.slug}`} className={buttonVariants({ variant: 'link' })}>
                      Baca Selengkapnya
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </motion.section>

        <motion.section 
          id="survey" 
          className="py-16 bg-gray-50"
          variants={mainVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.2 }} // once: false
        >
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold">Survei Kepuasan Publik</h2>
              <p className="text-gray-600 mt-2">Partisipasi Anda sangat berarti untuk meningkatkan kualitas layanan kami.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-1 gap-8 items-start">
              <Card>
                <CardHeader>
                  <CardTitle>Indeks Persepsi Korupsi (IPK) & Survei Kepuasan Masyarakat (SKM)</CardTitle>
                  <CardDescription>
                    Berikut adalah hasil survei IPK dan SKM yang telah kami laksanakan.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                      <p className="text-4xl font-bold">{surveyData.ipk.value}</p>
                      <p className="text-gray-500">Nilai IPK</p>
                    </div>
                    <div>
                      <p className="text-4xl font-bold">{surveyData.skm.value}</p>
                      <p className="text-gray-500">Nilai SKM</p>
                    </div>
                  </div>
                  <Separator className="my-6" />
                  <div className="text-sm text-gray-600 space-y-2">
                    <p>Total {surveyData.ipk.respondents} responden telah berpartisipasi dalam survei kami.</p>
                    <p>Survei IPK terdiri dari {surveyData.ipk.questions} pertanyaan, sedangkan SKM memiliki {surveyData.skm.questions} pertanyaan.</p>
                  </div>
                  <div className="mt-6 flex flex-col sm:flex-row gap-4">
                    <Link href="/pelayanan/kuesioner-survei-ipk" className={buttonVariants({ className: 'w-full' })}>
                      Isi Survei IPK
                    </Link>
                    <Link href="/pelayanan/survei-kepuasan-masyarakat" className={buttonVariants({ variant: 'outline', className: 'w-full' })}>
                      Isi Survei SKM
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </motion.section>

        <motion.section 
          id="faq" 
          className="py-16"
          variants={mainVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.2 }} // once: false
        >
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold">Frequently Asked Questions (FAQ)</h2>
              <p className="text-gray-600 mt-2">Jawaban atas pertanyaan yang sering diajukan.</p>
            </div>
            <div className="max-w-3xl mx-auto">
              <Accordion type="single" collapsible className="w-full">
                {faqData.map((item, index) => (
                  <AccordionItem value={`item-${index + 1}`} key={index}>
                    <AccordionTrigger>{item.question}</AccordionTrigger>
                    <AccordionContent>{item.answer}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </motion.section>

        <motion.section 
          id="leadership" 
          className="py-16 bg-gray-50"
          variants={mainVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.2 }} // once: false
        >
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold">Struktur Pimpinan</h2>
              <p className="text-gray-600 mt-2">Tim pimpinan yang berdedikasi untuk memberikan layanan terbaik.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {leadershipData.map(leader => (
                <Card key={leader.name} className="text-center">
                  <CardContent className="p-4 flex flex-col items-center">
                    <img
                      src={leader.image}
                      alt={leader.name}
                      className="h-32 w-auto rounded-lg mb-3"
                    />
                    <h3 className="text-lg font-semibold">{leader.name}</h3>
                    <p className="text-primary text-sm">{leader.title}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </motion.section>
        
        <motion.section 
          id="location" 
          className="py-16"
          variants={mainVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.2 }} // once: false
        >
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold">Lokasi Kami</h2>
              <p className="text-gray-600 mt-2">Kunjungi kantor kami di Banjarbaru, Kalimantan Selatan.</p>
            </div>
            <div className="flex flex-col md:flex-row gap-8 items-start">
              <div className="w-full md:w-1/2">
                <img
                  src="/images/kantor-bpkh.jpg"
                  alt="Kantor BPKH Wilayah V Banjarbaru"
                  className="w-full h-auto rounded-lg shadow-md"
                />
              </div>
              <div className="w-full md:w-1/2">
                <iframe
                  src="https://maps.google.com/maps?q=-3.4439437,114.8546658&hl=id&z=14&amp;output=embed"
                  className="w-full h-[450px] rounded-lg shadow-md"
                  style={{ border: 0 }}
                  allowFullScreen={true}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>
          </div>
        </motion.section>

        <motion.section 
          id="feedback" 
          className="py-16 bg-gray-50"
          variants={mainVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.2 }} // once: false
        >
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold">Kritik & Saran</h2>
              <p className="text-gray-600 mt-2">
                Sampaikan kritik, saran, atau masukan Anda untuk membantu kami meningkatkan kualitas pelayanan publik di BPKH Wilayah V Banjarbaru.
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-8 items-start">
              <Card>
                <CardHeader>
                  <CardTitle>Formulir Masukan</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Nama Anda</label>
                    <Input type="text" id="name" placeholder="Masukkan nama Anda" />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Pesan Anda</label>
                    <Textarea id="message" placeholder="Tuliskan pesan, kritik, atau saran Anda di sini..." rows={5} />
                  </div>
                  <button className={buttonVariants({ className: 'w-full' })}>
                    Kirim Pesan
                  </button>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Masukan yang Telah Diterima</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[400px] overflow-y-auto space-y-4 pr-4">
                    {feedbackData.map((item, index) => (
                      <div key={index} className="p-4 border rounded-lg bg-gray-50">
                        <p className="font-semibold text-primary">{item.name}</p>
                        <p className="text-gray-700 my-1">{item.message}</p>
                        <p className="text-xs text-gray-400">{item.date}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </motion.section>

      </MainLayout>
    </>
  );
}
