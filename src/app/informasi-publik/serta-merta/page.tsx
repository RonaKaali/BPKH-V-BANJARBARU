
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle, Megaphone, Info } from "lucide-react";

const sertaMertaInfo = [
  {
    icon: <AlertTriangle className="h-8 w-8 text-yellow-500" />,
    title: "Peringatan Dini Bencana Alam",
    description: "Informasi mengenai potensi bencana alam di dalam atau di sekitar kawasan hutan, seperti kebakaran hutan, banjir, atau tanah longsor.",
    status: "Tidak Ada Informasi Saat Ini",
  },
  {
    icon: <Megaphone className="h-8 w-8 text-red-500" />,
    title: "Ancaman Terhadap Keamanan & Ketertiban Umum",
    description: "Informasi mengenai adanya ancaman yang dapat mengganggu keamanan dan ketertiban di dalam kawasan hutan yang berpotensi membahayakan publik.",
    status: "Tidak Ada Informasi Saat Ini",
  },
  {
    icon: <Info className="h-8 w-8 text-blue-500" />,
    title: "Informasi Penting Lainnya",
    description: "Informasi lain yang dinilai mendesak dan wajib diumumkan segera kepada masyarakat sesuai dengan peraturan yang berlaku.",
    status: "Tidak Ada Informasi Saat Ini",
  },
];

export default function InformasiSertaMertaPage() {
  return (
    <div className="container mx-auto py-12 px-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-primary">Informasi Publik Serta Merta</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-8 text-foreground/80 text-center max-w-3xl mx-auto">
            Informasi serta merta adalah jenis informasi publik yang penyebarannya perlu dilakukan secepat mungkin karena dapat mengancam hajat hidup orang banyak dan ketertiban umum. BPKH Wilayah V Banjarbaru akan segera mempublikasikan informasi dalam kategori ini jika terdapat situasi yang mendesak.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sertaMertaInfo.map((info, index) => (
              <Card key={index} className="flex flex-col">
                <CardHeader className="flex-shrink-0">
                    <div className="flex items-center gap-4">
                        {info.icon}
                        <CardTitle className="text-lg">{info.title}</CardTitle>
                    </div>
                </CardHeader>
                <CardContent className="flex-grow flex flex-col justify-between">
                  <p className="text-foreground/80 text-sm mb-4">{info.description}</p>
                  <div className="mt-auto text-center p-3 bg-muted rounded-lg">
                    <p className="font-semibold text-sm text-foreground/70">{info.status}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
