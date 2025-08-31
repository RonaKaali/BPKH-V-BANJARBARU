
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

const documents = [
  {
    id: 'doc-001',
    title: 'Rencana Strategis (Renstra) 2020-2024',
    description: 'Dokumen perencanaan jangka menengah yang menjadi pedoman dalam pelaksanaan program dan kegiatan BPKH Wilayah V Banjarbaru.',
    category: 'Perencanaan',
    link: '#', // Replace with actual link
  },
  {
    id: 'doc-002',
    title: 'Rencana Kerja Tahunan (RKT) 2023',
    description: 'Penjabaran dari Renstra yang berisi target dan kegiatan yang akan dilaksanakan dalam satu tahun anggaran.',
    category: 'Perencanaan',
    link: '#', // Replace with actual link
  },
  {
    id: 'doc-003',
    title: 'Perjanjian Kinerja (PK) 2023',
    description: 'Komitmen kinerja antara pimpinan BPKH dengan unit di bawahnya untuk mencapai target yang telah ditetapkan.',
    category: 'Kinerja',
    link: '#', // Replace with actual link
  },
];

export default function DokumenPerencanaanPage() {
  return (
    <div className="container mx-auto py-12 px-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-primary">Dokumen Perencanaan</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-6 text-foreground/80">
            Berikut adalah dokumen-dokumen perencanaan yang menjadi landasan kerja Balai Pemantapan Kawasan Hutan (BPKH) Wilayah V Banjarbaru dalam menjalankan tugas dan fungsinya.
          </p>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Judul Dokumen</TableHead>
                <TableHead>Deskripsi</TableHead>
                <TableHead>Kategori</TableHead>
                <TableHead>Tautan</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {documents.map((doc) => (
                <TableRow key={doc.id}>
                  <TableCell className="font-medium">{doc.title}</TableCell>
                  <TableCell>{doc.description}</TableCell>
                  <TableCell>
                    <Badge>{doc.category}</Badge>
                  </TableCell>
                  <TableCell>
                    <a href={doc.link} className="text-primary hover:underline">Unduh</a>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
