
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, MapPin, Compass, BookCheck } from "lucide-react";

const groundCheckSteps = [
  {
    icon: <MapPin className="h-10 w-10 text-rose-500" />,
    title: "Verifikasi Titik Sampel",
    description: "Tim lapangan mengunjungi lokasi-lokasi yang telah ditentukan dari hasil penafsiran citra untuk memastikan keakuratan data.",
  },
  {
    icon: <Compass className="h-10 w-10 text-cyan-500" />,
    title: "Pengukuran & Pengambilan Data",
    description: "Melakukan pengukuran parameter hutan secara langsung, seperti diameter pohon, tinggi, serta mengumpulkan data vegetasi dan kondisi tanah.",
  },
  {
    icon: <BookCheck className="h-10 w-10 text-emerald-500" />,
    title: "Koreksi & Validasi Peta",
    description: "Data lapangan digunakan untuk mengoreksi dan memvalidasi peta hasil interpretasi citra, meningkatkan akurasi dan keandalannya.",
  },
  {
    icon: <CheckCircle className="h-10 w-10 text-indigo-500" />,
    title: "Finalisasi Data Inventarisasi",
    description: "Mengintegrasikan data lapangan dengan data citra untuk menghasilkan data inventarisasi hutan yang komprehensif dan terpercaya.",
  },
];

export default function GroundCheckPage() {
  return (
    <div className="container mx-auto py-12 px-4">
      <Card className="overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-primary to-primary/80 p-8">
            <div className="flex items-center gap-6">
                <div className="p-4 bg-background/20 rounded-full">
                    <CheckCircle className="h-12 w-12 text-white" />
                </div>
                <div>
                    <p className="text-sm font-medium text-primary-foreground/80">Verifikasi Lapangan</p>
                    <CardTitle className="text-4xl font-extrabold text-white tracking-wider">Ground Check</CardTitle>
                </div>
            </div>
        </CardHeader>
        <CardContent className="pt-8">
            <div className="mb-12">
                <p className="text-lg text-foreground/80 text-justify leading-relaxed">
                    Ground Check adalah proses dimana kita 'membumikan' data digital. Ini adalah tahap verifikasi di mana tim kami turun langsung ke lapangan untuk memastikan apa yang kita lihat pada citra satelit sesuai dengan kenyataan di lapangan. Kegiatan ini menjadi jembatan antara analisis di balik meja dengan kondisi hutan yang sesungguhnya, memastikan setiap data yang kami hasilkan memiliki tingkat akurasi dan kebenaran yang tertinggi.
                </p>
            </div>

            <div className="space-y-10">
              {groundCheckSteps.map((step, index) => (
                <div key={index} className="flex flex-col sm:flex-row items-center gap-6 p-4 border-l-4 border-primary rounded-r-lg bg-muted/50">
                    <div className="flex-shrink-0">
                        {step.icon}
                    </div>
                    <div className="flex-1 text-center sm:text-left">
                        <h4 className="font-bold text-xl text-primary mb-1">{step.title}</h4>
                        <p className="text-foreground/80">{step.description}</p>
                    </div>
                </div>
              ))}
            </div>
        </CardContent>
      </Card>
    </div>
  );
}
