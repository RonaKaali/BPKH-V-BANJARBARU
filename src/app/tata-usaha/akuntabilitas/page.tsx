"use client";
import React from 'react';
import { Disclosure } from '@headlessui/react';
import { ChevronUpIcon } from '@heroicons/react/20/solid';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";

const accountabilityData = [
  {
    id: 'acc-main',
    title: 'Prinsip Akuntabilitas & Transparansi Kinerja',
    summary: 'Akuntabilitas adalah kewajiban kami untuk mempertanggungjawabkan keberhasilan dan kegagalan pelaksanaan misi organisasi dalam mencapai tujuan yang telah ditetapkan.',
    details: 'Di BPKH Wilayah V Banjarbaru, kami memegang teguh prinsip transparansi dan akuntabilitas sebagai landasan utama dalam setiap aspek pengelolaan kawasan hutan. Ini adalah wujud komitmen kami kepada publik dan negara untuk memastikan bahwa setiap sumber daya digunakan secara efektif, efisien, dan bebas dari penyalahgunaan.',
    tasks: [
      'Menyusun Laporan Kinerja (LAKIP) secara periodik sebagai bentuk pertanggungjawaban atas capaian kinerja.',
      'Merancang dan mempublikasikan Rencana Strategis (Renstra) sebagai peta jalan organisasi yang terukur.',
      'Menyelenggarakan proses pengadaan barang dan jasa secara terbuka dan adil melalui platform LPSE.',
      'Menyediakan akses informasi publik yang luas sesuai dengan amanat Undang-Undang Keterbukaan Informasi Publik (KIP).',
      'Membangun Zona Integritas menuju Wilayah Bebas dari Korupsi (WBK) dan Wilayah Birokrasi Bersih dan Melayani (WBBM).'
    ]
  }
];

const AkuntabilitasPage = () => {
  return (
    <div className="container mx-auto py-12 px-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-center text-2xl font-bold text-primary">
            Transparansi & Akuntabilitas
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-12 max-w-3xl mx-auto text-center text-foreground/80">
            Sebagai pilar utama dalam pengelolaan hutan, kami berkomitmen pada transparansi penuh. Di sini, Anda dapat memahami pilar-pilar utama yang menjadi bukti pertanggungjawaban kami kepada publik.
          </p>

          <div className="mx-auto w-full max-w-4xl space-y-4">
            {accountabilityData.map((item) => (
              <Disclosure key={item.id} as="div" defaultOpen={true}>
                {({ open }) => (
                  <div className="rounded-lg border border-border/60 bg-background transition-all duration-300 hover:shadow-lg">
                    <Disclosure.Button className="flex w-full items-center justify-between px-6 py-5 text-left text-lg font-semibold text-primary focus:outline-none">
                      <span>{item.title}</span>
                      <ChevronUpIcon
                        className={`${open ? 'rotate-180' : ''} h-6 w-6 transform transition-transform duration-300`}
                      />
                    </Disclosure.Button>
                    <Disclosure.Panel className="px-6 pb-5 text-base text-foreground/80">
                      <p className="mb-4">{item.details}</p>

                      {item.tasks && (
                        <div className="mb-4">
                          <h4 className="mb-3 text-md font-bold text-primary/90">Pilar Utama Akuntabilitas Kami:</h4>
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

export default AkuntabilitasPage;
