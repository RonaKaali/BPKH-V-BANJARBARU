
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mountain, Bird, Leaf, Users, Droplets, Landmark } from "lucide-react";

const hcvCategories = [
  {
    icon: <Mountain className="h-8 w-8 text-green-600" />,
    title: "HCV 1: Keanekaragaman Spesies",
    description: "Kawasan yang memiliki konsentrasi keanekaragaman hayati signifikan, termasuk spesies endemik, langka, atau terancam.",
  },
  {
    icon: <Leaf className="h-8 w-8 text-green-500" />,
    title: "HCV 2: Ekosistem Skala Bentang Alam",
    description: "Kawasan yang berisi atau merupakan bagian dari ekosistem utuh skala bentang alam, penting bagi proses ekologis alami.",
  },
  {
    icon: <Bird className="h-8 w-8 text-blue-500" />,
    title: "HCV 3: Ekosistem Langka atau Terancam",
    description: "Kawasan yang berisi ekosistem atau habitat yang langka, terancam, atau hampir punah.",
  },
  {
    icon: <Droplets className="h-8 w-8 text-blue-400" />,
    title: "HCV 4: Jasa Lingkungan Penting",
    description: "Kawasan yang menyediakan jasa lingkungan vital dalam situasi kritis, seperti perlindungan daerah tangkapan air atau pengendalian erosi.",
  },
  {
    icon: <Users className="h-8 w-8 text-yellow-600" />,
    title: "HCV 5: Kebutuhan Dasar Masyarakat Lokal",
    description: "Kawasan yang fundamental untuk memenuhi kebutuhan dasar masyarakat lokal (misalnya, untuk subsisten atau kesehatan).",
  },
  {
    icon: <Landmark className="h-8 w-8 text-purple-600" />,
    title: "HCV 6: Nilai Kultural Masyarakat Lokal",
    description: "Kawasan yang penting bagi identitas budaya tradisional masyarakat lokal, memiliki nilai arkeologis atau sejarah yang signifikan.",
  },
];

export default function HCVFPage() {
  return (
    <div className="container mx-auto py-12 px-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-primary">Penilaian Hutan Bernilai Konservasi Tinggi (HCVF)</CardTitle>
        </CardHeader>
        <CardContent>
            <div className="grid md:grid-cols-2 gap-8 items-center mb-12">
                <div>
                    <p className="text-foreground/80 text-justify mb-6">
                        Hutan Bernilai Konservasi Tinggi atau High Conservation Value Forest (HCVF) adalah pendekatan untuk mengidentifikasi dan mengelola nilai-nilai biologis, ekologis, sosial, atau budaya yang dianggap sangat penting dalam suatu kawasan hutan. Tujuannya adalah untuk memastikan bahwa aktivitas pengelolaan hutan tidak berdampak negatif terhadap nilai-nilai penting ini.
                    </p>
                    <p className="text-foreground/80 text-justify">
                        BPKH Wilayah V Banjarbaru memiliki peran strategis dalam mengidentifikasi areal HCVF di dalam kawasan hutan. Penilaian ini menjadi dasar dalam penyusunan rencana pengelolaan hutan yang lebih berkelanjutan dan bertanggung jawab, menyeimbangkan antara kepentingan ekonomi dan pelestarian lingkungan serta sosial.
                    </p>
                </div>
                <div>
                    <img src="/images/hcvf-illustration.jpg" alt="Ilustrasi HCVF" className="w-full h-auto rounded-lg shadow-md" />
                </div>
            </div>

          <h3 className="text-xl font-bold text-primary mb-8 text-center">Enam Kategori Nilai Konservasi Tinggi (HCV)</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {hcvCategories.map((hcv, index) => (
              <div key={index} className="p-6 border rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center gap-4 mb-3">
                    {hcv.icon}
                    <h4 className="font-bold text-lg text-primary">{hcv.title}</h4>
                </div>
                <p className="text-foreground/80 text-sm">{hcv.description}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
