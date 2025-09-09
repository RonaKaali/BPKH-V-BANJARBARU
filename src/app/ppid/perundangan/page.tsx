
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText } from "lucide-react";

const laws = [
  {
    title: "UNDANG-UNDANG REPUBLIK INDONESIA NOMOR 23 TAHUN 2014 TENTANG PEMERINTAHAN DAERAH",
    link: "https://drive.google.com/file/d/0B0dsg0YCwDVbQURnX1pEZ3l5TDg/view?resourcekey=0-4GY2_drLj6expAKOq4qg5Q",
  },
  {
    title: "KEPUTUSAN MENTERI LINGKUNGAN HIDUP DAN KEHUTANAN REPUBLIK INDONESIA NOMOR: SK.889/Menhut-II/2014 TENTANG LOGO KEMENTERIAN LINGKUNGAN HIDUP DAN KEHUTANAN REPUBLIK INDONESIA",
    link: "https://drive.google.com/file/d/0B0dsg0YCwDVbckhUSjA0MWJhWG8/view?resourcekey=0-lS4_kD7yiO0IVYK8F7gX6Q",
  },
  {
    title: "SK.435/Menhut-II/2009",
    link: "https://drive.google.com/file/d/0B0dsg0YCwDVbZmdOZkhGa2JwdVU/view?resourcekey=0-rDQBZjLaDLElDsg4k0l_3A",
  },
  {
    title: "SK.529/Menhut-II/2012",
    link: "https://drive.google.com/file/d/0B0dsg0YCwDVbSmpKNm5ma3ZJQTA/view?resourcekey=0-sR3jfmKa9YEoK-9PvrA6zA",
  },
];

export default function PerundanganPage() {
  return (
    <div className="container mx-auto py-12 px-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-primary">Perundangan</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-4">
            {laws.map((law, index) => (
              <li key={index} className="flex items-start gap-4">
                <FileText className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                {law.link ? (
                  <a href={law.link} target="_blank" rel="noopener noreferrer" className="text-foreground/80 hover:text-primary hover:underline">
                    {law.title}
                  </a>
                ) : (
                  <span className="text-foreground/80">{law.title}</span>
                )}
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
