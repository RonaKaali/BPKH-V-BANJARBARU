'use client';

import { AdminLayout } from "@/components/layout/admin-layout";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import Link from "next/link";
import { useEffect, useState } from "react";

interface NewsArticle {
  slug: string;
  title: string;
  date: string;
}

export default function AdminBeritaPage() {
  const [news, setNews] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function fetchNews() {
    setLoading(true);
    try {
      const response = await fetch('/api/berita');
      if (!response.ok) {
        throw new Error('Gagal memuat berita');
      }
      const data = await response.json();
      setNews(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(slug: string) {
    if (!confirm('Apakah Anda yakin ingin menghapus berita ini?')) {
      return;
    }

    try {
      const response = await fetch(`/api/berita/${slug}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Gagal menghapus berita');
      }
      
      // Refresh the news list
      fetchNews();

    } catch (err: any) {
      alert(err.message);
    }
  }

  useEffect(() => {
    fetchNews();
  }, []);

  return (
    <AdminLayout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Manajemen Berita</h1>
        <Link href="/admin/berita/tambah" className={buttonVariants()}>
          Tambah Berita
        </Link>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Daftar Berita</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <p>Memuat...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Judul Berita</TableHead>
                  <TableHead className="w-48">Tanggal</TableHead>
                  <TableHead className="w-32 text-center">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {news.map(item => (
                  <TableRow key={item.slug}>
                    <TableCell className="font-medium">{item.title}</TableCell>
                    <TableCell>{new Date(item.date).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })}</TableCell>
                    <TableCell className="text-center space-x-2">
                      <Link href={`/admin/berita/ubah/${item.slug}`} className={buttonVariants({ variant: 'outline', size: 'sm' })}>Ubah</Link>
                      <button onClick={() => handleDelete(item.slug)} className={buttonVariants({ variant: 'destructive', size: 'sm' })}>Hapus</button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </AdminLayout>
  );
}
