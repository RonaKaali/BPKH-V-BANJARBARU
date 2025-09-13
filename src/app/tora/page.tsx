import React from 'react';

// Ini adalah komponen React sederhana untuk halaman TORA
const ToraPage = () => {
  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">
        Manajemen TORA di BPKH
      </h1>

      <div className="space-y-8">
        {/* Bagian Treasury */}
        <section>
          <h2 className="text-2xl font-semibold mb-3 text-gray-700">1. Treasury (Perbendaharaan)</h2>
          <p className="text-gray-600 leading-relaxed">
            Fungsi Treasury di BPKH bertanggung jawab atas pengelolaan likuiditas dan aset keuangan haji. Ini mencakup penempatan dana pada instrumen investasi yang aman dan menguntungkan, serta memastikan ketersediaan dana untuk operasional penyelenggaraan ibadah haji. Tujuan utamanya adalah untuk mengoptimalkan nilai manfaat dari dana kelolaan sesuai dengan prinsip syariah dan peraturan yang berlaku.
          </p>
        </section>

        {/* Bagian Operations */}
        <section>
          <h2 className="text-2xl font-semibold mb-3 text-gray-700">2. Operations (Operasional)</h2>
          <p className="text-gray-600 leading-relaxed">
            Divisi Operasional memastikan semua kegiatan BPKH berjalan dengan lancar, efisien, dan sesuai standar. Ini termasuk proses administrasi, pencatatan transaksi, penyelesaian (settlement) investasi, dan rekonsiliasi data. Efisiensi operasional sangat penting untuk menekan biaya dan meningkatkan akurasi dalam setiap transaksi yang dilakukan.
          </p>
        </section>

        {/* Bagian Risk Management */}
        <section>
          <h2 className="text-2xl font-semibold mb-3 text-gray-700">3. Risk Management (Manajemen Risiko)</h2>
          <p className="text-gray-600 leading-relaxed">
            Manajemen Risiko adalah pilar penting dalam pengelolaan dana haji. Fungsi ini bertugas untuk mengidentifikasi, mengukur, memantau, dan memitigasi berbagai jenis risiko yang mungkin timbul, seperti risiko pasar, risiko kredit, risiko operasional, dan risiko likuiditas. Dengan kerangka kerja manajemen risiko yang kuat, BPKH dapat melindungi nilai pokok dana haji dan memastikan keberlanjutan keuangannya dalam jangka panjang.
          </p>
        </section>
      </div>
    </div>
  );
};

export default ToraPage;
