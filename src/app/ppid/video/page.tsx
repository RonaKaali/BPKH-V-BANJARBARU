
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Youtube } from "lucide-react";

const videoList = [
  {
    id: "1Go67mX46eg",
    title: "Profil BPKH Wilayah V Banjarbaru",
    description: "Video profil Balai Pemantapan Kawasan Hutan dan Tata Lingkungan Wilayah V Banjarbaru."
  },
  {
    id: "jT6-oODda60",
    title: "Penataan Batas Kawasan Hutan",
    description: "Video penjelasan mengenai proses dan pentingnya kegiatan penataan batas kawasan hutan."
  },
  {
    id: "HyhLbJKY12E",
    title: "BPKH V Banjarbaru Menuju WBK",
    description: "Video deklarasi pembangunan Zona Integritas menuju Wilayah Bebas dari Korupsi (WBK)."
  },
  {
    id: "XFjWpY28Axg",
    title: "Zona Integritas BPKH Wilayah V Banjarbaru",
    description: "Komitmen BPKH V Banjarbaru dalam pembangunan Zona Integritas."
  }
];

export default function VideoPage() {
  return (
    <div className="container mx-auto py-12 px-4">
      <Card>
          <CardHeader>
            <div className="flex items-center gap-4">
              <div className="p-3 bg-red-600/10 rounded-full">
                  <Youtube className="h-8 w-8 text-red-600" />
              </div>
              <CardTitle className="text-3xl font-bold text-red-600 tracking-tight">Galeri Video</CardTitle>
            </div>
            <p className="text-muted-foreground pt-2">Kumpulan video dokumentasi dan informasi seputar kegiatan BPKH V Banjarbaru.</p>
          </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {videoList.map(video => (
              <div key={video.id} className="rounded-lg overflow-hidden shadow-lg border">
                <div className="aspect-video bg-black">
                  <iframe 
                    className="w-full h-full"
                    src={`https://www.youtube.com/embed/${video.id}`}
                    title={video.title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
                <div className="p-4 bg-background">
                  <h3 className="font-bold text-lg text-primary mb-1">{video.title}</h3>
                  <p className="text-muted-foreground text-sm">{video.description}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
