
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Satellite, Layers, Search, Map } from "lucide-react";

const interpretationSteps = [
  {
    icon: <Satellite className="h-10 w-10 text-sky-500" />,
    title: "Akuisisi Citra Satelit",
    description: "Mengunduh citra satelit resolusi tinggi terbaru dari berbagai penyedia untuk mendapatkan gambaran terkini kondisi tutupan lahan.",
  },
  {
    icon: <Layers className="h-10 w-10 text-amber-500" />,
    title: "Klasifikasi Tutupan Lahan",
    description: "Menganalisis dan membedakan berbagai jenis tutupan lahan seperti hutan primer, hutan sekunder, perkebunan, pemukiman, dan badan air.",
  },
  {
    icon: <Search className="h-10 w-10 text-teal-500" />,
    title: "Analisis Perubahan",
    description: "Membandingkan citra dari waktu ke waktu untuk mendeteksi dan mengukur perubahan seperti deforestasi, reforestasi, atau degradasi hutan.",
  },
  {
    icon: <Map className="h-10 w-10 text-lime-600" />,
    title: "Pemetaan Digital & Validasi",
    description: "Menyajikan hasil interpretasi dalam bentuk peta digital yang akurat dan menyiapkan rencana untuk verifikasi lapangan (ground check).",
  },
];

export default function PenafsiranCitraPage() {
  return (
    <div className="container mx-auto py-12 px-4">
      <Card className="bg-gradient-to-br from-background to-muted/40">
        <CardHeader>
          <div className="flex items-center gap-4">
             <div className="p-3 bg-primary/10 rounded-full">
                <Satellite className="h-8 w-8 text-primary" />
             </div>
            <CardTitle className="text-3xl font-bold text-primary tracking-tight">Penafsiran Citra Satelit</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
            <div className="mb-12">
                <p className="text-lg text-foreground/80 text-justify leading-relaxed">
                    Penafsiran citra adalah seni sekaligus ilmu untuk 'membaca' bumi dari angkasa. Menggunakan teknologi penginderaan jauh (remote sensing), kami menganalisis citra satelit untuk memetakan dan memantau sumber daya hutan. Ini adalah langkah pertama yang krusial dalam memahami kondisi hutan kita tanpa harus melangkah ke lapangan, memungkinkan kami mengawasi area yang luas secara efisien dan efektif.
                </p>
            </div>

          <div className="relative">
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-border -translate-x-1/2 hidden md:block"></div>
            <div className="grid md:grid-cols-2 gap-x-12 gap-y-16">
              {interpretationSteps.map((step, index) => (
                <div key={index} className="flex items-start gap-6 relative">
                    <div className="absolute left-1/2 -translate-x-1/2 h-full w-px bg-border -z-10 md:hidden"></div>
                    <div className="absolute top-1/2 -translate-y-1/2 h-px w-full bg-border -z-10 md:hidden"></div>
                    <div className="flex items-center justify-center bg-background border shadow-sm rounded-full p-4 z-10">
                        {step.icon}
                    </div>
                    <div className="flex-1 pt-1">
                        <h4 className="font-bold text-xl text-primary mb-2">{step.title}</h4>
                        <p className="text-foreground/80">{step.description}</p>
                    </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
