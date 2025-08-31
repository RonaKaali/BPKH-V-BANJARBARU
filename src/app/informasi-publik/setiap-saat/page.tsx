
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { FileText, Map, Users, Gavel, FileArchive } from "lucide-react";

const availableInfo = [
  {
    icon: <FileText className="h-7 w-7 text-primary" />,
    title: "Dokumen Kelembagaan",
    description: "Struktur organisasi, tugas dan fungsi, serta profil pimpinan BPKH Wilayah V Banjarbaru.",
  },
  {
    icon: <Gavel className="h-7 w-7 text-primary" />,
    title: "Peraturan & Keputusan",
    description: "Seluruh peraturan, keputusan, dan kebijakan yang telah ditetapkan oleh Kepala BPKH Wilayah V Banjarbaru.",
  },
  {
    icon: <Map className="h-7 w-7 text-primary" />,
    title: "Peta Kawasan Hutan",
    description: "Peta penetapan, tata batas, dan peta terkait lainnya dalam wilayah kerja BPKH V Banjarbaru.",
  },
  {
    icon: <Users className="h-7 w-7 text-primary" />,
    title: "Informasi Kepegawaian",
    description: "Informasi umum mengenai rekrutmen, profil kompetensi, dan statistik kepegawaian (non-rahasia).",
  },
  {
    icon: <FileArchive className="h-7 w-7 text-primary" />,
    title: "Arsip & Dokumen Lainnya",
    description: "Surat-surat perjanjian dengan pihak ketiga, surat menyurat pimpinan, dan arsip lain yang bersifat terbuka.",
  },
];

export default function InformasiSetiapSaatPage() {
  return (
    <div className="container mx-auto py-12 px-4">
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-primary">Informasi yang Tersedia Setiap Saat</CardTitle>
          <p className="text-foreground/80 mt-2 max-w-2xl mx-auto">
            Informasi ini adalah data dan dokumen yang kami miliki dan siap kami sediakan untuk Anda. Untuk mendapatkan informasi ini, Anda dapat mengajukan permohonan informasi publik.
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {availableInfo.map((info, index) => (
              <div key={index} className="p-6 border rounded-lg flex gap-5 items-start">
                <div className="flex-shrink-0">{info.icon}</div>
                <div>
                    <h4 className="font-bold text-lg mb-1">{info.title}</h4>
                    <p className="text-foreground/80 text-sm">{info.description}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-10 p-6 bg-muted rounded-lg">
            <h3 className="text-xl font-bold text-primary mb-3">Bagaimana Cara Memperoleh Informasi?</h3>
            <p className="text-foreground/80 mb-5">
                Anda dapat mengajukan permohonan melalui surat tertulis, email, atau datang langsung ke kantor layanan informasi kami. Untuk kemudahan, Anda juga dapat menggunakan sistem e-PPID.
            </p>
            <Button asChild>
                <a href="#" target="_blank" rel="noopener noreferrer">Ajukan Permohonan Informasi</a>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
