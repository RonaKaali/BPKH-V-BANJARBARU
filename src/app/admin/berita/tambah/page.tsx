'use client';

import { AdminLayout } from "@/components/layout/admin-layout";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ImageUpload } from "@/components/ui/image-upload"; // 1. Import komponen ImageUpload
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function TambahBeritaPage() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [imageUrl, setImageUrl] = useState<string | null>(null); // 2. Tambahkan state untuk URL gambar
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  // 3. Buat handler untuk menangani suksesnya upload gambar
  const handleImageUploadSuccess = (url: string) => {
    setImageUrl(url);
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch('/api/berita', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        // 4. Sertakan imageUrl dalam body request
        body: JSON.stringify({ title, content, image: imageUrl }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Gagal menyimpan berita');
      }

      alert('Berita berhasil disimpan!');
      router.push('/admin/berita'); // Redirect to the news list

    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <AdminLayout>
      <h1 className="text-2xl font-bold mb-6">Tambah Berita Baru</h1>
      <Card>
        <CardHeader>
          <CardTitle>Formulir Berita</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">Judul Berita</label>
              <Input 
                id="title" 
                placeholder="Masukkan judul berita..." 
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>
            
            {/* 5. Tambahkan komponen ImageUpload ke dalam form */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Gambar Unggulan</label>
              <ImageUpload onUploadSuccess={handleImageUploadSuccess} />
            </div>

            <div>
              <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-2">Isi Berita</label>
              <Textarea 
                id="content" 
                rows={15} 
                placeholder="Tuliskan isi berita di sini..." 
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
              />
            </div>
            
            {error && <p className="text-red-500 text-sm">{error}</p>}

            <div className="flex justify-end gap-4">
              <Link href="/admin/berita" className={buttonVariants({ variant: 'outline' })}>Batal</Link>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Menyimpan...' : 'Simpan'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </AdminLayout>
  );
}
