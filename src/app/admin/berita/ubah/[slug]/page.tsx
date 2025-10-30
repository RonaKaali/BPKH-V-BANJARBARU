'use client';

import { AdminLayout } from "@/components/layout/admin-layout";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ImageUpload } from "@/components/ui/image-upload";
import Link from "next/link";
import { notFound, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

// Gunakan 'any' untuk props untuk menghindari error build dari Next.js versi baru
export default function UbahBeritaPage({ params }: any) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const { slug } = params;

  useEffect(() => {
    if (!slug) return;

    async function fetchNewsArticle() {
      try {
        const response = await fetch(`/api/berita/${slug}`);
        if (response.status === 404) {
          notFound();
        }
        if (!response.ok) {
          throw new Error('Gagal memuat data berita');
        }
        const data = await response.json();
        setTitle(data.title);
        setContent(data.content);
        setImageUrl(data.image);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }

    fetchNewsArticle();
  }, [slug]);

  const handleImageUploadSuccess = (url: string) => {
    setImageUrl(url);
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch(`/api/berita/${slug}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, content, image: imageUrl }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Gagal menyimpan perubahan');
      }

      alert('Berita berhasil diperbarui!');
      router.push('/admin/berita');

    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  }
  
  if (isLoading) {
    return <AdminLayout><p>Memuat...</p></AdminLayout>;
  }

  if (error && !isSubmitting) {
    return <AdminLayout><p className="text-red-500">{error}</p></AdminLayout>;
  }

  return (
    <AdminLayout>
      <h1 className="text-2xl font-bold mb-6">Ubah Berita</h1>
      <Card>
        <CardHeader>
          <CardTitle>Formulir Ubah Berita</CardTitle>
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

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Gambar Unggulan</label>
              <ImageUpload 
                onUploadSuccess={handleImageUploadSuccess} 
                initialImageUrl={imageUrl} 
              />
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
                {isSubmitting ? 'Menyimpan...' : 'Simpan Perubahan'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </AdminLayout>
  );
}
