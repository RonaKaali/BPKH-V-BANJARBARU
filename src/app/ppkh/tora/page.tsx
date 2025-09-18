
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Users, Handshake, Award } from "lucide-react";

const toraProcess = [
  {
    icon: <FileText className="h-8 w-8 text-blue-500" />,
    title: "Inventarisasi & Identifikasi",
    description: "Mengumpulkan data dan mengidentifikasi objek dan subjek yang memenuhi syarat untuk program TORA.",
  },
  {
    icon: <Users className="h-8 w-8 text-yellow-500" />,
    title: "Penetapan Objek & Subjek",
    description: "Menetapkan secara resmi tanah dan masyarakat yang akan menjadi bagian dari program TORA.",
  },
  {
    icon: <Handshake className="h-8 w-8 text-green-500" />,
    title: "Penyelesaian Konflik & Sengketa",
    description: "Menyelesaikan masalah hukum atau sengketa yang ada terkait dengan tanah yang diusulkan.",
  },
  {
    icon: <Award className="h-8 w-8 text-red-500" />,
    title: "Pemberian Hak Atas Tanah & Pemberdayaan",
    description: "Memberikan sertifikat hak atas tanah kepada masyarakat dan memberdayakan mereka untuk mengelola tanah secara produktif.",
  },
];

const relatedVideos = [
    {
        id: "Zo5ESYRErUw",
        title: "Percepatan Penyelesaian TORA"
    },
    {
        id: "Pgm7dXeUQtQ",
        title: "Kebijakan Penyelesaian TORA"
    }
]

export default function ToraPage() {
  return (
    <div className="container mx-auto py-12 px-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-primary">Tanah Obyek Reforma Agraria (TORA)</CardTitle>
        </CardHeader>
        <CardContent>
            <div className="mb-12">
                <div>
                    <p className="text-foreground/80 text-justify mb-6">
                        Tanah Obyek Reforma Agraria (TORA) adalah program pemerintah yang bertujuan untuk menata kembali penguasaan, pemilikan, penggunaan, dan pemanfaatan tanah untuk kepentingan masyarakat. Program ini merupakan salah satu prioritas nasional untuk mengurangi ketimpangan penguasaan tanah dan meningkatkan kesejahteraan rakyat.
                    </p>
                    <p className="text-foreground/80 text-justify">
                        BPKH Wilayah V Banjarbaru mendukung program TORA dengan menyediakan data dan peta kawasan hutan yang dapat dialokasikan untuk program ini. Kami bekerja sama dengan berbagai pihak untuk memastikan bahwa alokasi tanah TORA tepat sasaran dan memberikan manfaat yang sebesar-besarnya bagi masyarakat.
                    </p>
                </div>
            </div>

          <h3 className="text-xl font-bold text-primary mt-12 mb-6 text-center">Tahapan Proses TORA</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {toraProcess.map((step, index) => (
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
