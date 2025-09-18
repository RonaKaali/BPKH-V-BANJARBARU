"use client";
import React from 'react';
import { Disclosure } from '@headlessui/react';
import { ChevronUpIcon } from '@heroicons/react/20/solid';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";

const keuanganData = [
  {
    id: 'keu-001',
    title: 'Manajemen Keuangan Negara',
    summary: 'Bagian Keuangan memegang peran krusial dalam mengelola anggaran dan memastikan akuntabilitas keuangan di BPKH Wilayah V Banjarbaru.',
    details: 'Manajemen Keuangan adalah pilar yang menopang seluruh kegiatan operasional organisasi. Kami berkomitmen untuk mengelola setiap rupiah dari Anggaran Pendapatan dan Belanja Negara (APBN) secara transparan, efisien, dan bertanggung jawab untuk sebesar-besarnya kemakmuran negara.',
    tasks: [
      'Perencanaan & Penganggaran: Menyusun rencana anggaran (RKA-K/L) berdasarkan pagu indikatif dan program kerja yang telah ditetapkan.',
      'Pelaksanaan Anggaran: Melaksanakan proses pencairan anggaran, pembayaran, dan pengelolaan kas sesuai dengan peraturan yang berlaku.',
      'Akuntansi & Pelaporan: Melakukan pencatatan transaksi keuangan, menyusun laporan keuangan semesteran dan tahunan (LAK), serta rekonsiliasi data keuangan.',
      'Pengelolaan Aset Negara (BMN): Melakukan inventarisasi, penilaian, dan pelaporan Barang Milik Negara (BMN) yang berada di bawah pengelolaan BPKH Wilayah V.',
      'Verifikasi & Pertanggungjawaban: Memastikan setiap pengeluaran telah melalui proses verifikasi yang sah dan dapat dipertanggungjawabkan.'
    ]
  },
];

const KeuanganPage = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <Card>
        <CardHeader>
          <CardTitle className="text-primary text-center text-2xl font-bold">Keuangan</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-foreground/80 mx-auto mb-12 max-w-3xl text-center">
            Pusat informasi mengenai pengelolaan keuangan negara di BPKH Wilayah V Banjarbaru. Kami menjaga amanah anggaran untuk kinerja yang optimal.
          </p>

          <div className="mx-auto w-full max-w-4xl space-y-4">
            {keuanganData.map((item) => (
              <Disclosure key={item.id} as="div">
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
                          <h4 className="text-primary/90 mb-3 text-md font-bold">Tugas Utama Bidang Keuangan:</h4>
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

export default KeuanganPage;
