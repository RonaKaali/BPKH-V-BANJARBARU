
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mountain, Bird, Leaf, Droplets } from "lucide-react";

const pengukuhanProcess = [
  {
    icon: <Mountain className="h-8 w-8 text-green-600" />,
    title: "Penunjukan Kawasan Hutan",
    description: "Proses awal penunjukan suatu wilayah sebagai kawasan hutan oleh Menteri.",
  },
  {
    icon: <Leaf className="h-8 w-8 text-green-500" />,
    title: "Penataan Batas Kawasan Hutan",
    description: "Pelaksanaan tata batas di lapangan untuk memberikan kepastian letak batas.",
  },
  {
    icon: <Bird className="h-8 w-8 text-blue-500" />,
    title: "Pemetaan Kawasan Hutan",
    description: "Pemetaan hasil tata batas dan penyajiannya dalam bentuk peta yang sah.",
  },
  {
    icon: <Droplets className="h-8 w-8 text-blue-400" />,
    title: "Penetapan Kawasan Hutan",
    description: "Penetapan kawasan hutan oleh Menteri yang telah memenuhi persyaratan.",
  },
];

const relatedVideos = [
    {
        id: "hs-d2hYo5Cs",
        title: "Pengukuhan Kawasan Hutan"
    },
    {
        id: "XFjWpY28Axg",
        title: "Tata Batas Kawasan Hutan"
    }
]

export default function PengukuhanKawasanHutanPage() {
  return (
    <div className="container mx-auto py-12 px-4">
    <Card>
        <CardHeader>
        <CardTitle className="text-2xl font-bold text-primary">Pengukuhan Kawasan Hutan</CardTitle>
        </CardHeader>
        <CardContent>
            <div className="mb-12">
                <div>
                    <p className="text-foreground/80 text-justify mb-6">
                        Pengukuhan Kawasan Hutan adalah rangkaian kegiatan untuk memberikan kepastian hukum atas status, letak, batas, dan luas suatu kawasan hutan. Ini adalah proses akhir yang sangat penting untuk melegalisasi keberadaan suatu kawasan hutan negara.
                    </p>
                    <p className="text-foreground/80 text-justify">
                        BPKH Wilayah V Banjarbaru berperan penting dalam setiap tahapan pengukuhan ini, mulai dari penunjukan, penataan batas, pemetaan, hingga penetapan. Tujuannya adalah untuk mewujudkan tertib hukum dan administrasi pengelolaan kawasan hutan di wilayah kerjanya.
                    </p>
                </div>
            </div>

        <h3 className="text-xl font-bold text-primary mb-8 text-center">Tahapan Proses Pengukuhan Kawasan Hutan</h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {pengukuhanProcess.map((step, index) => (
            <div key={index} className="p-6 border rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center gap-4 mb-3">
                    {step.icon}
                    <h4 className="font-bold text-lg text-primary">{step.title}</h4>
                </div>
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
