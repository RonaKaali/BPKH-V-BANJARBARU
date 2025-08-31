
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, TrendingUp, AlertTriangle, ListChecks } from "lucide-react";

const riskManagementSteps = [
  {
    icon: <AlertTriangle className="h-8 w-8 text-red-500" />,
    title: "Identifikasi Risiko",
    description: "Mengidentifikasi potensi risiko yang dapat menghambat pencapaian tujuan organisasi, baik dari faktor internal maupun eksternal.",
  },
  {
    icon: <TrendingUp className="h-8 w-8 text-yellow-500" />,
    title: "Analisis dan Evaluasi Risiko",
    description: "Menganalisis kemungkinan dan dampak dari setiap risiko yang telah diidentifikasi untuk menentukan tingkat prioritasnya.",
  },
  {
    icon: <Shield className="h-8 w-8 text-green-500" />,
    title: "Pengendalian Risiko",
    description: "Menyusun dan menerapkan strategi untuk mengendalikan atau memitigasi risiko, seperti penghindaran, pengurangan, pengalihan, atau penerimaan risiko.",
  },
  {
    icon: <ListChecks className="h-8 w-8 text-blue-500" />,
    title: "Pemantauan dan Reviu",
    description: "Melakukan pemantauan secara berkala terhadap efektivitas strategi pengendalian risiko dan melakukan penyesuaian jika diperlukan.",
  },
];

export default function ManajemenRisikoPage() {
  return (
    <div className="container mx-auto py-12 px-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-primary">Manajemen Risiko</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-6 text-foreground/80 text-justify">
            Manajemen Risiko adalah pendekatan sistematis untuk mengidentifikasi, menganalisis, mengevaluasi, mengendalikan, dan memantau risiko yang dapat mempengaruhi pencapaian tujuan organisasi. Di BPKH Wilayah V Banjarbaru, kami menerapkan manajemen risiko secara proaktif untuk memastikan kelancaran program kerja dan meminimalkan potensi kerugian.
          </p>
          <h3 className="text-xl font-bold text-primary mb-6">Proses Manajemen Risiko Kami</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {riskManagementSteps.map((step, index) => (
              <div key={index} className="flex flex-col items-center text-center p-4 border rounded-lg">
                <div className="mb-4">{step.icon}</div>
                <h4 className="font-bold text-lg mb-2">{step.title}</h4>
                <p className="text-foreground/80 text-sm">{step.description}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
