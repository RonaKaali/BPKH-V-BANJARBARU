
import SkmTable from "@/components/admin/survei/skm-table";
import { Smile } from "lucide-react";

export default function AdminSkmPage() {
  return (
    <div className="container mx-auto py-12 px-4">
        <div className="flex items-center gap-4 mb-8">
            <div className="p-3 bg-green-600/10 rounded-full">
                <Smile className="h-8 w-8 text-green-600" />
            </div>
            <div>
                <h1 className="text-3xl font-bold text-green-600 tracking-tight">Hasil Survei Kepuasan Masyarakat</h1>
                <p className="text-muted-foreground pt-1">Berikut adalah hasil dari Survei Kepuasan Masyarakat yang telah diisi oleh pengunjung.</p>
            </div>
        </div>
        <SkmTable />
    </div>
  );
}
