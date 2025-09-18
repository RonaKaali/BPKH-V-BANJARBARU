
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageSquare } from "lucide-react";

export default function PengaduanPage() {
  return (
    <div className="container mx-auto py-12 px-4">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-4">
            <div className="p-3 bg-orange-600/10 rounded-full">
                <MessageSquare className="h-8 w-8 text-orange-600" />
            </div>
            <CardTitle className="text-3xl font-bold text-orange-600 tracking-tight">Pengaduan / Masukan / Saran</CardTitle>
          </div>
          <p className="text-muted-foreground pt-2">Kami sangat menghargai setiap masukan, saran, atau pengaduan dari Anda untuk perbaikan layanan kami.</p>
        </CardHeader>
        <CardContent>
          <div className="aspect-[4/3] w-full">
            <iframe 
              src="https://docs.google.com/forms/d/e/1FAIpQLSde_c7g_8w_1d_3B_q2t_l4d_2y_7f_6c_9a_1b_1d_3B_4e_2f_7g/viewform?embedded=true" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }}>
                Memuat…
            </iframe>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
