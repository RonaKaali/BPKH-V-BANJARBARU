
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Check } from 'lucide-react';

const tataUsahaTasks = [
  "melakukan urusan tata persuratan.",
  "Kepegawaian.",
  "Keuangan.",
  "Perlengkapan dan rumah tangga.",
  "Koordinasi penyusunan perencanaan program dan anggaran, evaluasi, dan pelaporan."
];

const pengukuhanTasks = [
    "Melaksanakan penyiapan bahan penataan batas, rekonstruksi batas dan pemetaan kawasan hutan",
    "Inventarisasi dan verifikasi penguasaan tanah dalam kawasan hutan",
    "Penilaian teknis tata batas penataan batas areal kerja perizinan berusaha pemanfaatan hutan, persetujuan pengelolaan perhutanan sosial, persetujuan penggunaan kawasan hutan, persetujuan pelepasan kawasan hutan, dan penetapan kawasan hutan dengan tujuan tertentu"
];

const sumberDayaTasks = [
    "Melaksanakan penyiapan bahan monitoring, evaluasi dan penilaian penggunaan kawasan hutan inventarisasi hutan skala nasional di wilayah",
    "Pengumpulan, pengolahan dan penyajian data dan informasi sumber daya hutan, sumber daya alam dan lingkungan hidup di bidang planologi kehutanan dan tata lingkungan",
    "Penyebarluasan informasi geospasial lingkungan hidup dan kehutanan; penyiapan dan penyajian data dan informasi perencanaan kehutanan, pengukuhan kawasan hutan, penatagunaan kawasan hutan, wilayah pengelolaan hutan, pemanfaatan hutan dan penggunaan kawasan hutan serta tata lingkungan",
    "Verifikasi data dan informasi ekoregion, jasa lingkungan hidup tinggi, dan daya dukung dan daya tampung lingkungan hidup",
    "Fasilitasi penyiapan penerapan instrumen ekonomi lingkungan hidup, dan daya dukung dan daya tampung lingkungan hidup",
    "Pendampingan dan verifikasi informasi geospasial dalam uji kelayakan lingkungan hidup daerah",
    "Forum bimbingan dan/atau konsultasi teknis dan penyuluhan kepada tim uji kelayakan lingkungan hidup daerah, tim validasi kajian lingkungan hidup strategis daerah, serta tim verifikasi rencana perlindungan dan pengelolaan lingkungan hidup daerah",
    "Diseminasi sistem kajian dampak lingkungan, ekoregion, daya dukung dan daya tampung lingkungan hidup, rencana perlindungan dan pengelolaan lingkungan hidup, dan instrumen ekonomi lingkungan hidup di daerah"
  ];

