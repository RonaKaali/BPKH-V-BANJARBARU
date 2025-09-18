
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const relatedVideos = [
    {
        id: "h4LRRIJ8GYI",
        title: "Enumerasi TSP/PSP"
    }
]

export default function EnumerasiTspPspPage() {
  return (
    <div className="container mx-auto py-12 px-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-primary">Enumerasi TSP/PSP</CardTitle>
        </CardHeader>
        <CardContent>
            <div className="mb-12">
                <div>
                    <p className="text-foreground/80 text-justify mb-6">
                        Enumerasi pohon adalah kegiatan pendataan dan pengukuran pohon dalam suatu areal hutan. TSP (Timber Stand Projection) dan PSP (Permanent Sample Plot) adalah metode yang digunakan untuk memantau pertumbuhan dan perubahan tegakan hutan dari waktu ke waktu. 
                    </p>
                    <p className="text-foreground/80 text-justify">
                        BPKH Wilayah V Banjarbaru melaksanakan enumerasi TSP/PSP untuk mengumpulkan data penting tentang potensi kayu dan kesehatan hutan. Data ini menjadi dasar bagi perencanaan pengelolaan hutan yang lestari dan berkelanjutan.
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
