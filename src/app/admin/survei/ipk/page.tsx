
import IpkTable from "@/components/admin/survei/ipk-table";
import { FileText } from "lucide-react";

export default function AdminIpkPage() {
  return (
    <div className="container mx-auto py-12 px-4">
        <div className="flex items-center gap-4 mb-8">
            <div className="p-3 bg-blue-600/10 rounded-full">
                <FileText className="h-8 w-8 text-blue-600" />
            </div>
            <div>
                <h1 className="text-3xl font-bold text-blue-600 tracking-tight">Hasil Survei IPK</h1>
                <p className="text-muted-foreground pt-1">Berikut adalah hasil dari Survei Indeks Persepsi Korupsi yang telah diisi oleh pengunjung.</p>
            </div>
        </div>
        <IpkTable />
    </div>
  );
}
