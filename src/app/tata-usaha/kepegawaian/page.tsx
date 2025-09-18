"use client";
import React from 'react';
import { Disclosure } from '@headlessui/react';
import { ChevronUpIcon } from '@heroicons/react/20/solid';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Download, Send } from "lucide-react";

const kepegawaianData = [
  {
    id: 'kep-001',
    title: 'Manajemen Sumber Daya Manusia (Kepegawaian)',
    summary: 'Bagian Kepegawaian bertanggung jawab untuk mengelola seluruh aspek sumber daya manusia di BPKH Wilayah V Banjarbaru, mulai dari perencanaan hingga purnabakti.',
    details: 'Kepegawaian adalah fungsi vital yang memastikan organisasi didukung oleh sumber daya manusia yang kompeten, profesional, dan sejahtera. Tugas kami adalah menciptakan lingkungan kerja yang kondusif dan produktif.',
    tasks: [
      'Manajemen Administrasi & Data Pegawai: Mengelola data induk pegawai, administrasi cuti, kenaikan pangkat, dan pensiun.',
      'Pengembangan Karir & Kompetensi: Merencanakan dan melaksanakan program pelatihan, pendidikan, dan pengembangan untuk meningkatkan kompetensi pegawai.',
      'Manajemen Kinerja: Melaksanakan penilaian kinerja secara berkala untuk evaluasi dan pengembangan pegawai.',
      'Kesejahteraan & Disiplin: Menjamin kesejahteraan pegawai dan menegakkan aturan disiplin untuk menjaga integritas organisasi.',
      'Perencanaan & Pengadaan Pegawai: Menganalisis kebutuhan dan merencanakan pengadaan pegawai sesuai formasi yang tersedia.'
    ]
  },
  {
    id: 'kep-002',
    title: 'Unduh Formulir Permohonan Cuti',
    summary: 'Unduh templat resmi formulir permohonan cuti dalam format Word.',
    details: 'Silakan unduh dokumen berikut, isi dengan lengkap, dan simpan dalam format PDF sebelum mengunggahnya pada formulir pengumpulan online.',
    link: 'https://docs.google.com/document/d/1hajnBO4N3n9D6-RZHAdswu1VLR9EA8GN/export?format=docx',
    linkLabel: 'Unduh Formulir (Word)',
    icon: 'download'
  },
  {
    id: 'kep-003',
    title: 'Kumpulkan Permohonan Cuti Online',
    summary: 'Unggah formulir permohonan cuti yang telah diisi dan ditandatangani.',
    details: 'Setelah Anda mengisi formulir permohonan cuti dan menyimpannya dalam format PDF, silakan kumpulkan melalui tautan Google Form berikut. Pastikan semua data sudah benar.',
    link: 'https://docs.google.com/forms/d/e/1FAIpQLSebI_tjPvZSCQiz-L8l6oz3MragNAevZez0yiJJxS_K35ywIg/viewform',
    linkLabel: 'Buka Formulir Pengumpulan',
    icon: 'send'
  },
];

const KepegawaianPage = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <Card>
        <CardHeader>
          <CardTitle className="text-primary text-center text-2xl font-bold">Kepegawaian</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-foreground/80 mx-auto mb-12 max-w-3xl text-center">
            Selamat datang di pusat informasi Kepegawaian BPKH Wilayah V Banjarbaru. Temukan informasi lengkap mengenai manajemen SDM dan layanan kepegawaian kami.
          </p>

          <div className="mx-auto w-full max-w-4xl space-y-4">
            {kepegawaianData.map((item) => (
              <Disclosure key={item.id} as="div" defaultOpen={item.id === 'kep-001'}>
                {({ open }) => (
                  <div className="rounded-lg border border-border/60 bg-background transition-all duration-300 hover:shadow-lg">
                    <Disclosure.Button className="flex w-full items-center justify-between px-6 py-5 text-left text-lg font-semibold text-primary focus:outline-none">
                      <span>{item.title}</span>
                      <ChevronUpIcon
                        className={`${open ? 'rotate-180' : ''} h-6 w-6 transform transition-transform duration-300`}
                      />
                    </Disclosure.Button>
                    <Disclosure.Panel className="text-foreground/80 px-6 pb-5 text-base">
                       <p className="mb-4">{item.details}</p>
                      
                      {item.tasks && (
                        <div className="mb-4">
                          <h4 className="text-primary/90 mb-3 text-md font-bold">Tugas Utama Bidang Kepegawaian:</h4>
                          <ul className="space-y-3">
                            {item.tasks.map((task, index) => (
                              <li key={index} className="flex items-start gap-3">
                                <CheckCircle className="mt-1 h-5 w-5 flex-shrink-0 text-green-500" />
                                <span>{task}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {item.link && (
                        <a 
                          href={item.link} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="inline-flex items-center rounded-md bg-primary px-5 py-2 font-bold text-primary-foreground transition-all duration-300 ease-in-out hover:scale-105 hover:bg-primary/90"
                        >
                          {item.icon === 'download' && <Download className="mr-2 h-4 w-4" />}
                          {item.icon === 'send' && <Send className="mr-2 h-4 w-4" />}
                          {item.linkLabel}
                        </a>
                      )}
                    </Disclosure.Panel>
                  </div>
                )}
              </Disclosure>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default KepegawaianPage;
