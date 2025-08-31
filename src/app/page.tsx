'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import Link from 'next/link';
import { useState, useEffect } from 'react';

interface Feedback {
  id: string;
  name: string;
  message: string;
  timestamp: string;
}

export default function Home() {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isError, setIsError] = useState(false);
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);

  const fetchFeedbacks = async () => {
    try {
      const response = await fetch('/api/feedback/list');
      if (response.ok) {
        const data = await response.json();
        setFeedbacks(data);
      }
    } catch (error) {
      console.error('Error fetching feedbacks:', error);
    }
  };

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFeedbackMessage('');
    setIsError(false);

    try {
      const response = await fetch('/api/feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, message }),
      });

      const result = await response.json();

      if (response.ok) {
        setFeedbackMessage(result.message);
        setName('');
        setMessage('');
        fetchFeedbacks(); // Refresh the list
      } else {
        setIsError(true);
        setFeedbackMessage(result.message || 'Terjadi kesalahan saat mengirim.');
      }
    } catch (error) {
      setIsError(true);
      setFeedbackMessage('Tidak dapat terhubung ke server.');
    }

    setIsSubmitting(false);
  };

  return (
    <div className="flex flex-col">
      <div
        className="fixed inset-0 z-[-1] bg-cover bg-center"
        style={{
          backgroundImage:
            'url(/images/forest-left.jpg), url(/images/forest-right.jpg)',
          backgroundPosition: 'left center, right center',
          backgroundRepeat: 'no-repeat, no-repeat',
        }}
      />
      <section className="relative w-full py-20 md:py-24">
        <div
          className="absolute inset-0 bg-cover bg-center backdrop-blur-sm"
          style={{
            backgroundImage:
              "url('/images/hero-background.jpg')",
          }}
        />
        <div className="absolute inset-0 bg-black/30" />
        <div className="relative container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl font-headline">
            BPKH WILAYAH V BANJARBARU
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-lg text-white/80">
            Sumber utama Anda untuk memahami dan menavigasi kebijakan,
            peraturan, dan upaya konservasi kehutanan.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Button asChild size="lg">
              <Link href="/regulations">Peraturan Kemenhut</Link>
            </Button>
            <Button asChild size="lg" className="bg-green-600 text-white hover:bg-green-700">
                <Link href="/appointment">Buat Janji Temu</Link>
            </Button>
            <Button asChild size="lg" className="bg-[#F5F5DC] text-primary hover:bg-[#F5F5DC]/90">
              <Link href="/contact">Hubungi Kami</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="w-full py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="mt-12">
            <h2 className="text-3xl font-bold text-primary">Apa itu BPKH?</h2>
            <div className="mt-8 grid md:grid-cols-2 gap-8 items-start">
              <div className="flex flex-col gap-8 text-lg text-foreground/80 text-justify">
                <p>
                  Balai Pemantapan Kawasan Hutan (BPKH) adalah garda terdepan dalam
                  menjaga kelestarian hutan Indonesia. Kami bertugas untuk
                  memantapkan kawasan hutan, memastikan batas-batasnya jelas, dan
                  merencanakan pemanfaatannya secara berkelanjutan. Melalui
                  teknologi mutakhir dan dedikasi tinggi, kami bekerja untuk
                  menciptakan keseimbangan antara kebutuhan manusia dan kelestarian
                  alam, demi masa depan bumi yang lebih hijau.
                </p>
                <div>
                  <h3 className="font-bold text-xl text-primary mb-2">Komitmen Anti-Korupsi</h3>
                  <p>
                    BPKH Wilayah V Banjarbaru berkomitmen penuh untuk menciptakan lingkungan kerja yang bebas dari korupsi, kolusi, dan nepotisme. Kami menjunjung tinggi integritas dan transparansi dalam setiap aspek pelayanan kami kepada masyarakat dan negara.
                  </p>
                </div>
                <div>
                  <h3 className="font-bold text-xl text-primary mb-2">Budaya Kerja CANGKAL</h3>
                  <p>
                  Cerdas, Gigih, Adaptif, Akuntabel, Kolaboratif, dan Loyal. Nilai-nilai ini menjadi landasan kami dalam memberikan pelayanan terbaik dan menjaga kelestarian hutan Indonesia.
                  </p>
                </div>
                <div className="mt-8 flex items-center gap-4 rounded-lg bg-gray-100 p-4 dark:bg-gray-800">
                  <img
                    src="/images/kepala-balai.jpg"
                    alt="Kepala Balai"
                    className="w-32 h-auto rounded-md object-cover"
                  />
                  <div>
                    <h4 className="text-lg font-bold text-primary">Kepala BPKH V Banjarbaru</h4>
                    <p className="text-md text-foreground/80">Suhendro A. Basori, S.Hut., M.Sc.</p>
                  </div>
                </div>
                <div className="mt-8 text-center rounded-lg bg-gray-100 p-6 dark:bg-gray-800">
                    <h3 className="text-2xl font-bold text-primary">
                        Ingin membuat janji temu di kantor kami ?
                    </h3>
                    <Button asChild size="lg" className="mt-4 bg-green-600 text-white hover:bg-green-700">
                        <Link href="/appointment">BUAT JANJI TEMU</Link>
                    </Button>
                </div>
              </div>
              <div className="flex flex-col gap-8">
                <img
                  src="/images/maklumat-pelayanan.jpg"
                  alt="Maklumat Pelayanan BPKH Wilayah V Banjarbaru"
                  className="w-full h-auto rounded-lg shadow-md"
                />
                <div className="grid grid-cols-2 gap-4">
                  <img
                    src="/images/anti-korupsi.png"
                    alt="Anti Korupsi BPKH Wilayah V Banjarbaru"
                    className="w-full h-auto rounded-lg shadow-md"
                  />
                  <img
                    src="/images/budaya-kerja-cangkal.png"
                    alt="Budaya Kerja Cangkal BPKH Wilayah V Banjarbaru"
                    className="w-full h-auto rounded-lg shadow-md"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full py-12 md:py-16 bg-muted">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 items-start">
            <div className="flex flex-col gap-4">
              <img src="/images/logo-bpkh.png" alt="Logo BPKH" className="w-32 h-32" />
              <h3 className="text-2xl font-bold text-primary">Alamat Kantor</h3>
              <p className="text-lg text-foreground/80">
                Jl. Ir. P. M. Noor, Guntung Paikat, Kec. Banjarbaru Sel., Kota Banjar Baru, Kalimantan Sel. 70714
              </p>
              <h3 className="text-2xl font-bold text-primary mt-4">Lokasi Kantor</h3>
              <a href="https://www.google.com/maps?q=-3.4439437,114.8546658" target="_blank" rel="noopener noreferrer" className="text-lg text-primary hover:underline">
                -3.4439437,114.8546658
              </a>
              <Card className="mt-8">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-primary">
                    Kritik & Saran
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Nama</Label>
                      <Input id="name" placeholder="Masukkan nama Anda" value={name} onChange={(e) => setName(e.target.value)} required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="message">Pesan</Label>
                      <Textarea id="message" placeholder="Tuliskan kritik atau saran Anda" className="min-h-[80px]" value={message} onChange={(e) => setMessage(e.target.value)} required />
                    </div>
                    <Button type="submit" className="w-full" disabled={isSubmitting}>
                      {isSubmitting ? 'Mengirim...' : 'Kirim'}
                    </Button>
                    {feedbackMessage && (
                      <p className={`mt-4 text-sm text-center font-medium ${isError ? 'text-red-500' : 'text-green-500'}`}>
                        {feedbackMessage}
                      </p>
                    )}
                  </form>
                </CardContent>
              </Card>
               <div className="mt-8">
                <h3 className="text-2xl font-bold text-primary mb-4">Kritik & Saran yang Telah Masuk</h3>
                <div className="space-y-4">
                  {feedbacks.length > 0 ? (
                    feedbacks.map((fb) => (
                      <Card key={fb.id}>
                        <CardContent className="pt-4">
                          <p className="font-semibold">{fb.name}</p>
                          <p className="text-foreground/80 mt-2">{fb.message}</p>
                          <p className="text-xs text-foreground/60 mt-2">{new Date(fb.timestamp).toLocaleString()}</p>
                        </CardContent>
                      </Card>
                    ))
                  ) : (
                    <p className="text-foreground/80">Belum ada kritik & saran yang masuk.</p>
                  )}
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-8">
              <img
                src="/images/kantor-bpkh.jpg"
                alt="Kantor BPKH Wilayah V Banjarbaru"
                className="w-full h-auto rounded-lg shadow-md"
              />
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
      </section>
    </div>
  );
}
