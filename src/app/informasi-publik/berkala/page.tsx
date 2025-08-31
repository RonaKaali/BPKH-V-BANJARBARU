
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Download } from 'lucide-react';

const publicInfo = [
  {
    title: "Laporan Harta Kekayaan Penyelenggara Negara (LHKPN)",
    description: "Laporan harta kekayaan pejabat negara yang wajib diserahkan kepada Komisi Pemberantasan Korupsi (KPK).",
    period: "Tahunan",
    link: "#", // Replace with actual link
  },
  {
    title: "Laporan Keuangan",
    description: "Informasi mengenai realisasi anggaran, neraca, laporan operasional, dan laporan perubahan ekuitas.",
    period: "Semesteran & Tahunan",
    link: "#", // Replace with actual link
  },
  {
    title: "Rencana Kerja dan Anggaran (RKA)",
    description: "Dokumen perencanaan dan penganggaran yang berisi program dan kegiatan yang akan dilaksanakan dalam satu tahun.",
    period: "Tahunan",
    link: "#", // Replace with actual link
  },
  {
    title: "Laporan Kinerja Instansi Pemerintah (LKjIP)",
    description: "Laporan yang menggambarkan akuntabilitas kinerja instansi pemerintah dalam mencapai tujuan yang telah ditetapkan.",
    period: "Tahunan",
    link: "#", // Replace with actual link
  },
  {
    title: "Informasi Pengadaan Barang dan Jasa",
    description: "Informasi lengkap mengenai proses pengadaan barang dan jasa yang dilakukan oleh BPKH.",
    period: "Setiap Saat",
    link: "#", // Replace with actual link
  },
];

export default function InformasiPublikBerkalaPage() {
  return (
    <div className="container mx-auto py-12 px-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-primary">Informasi Publik Berkala</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-6 text-foreground/80">
            Sesuai dengan amanat Undang-Undang Nomor 14 Tahun 2008 tentang Keterbukaan Informasi Publik, BPKH Wilayah V Banjarbaru berkomitmen untuk menyediakan informasi publik yang akurat, benar, dan tidak menyesatkan. Berikut adalah informasi yang kami sediakan secara berkala.
          </p>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Jenis Informasi</TableHead>
                <TableHead>Deskripsi</TableHead>
                <TableHead>Periode</TableHead>
                <TableHead>Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {publicInfo.map((info, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{info.title}</TableCell>
                  <TableCell>{info.description}</TableCell>
                  <TableCell>{info.period}</TableCell>
                  <TableCell>
                    <a href={info.link} className="flex items-center gap-2 text-primary hover:underline">
                      <Download size={16} />
                      <span>Unduh</span>
                    </a>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
