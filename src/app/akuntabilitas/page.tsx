"use client";
import React from 'react';
import { Disclosure } from '@headlessui/react';
import { ChevronUpIcon } from '@heroicons/react/20/solid';

const accountabilityData = [
  {
    id: 'acc-001',
    title: 'Laporan Akuntabilitas Kinerja Instansi Pemerintah (LAKIP)',
    summary: 'Dokumen pertanggungjawaban atas kinerja BPKH V Banjarbaru dalam mencapai tujuan dan sasaran strategis selama satu tahun anggaran.',
    details: 'LAKIP ini menyajikan analisis capaian kinerja, perbandingan antara target dan realisasi, serta evaluasi program kerja yang telah dilaksanakan. Dokumen ini merupakan wujud transparansi dan akuntabilitas kami kepada publik.',
    link: '#' // Placeholder link
  },
  {
    id: 'acc-002',
    title: 'Laporan Keuangan Tahunan',
    summary: 'Ringkasan kondisi keuangan BPKH V Banjarbaru, termasuk alokasi dan realisasi anggaran yang telah diaudit oleh lembaga yang berwenang.',
    details: 'Laporan keuangan ini mencakup neraca, laporan realisasi anggaran, laporan operasional, dan catatan atas laporan keuangan. Semua data disajikan sesuai dengan Standar Akuntansi Pemerintahan (SAP).',
    link: '#' // Placeholder link
  },
  {
    id: 'acc-003',
    title: 'Informasi Pengadaan Barang dan Jasa',
    summary: 'Informasi terkait proses lelang, pengadaan, dan kontrak untuk barang dan jasa yang dibutuhkan oleh BPKH V Banjarbaru.',
    details: 'Kami berkomitmen untuk menjalankan proses pengadaan yang transparan, adil, dan kompetitif. Semua informasi lelang, pengumuman pemenang, dan detail kontrak dapat diakses melalui platform Layanan Pengadaan Secara Elektronik (LPSE) yang terintegrasi.',
    link: '#' // Placeholder link
  },
  {
    id: 'acc-004',
    title: 'Rencana Strategis (Renstra)',
    summary: 'Dokumen perencanaan jangka menengah yang menguraikan visi, misi, tujuan, strategi, dan program kerja BPKH V Banjarbaru untuk periode lima tahun.',
    details: 'Renstra menjadi acuan utama dalam penyusunan program kerja tahunan dan menjadi dasar pengukuran keberhasilan kinerja instansi dalam jangka menengah. Dokumen ini menetapkan arah kebijakan dan prioritas program untuk mencapai visi yang telah ditetapkan.',
    link: '#' // Placeholder link
  }
];

const AkuntabilitasPage = () => {
  return (
    <div className="bg-white min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Akuntabilitas</h1>
        <p className="text-lg text-gray-600 mb-10">
          Sebagai wujud komitmen kami terhadap transparansi dan tata kelola yang baik (Good Governance), kami menyediakan akses kepada publik terhadap berbagai laporan dan dokumen pertanggungjawaban kinerja.
        </p>

        <div className="w-full max-w-4xl mx-auto rounded-2xl bg-white p-2 space-y-4">
          {accountabilityData.map((item) => (
            <Disclosure key={item.id} as="div" className="mt-2">
              {({ open }) => (
                <>
                  <Disclosure.Button className="flex w-full justify-between rounded-lg bg-green-100 px-4 py-4 text-left text-lg font-medium text-green-900 hover:bg-green-200 focus:outline-none focus-visible:ring focus-visible:ring-green-500 focus-visible:ring-opacity-75">
                    <span>{item.title}</span>
                    <ChevronUpIcon
                      className={`${open ? 'rotate-180 transform' : ''} h-5 w-5 text-green-500`}
                    />
                  </Disclosure.Button>
                  <Disclosure.Panel className="px-4 pt-4 pb-2 text-base text-gray-600 border border-t-0 border-gray-200 rounded-b-lg">
                    <p className="font-semibold mb-2">{item.summary}</p>
                    <p className="mb-3">{item.details}</p>
                    <a 
                      href={item.link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-block bg-green-600 text-white font-bold py-2 px-4 rounded hover:bg-green-700 transition-colors duration-200"
                    >
                      Lihat Dokumen
                    </a>
                  </Disclosure.Panel>
                </>
              )}
            </Disclosure>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AkuntabilitasPage;
