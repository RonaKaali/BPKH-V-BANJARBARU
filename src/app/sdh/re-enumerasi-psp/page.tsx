
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const relatedVideos = [
    {
        id: "h4LRRIJ8GYI",
        title: "Re-enumerasi PSP"
    }
]

export default function ReEnumerasiPspPage() {
  return (
    <div className="container mx-auto py-12 px-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-primary">Re-enumerasi PSP</CardTitle>
        </CardHeader>
        <CardContent>
            <div className="mb-12">
                <div>
                    <p className="text-foreground/80 text-justify mb-6">
                        Re-enumerasi adalah kegiatan pengukuran ulang pada areal PSP (Permanent Sample Plot) yang telah dibuat sebelumnya. Kegiatan ini bertujuan untuk memantau perubahan-perubahan yang terjadi pada tegakan hutan, seperti pertumbuhan, kematian, dan kerusakan pohon.
                    </p>
                    <p className="text-foreground/80 text-justify">
                        Dengan membandingkan data hasil re-enumerasi dengan data sebelumnya, BPKH Wilayah V Banjarbaru dapat menganalisis dinamika hutan dan membuat proyeksi pertumbuhan tegakan di masa depan. Informasi ini sangat berharga untuk mengevaluasi efektivitas pengelolaan hutan dan merumuskan kebijakan yang lebih baik.
                    </p>
                </div>
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
