"use client";
import React from 'react';

const downloadFiles = [
  {
    no: 1,
    file: 'AKUNTABILITAS KINERJA',
    keterangan: 'Dokumen Pendukung Akuntabilitas BPKHTL Wilayah V Banjarbaru, meliputi Dokumen Perjanjian Kinerja, Rencana Strategis, Rencana Kerja, Laporan Kinerja dan Tahunan, serta Dokumen pendukung lainnya.',
    link: '#' // Ganti dengan URL file yang sebenarnya
  },
  {
    no: 2,
    file: 'PERATURAN MENTERI LINGKUNGAN HIDUP DAN KEHUTANAN REPUBLIK INDONESIA',
    keterangan: 'PERATURAN MENTERI LINGKUNGAN HIDUP DAN KEHUTANAN NOMOR 18 TAHUN 2022 TENTANG ORGANISASI DAN TATA KERJA BALAI PEMANTAPAN KAWASAN HUTAN DAN TATA LINGKUNGAN.',
    link: '#' // Ganti dengan URL file yang sebenarnya
  },
  {
    no: 3,
    file: 'PERATURAN DIREKTUR JENDERAL PLANOLOGI KEHUTANAN DAN TATA LINGKUNGAN',
    keterangan: 'PERATURAN DIREKTUR JENDERAL PLANOLOGI KEHUTANAN DAN TATA LINGKUNGAN NOMOR : P.3/PKTL/SET.2/OTL.0/1/2021 TENTANG PELAKSANAAN FUNGSI BALAI PEMANTAPAN KAWASAN HUTAN BIDANG TATA LINGKUNGAN.',
    link: '#' // Ganti dengan URL file yang sebenarnya
  }
];

const RegulationsPage = () => {
  return (
    <div className="bg-white min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">File Unduhan</h1>
        <p className="text-lg text-gray-600 mb-10">
          Berikut adalah daftar dokumen, peraturan, dan file lain yang dapat Anda unduh.
        </p>

        <div className="overflow-x-auto shadow-md rounded-lg">
          <table className="min-w-full text-sm text-left text-gray-700">
            <thead className="text-xs text-gray-800 uppercase bg-green-100">
              <tr>
                <th scope="col" className="px-6 py-3 w-16 text-center">NO</th>
                <th scope="col" className="px-6 py-3">FILE</th>
                <th scope="col" className="px-6 py-3">KETERANGAN</th>
                <th scope="col" className="px-6 py-3 w-40 text-center">LINK</th>
              </tr>
            </thead>
            <tbody>
              {downloadFiles.map((item) => (
                <tr key={item.no} className="bg-white border-b hover:bg-gray-50">
                  <td className="px-6 py-4 text-center font-medium text-gray-900">{item.no}</td>
                  <td className="px-6 py-4 font-semibold text-gray-800">{item.file}</td>
                  <td className="px-6 py-4">{item.keterangan}</td>
                  <td className="px-6 py-4 text-center">
                    <a 
                      href={item.link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="font-bold text-green-600 hover:text-green-800 hover:underline"
                    >
                      DOWNLOAD
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default RegulationsPage;
