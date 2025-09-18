
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText } from "lucide-react";
import { FormIpk } from "@/components/survei/form-ipk";

export default function KuesionerPage() {
  return (
    <div className="container mx-auto py-12 px-4">
        <div className="flex items-center gap-4 mb-8">
            <div className="p-3 bg-blue-600/10 rounded-full">
                <FileText className="h-8 w-8 text-blue-600" />
            </div>
            <div>
                <h1 className="text-3xl font-bold text-blue-600 tracking-tight">Kuesioner Survei IPK</h1>
                <p className="text-muted-foreground pt-1">Bantu kami meningkatkan layanan dengan mengisi kuesioner Indeks Persepsi Korupsi (IPK) di bawah ini.</p>
            </div>
        </div>
        <FormIpk />
    </div>
  );
}
