
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";

const spipElements = [
  "Lingkungan Pengendalian",
  "Penilaian Risiko",
  "Kegiatan Pengendalian",
  "Informasi dan Komunikasi",
  "Pemantauan Pengendalian Intern",
];

export default function SPIPPage() {
  return (
    <div className="container mx-auto py-12 px-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-primary">Sistem Pengendalian Intern Pemerintah (SPIP)</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-6 text-foreground/80 text-justify">
            Sistem Pengendalian Intern Pemerintah (SPIP) adalah proses yang integral pada tindakan dan kegiatan yang dilakukan secara terus menerus oleh pimpinan dan seluruh pegawai untuk memberikan keyakinan memadai atas tercapainya tujuan organisasi melalui kegiatan yang efektif dan efisien, keandalan pelaporan keuangan, pengamanan aset negara, dan ketaatan terhadap peraturan perundang-undangan.
          </p>
          <h3 className="text-xl font-bold text-primary mb-4">Implementasi SPIP di BPKH Wilayah V Banjarbaru</h3>
          <p className="mb-6 text-foreground/80 text-justify">
            BPKH Wilayah V Banjarbaru berkomitmen untuk menerapkan SPIP secara menyeluruh dalam setiap aspek operasionalnya. Kami percaya bahwa dengan SPIP yang kuat, kami dapat meningkatkan akuntabilitas, transparansi, dan efektivitas kinerja organisasi, serta mencegah terjadinya praktik korupsi, kolusi, dan nepotisme.
          </p>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
                <img src="/images/spip-illustration.jpg" alt="Ilustrasi SPIP" className="w-full h-auto rounded-lg shadow-md" />
            </div>
            <div>
                <h4 className="font-bold text-lg text-primary mb-3">Lima Unsur SPIP</h4>
                <ul className="space-y-3">
                {spipElements.map((element, index) => (
                    <li key={index} className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span className="text-foreground/80">{element}</span>
                    </li>
                ))}
                </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
