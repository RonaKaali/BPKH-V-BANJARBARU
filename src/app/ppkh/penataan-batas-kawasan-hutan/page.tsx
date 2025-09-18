
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Compass, Map, Ruler } from "lucide-react";

const tataBatasProcess = [
  {
    icon: <Map className="h-8 w-8 text-blue-500" />,
    title: "Studi Dokumen & Pembuatan Peta Kerja",
    description: "Menganalisis data historis dan hukum, kemudian menyusun peta kerja sebagai dasar pelaksanaan di lapangan.",
  },
  {
    icon: <Compass className="h-8 w-8 text-yellow-500" />,
    title: "Orientasi & Pengukuran Lapangan",
    description: "Tim turun ke lapangan untuk melakukan orientasi, identifikasi, dan pengukuran titik-titik batas kawasan hutan.",
  },
  {
    icon: <Ruler className="h-8 w-8 text-green-500" />,
    title: "Pemasangan Tanda Batas (Pal Batas)",
    description: "Memasang patok atau tugu sebagai tanda fisik yang permanen dan sah di titik-titik batas yang telah ditentukan.",
  },
  {
    icon: <BarChart className="h-8 w-8 text-red-500" />,
    title: "Pelaporan & Legalisasi",
    description: "Menyusun berita acara dan laporan hasil pekerjaan untuk kemudian disahkan menjadi batas kawasan hutan yang legal.",
  },
];

const relatedVideos = [
    {
        id: "XFjWpY28Axg",
        title: "Tata Batas Kawasan Hutan"
    },
    {
        id: "hs-d2hYo5Cs",
        title: "Pengukuhan Kawasan Hutan"
    }
]

export default function PenataanBatasKawasanHutanPage() {
  return (
    <div className="container mx-auto py-12 px-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-primary">Penataan Batas Kawasan Hutan</CardTitle>
        </CardHeader>
        <CardContent>
            <div className="mb-12">
                <div>
                    <p className="text-foreground/80 text-justify mb-6">
                        Penataan Batas adalah kegiatan krusial dalam pemantapan kawasan hutan yang bertujuan untuk menciptakan kepastian hukum mengenai letak batas suatu kawasan hutan. Proses ini meliputi studi dokumen, orientasi lapangan, pengukuran, hingga pemasangan tanda batas fisik (pal batas) yang definitif dan diakui secara legal.
                    </p>
                    <p className="text-foreground/80 text-justify">
                        Dengan adanya batas yang jelas, potensi konflik tenurial dapat diminimalkan, dan pengelolaan serta pengawasan hutan menjadi lebih efektif. BPKH Wilayah V Banjarbaru bertanggung jawab untuk melaksanakan kegiatan penataan batas ini di wilayah kerjanya, memastikan setiap jengkal kawasan hutan negara memiliki kepastian hukum.
                    </p>
                </div>
            </div>

          <h3 className="text-xl font-bold text-primary mt-12 mb-6 text-center">Tahapan Proses Penataan Batas</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {tataBatasProcess.map((step, index) => (
              <div key={index} className="flex flex-col items-center text-center p-4 border rounded-lg shadow-sm">
                <div className="mb-4 p-3 bg-muted rounded-full">{step.icon}</div>
                <h4 className="font-bold text-lg mb-2">{step.title}</h4>
                <p className="text-foreground/80 text-sm">{step.description}</p>
              </div>
            ))}
          </div>

          <h3 className="text-xl font-bold text-primary mt-12 mb-8 text-center">Video Terkait</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {relatedVideos.map(video => (
                    <div key={video.id}>
                        <div className="aspect-video">
                            <iframe 
                                className="w-full h-full rounded-lg shadow-md" 
                                src={`https://www.youtube.com/embed/${video.id}`} 
                                title={video.title} 
                                frameBorder="0" 
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                                allowFullScreen>
                            </iframe>
                        </div>
                        <p className="text-center font-semibold mt-2">{video.title}</p>
                    </div>
                ))}
            </div>
        </CardContent>
      </Card>
    </div>
  );
}
