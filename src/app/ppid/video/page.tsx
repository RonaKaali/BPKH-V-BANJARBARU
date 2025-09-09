
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const videos = [
  {
    title: "Pisah Sambut Pejabat Administrator & Pengawas Balai Pemantapan Kawasan Hutan Wilayah V",
    embedUrl: "https://www.youtube.com/embed/4PxWKZy2X34",
  },
  {
    title: "Wakil Menteri Kehutanan Republik Indonesia melakukan Kunjungan Kerja ke Persemaian Liang Anggang",
    embedUrl: "https://www.youtube.com/embed/8D19082mRTQ",
  },
  {
    title: "SELAMAT HARI RAYA IDUL FITRI 1 SYAWAL 1446 H",
    embedUrl: "https://www.youtube.com/embed/unX-XYObLxk",
  },
];

export default function VideoPage() {
  return (
    <div className="container mx-auto py-12 px-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-primary">Video</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {videos.map((video, index) => (
            <div key={index} className="rounded-lg overflow-hidden shadow-lg transition-transform duration-300 ease-in-out hover:scale-105">
              <div className="aspect-w-16 aspect-h-9">
                <iframe
                  src={video.embedUrl}
                  title={video.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                ></iframe>
              </div>
              <div className="p-4 bg-background/90">
                <h3 className="font-semibold text-foreground/90">{video.title}</h3>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