export default function StrukturOrganisasiPage() {
  return (
    <div className="container mx-auto py-12 px-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-primary text-center">
            Struktur Organisasi BPKH Wilayah V Banjarbaru
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-12 pt-8">
          {/* Daftar Pejabat */}
          <div className="space-y-10">
            {/* Kepala Balai */}
            <div className="flex flex-col items-center text-center">
                <div className="w-full max-w-md">
                    <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden">
                        <CardHeader className="bg-primary/10">
                            <CardTitle className="text-xl text-primary">Kepala Balai</CardTitle>
                        </CardHeader>
                        <CardContent className="pt-6 flex flex-col items-center">
                            <img src="/images/kepala-balai.jpg" alt="Kepala Balai Suhendro A. Basori" className="w-48 h-auto rounded-lg object-cover mb-4 border-2 border-primary/20 shadow-lg transition-transform duration-300 hover:scale-105" />
                            <p className="text-lg font-semibold">Suhendro A. Basori, S.Hut., M.Sc.</p>
                        </CardContent>
                    </Card>
                </div>
            </div>

            {/* Kasubag & Seksi */}
            <div className="flex flex-col items-center text-center space-y-8">
                {/* Kasubag TU */}
                <div className="w-full max-w-sm">
                    <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden">
                        <CardHeader className="bg-muted/50">
                            <CardTitle className="text-lg text-primary">Kepala Sub Bagian Tata Usaha</CardTitle>
                        </CardHeader>
                        <CardContent className="pt-6 flex flex-col items-center">
                            <img src="/images/arief-akbar.png" alt="Kepala Sub Bagian Tata Usaha Arief Akbar" className="w-44 h-auto rounded-lg object-cover mb-4 border-2 border-primary/20 shadow-lg transition-transform duration-300 hover:scale-105" />
                            <p className="text-md font-semibold">Arief Akbar, S.E., M.M.</p>
                        </CardContent>
                    </Card>
                </div>

                {/* Seksi-seksi */}
                <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-8 pt-4 max-w-4xl">
                    <div className="w-full">
                        <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 h-full">
                            <CardHeader className="bg-muted/40">
                                <CardTitle className="text-lg text-primary">Kepala Seksi Pengukuhan dan Perencanaan Kawasan Hutan</CardTitle>
                            </CardHeader>
                            <CardContent className="pt-6 flex flex-col items-center">
                                <img src="/images/jovan-sofyan.png" alt="Kepala Seksi Pengukuhan dan Perencanaan Kawasan Hutan Jovan Sofyan" className="w-44 h-auto rounded-lg object-cover mb-4 border-2 border-primary/20 shadow-lg transition-transform duration-300 hover:scale-105" />
                                <p className="text-md font-semibold">Jovan Sofyan, S.Hut., M.Hut.</p>
                            </CardContent>
                        </Card>
                    </div>
                    <div className="w-full">
                        <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 h-full">
                            <CardHeader className="bg-muted/40">
                                <CardTitle className="text-lg text-primary">Kepala Seksi Sumber Daya Hutan</CardTitle>
                            </CardHeader>
                            <CardContent className="pt-6 flex flex-col items-center">
                                <img src="/images/tariyah-kurniawati.png" alt="Kepala Seksi Sumber Daya Hutan Tariyah Kurniawati" className="w-44 h-auto rounded-lg object-cover mb-4 border-2 border-primary/20 shadow-lg transition-transform duration-300 hover:scale-105" />
                                <p className="text-md font-semibold">Tariyah Kurniawati, S.Hut., M.P.</p>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
          </div>
          
          {/* Tugas Pokok dan Fungsi */}
          <div className="pt-12 space-y-8">
            <h2 className="text-3xl font-bold text-primary text-center mb-8">Tugas Pokok dan Fungsi</h2>
            <Card className="overflow-hidden shadow-lg">
                <div className="grid grid-cols-1 md:grid-cols-3">
                <div className="md:col-span-1 bg-muted flex items-center justify-center p-4">
                    <img src="https://bpkhv.com/wp-content/uploads/2015/03/11.jpg" alt="Subbagian Tata Usaha" className="w-full h-auto object-contain" />
                </div>
                <div className="md:col-span-2">
                    <CardHeader>
                    <CardTitle className="text-xl text-primary">1. Subbagian Tata Usaha</CardTitle>
                    </CardHeader>
                    <CardContent>
                    <p className="font-semibold mb-4">Subbagian Tata Usaha mempunyai tugas :</p>
                    <ul className="space-y-2 text-left">
                      {tataUsahaTasks.map((task, index) => (
                        <li key={index} className="flex items-start">
                          <Check className="h-5 w-5 text-green-500 mr-2 mt-1 flex-shrink-0" />
                          <span>{task}</span>
                        </li>
                      ))}
                    </ul>
                    </CardContent>
                </div>
                </div>
            </Card>

            <Card className="overflow-hidden shadow-lg">
                <div className="grid grid-cols-1 md:grid-cols-3">
                <div className="md:col-span-1 bg-muted flex items-center justify-center p-4">
                    <img src="https://bpkhv.com/wp-content/uploads/2015/03/3.jpg" alt="Seksi Pengukuhan dan Perencanaan Kawasan Hutan" className="w-full h-auto object-contain" />
                </div>
                <div className="md:col-span-2">
                    <CardHeader>
                    <CardTitle className="text-xl text-primary">2. Seksi Pengukuhan dan Perencanaan Kawasan Hutan</CardTitle>
                    </CardHeader>
                    <CardContent>
                    <p className="font-semibold mb-4">Seksi Pengukuhan dan Perencanaan Kawasan Hutan mempunyai tugas :</p>
                    <ul className="space-y-2 text-left">
                      {pengukuhanTasks.map((task, index) => (
                        <li key={index} className="flex items-start">
                          <Check className="h-5 w-5 text-green-500 mr-2 mt-1 flex-shrink-0" />
                          <span>{task}</span>
                        </li>
                      ))}
                    </ul>
                    </CardContent>
                </div>
                </div>
            </Card>

            <Card className="overflow-hidden shadow-lg">
                <div className="grid grid-cols-1 md:grid-cols-3">
                <div className="md:col-span-1 bg-muted flex items-center justify-center p-4">
                    <img src="https://bpkhv.com/wp-content/uploads/2015/03/2.jpg" alt="Seksi Sumberdaya Hutan dan Tata Lingkungan" className="w-full h-auto object-contain" />
                </div>
                <div className="md:col-span-2">
                    <CardHeader>
                    <CardTitle className="text-xl text-primary">3. Seksi Sumberdaya Hutan dan Tata Lingkungan</CardTitle>
                    </CardHeader>
                    <CardContent>
                    <p className="font-semibold mb-4">Seksi Sumberdaya Hutan dan Tata Lingkungan mempunyai tugas :</p>
                    <ul className="space-y-2 text-left">
                      {sumberDayaTasks.map((task, index) => (
                        <li key={index} className="flex items-start">
                          <Check className="h-5 w-5 text-green-500 mr-2 mt-1 flex-shrink-0" />
                          <span>{task}</span>
                        </li>
                      ))}
                    </ul>
                    </CardContent>
                </div>
                </div>
            </Card>
          </div>

        </CardContent>
      </Card>
    </div>
  );
}
