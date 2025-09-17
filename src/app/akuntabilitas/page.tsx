// app/tata-usaha/akuntabilitas/page.tsx
"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Akuntabilitas() {
  return (
    <div className="p-6 space-y-8">
      <h1 className="text-3xl font-bold mb-6">Akuntabilitas</h1>

      <Tabs defaultValue="kinerja" className="w-full">
        <TabsList className="grid grid-cols-3 w-full max-w-md">
          <TabsTrigger value="kinerja">Laporan Kinerja</TabsTrigger>
          <TabsTrigger value="keuangan">Keuangan</TabsTrigger>
          <TabsTrigger value="dokumentasi">Dokumentasi</TabsTrigger>
        </TabsList>

        {/* Tab 1 - Laporan Kinerja */}
        <TabsContent value="kinerja">
          <h2 className="text-xl font-semibold mb-2">Laporan Kinerja</h2>
          <ul className="list-disc pl-6 space-y-1">
            <li>Turnamen Futsal Internal - Januari 2025 ✅</li>
            <li>Rapat Besar Anggota - Februari 2025 ✅</li>
            <li>Pelatihan Wasit & Coaching Clinic - Maret 2025 ✅</li>
          </ul>
        </TabsContent>

        {/* Tab 2 - Keuangan */}
        <TabsContent value="keuangan">
          <h2 className="text-xl font-semibold mb-2">Transparansi Keuangan</h2>
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="border p-2">Tanggal</th>
                <th className="border p-2">Keterangan</th>
                <th className="border p-2">Pemasukan</th>
                <th className="border p-2">Pengeluaran</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border p-2">10 Jan 2025</td>
                <td className="border p-2">Iuran anggota</td>
                <td className="border p-2">Rp 500.000</td>
                <td className="border p-2">-</td>
              </tr>
              <tr>
                <td className="border p-2">15 Jan 2025</td>
                <td className="border p-2">Sewa lapangan</td>
                <td className="border p-2">-</td>
                <td className="border p-2">Rp 300.000</td>
              </tr>
            </tbody>
          </table>
          <div className="mt-4">
            <a
              href="/docs/laporan-keuangan-2025.pdf"
              target="_blank"
              className="text-blue-600 underline"
            >
              📄 Unduh Laporan Lengkap (PDF)
            </a>
          </div>
        </TabsContent>

        {/* Tab 3 - Dokumentasi */}
        <TabsContent value="dokumentasi">
          <h2 className="text-xl font-semibold mb-2">Dokumentasi</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <img
              src="/images/futsal1.jpg"
              alt="Futsal 1"
              className="rounded-lg shadow"
            />
            <img
              src="/images/futsal2.jpg"
              alt="Futsal 2"
              className="rounded-lg shadow"
            />
            <img
              src="/images/futsal3.jpg"
              alt="Futsal 3"
              className="rounded-lg shadow"
            />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
