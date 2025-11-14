import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { FileText, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';

const regulations = [
  {
    id: 'reg-001',
    title: 'Undang-Undang Pengelolaan Hutan Nasional Tahun 2023',
    summary:
      'Undang-undang ini menguraikan pedoman utama untuk pengelolaan hutan berkelanjutan, termasuk pemanenan kayu, reboisasi, dan konservasi keanekaragaman hayati di dalam wilayah hutan nasional.',
    details:
      'Ketentuan utamanya mencakup penilaian dampak lingkungan wajib untuk semua operasi penebangan, dana reboisasi nasional yang didukung oleh pajak kayu, dan pembentukan zona lindung baru untuk habitat spesies langka. Undang-undang ini juga menetapkan sanksi bagi yang tidak mematuhi.',
    url: 'https://image.slidesharecdn.com/keppresnomor80tahun2000ttgkomiteantardepartemenbidangkehutanan-140120220755-phpapp02/75/Keppres-nomor-80-tahun-2000-ttg-komite-antar-departemen-bidang-kehutanan-1-2048.jpg', // Placeholder URL
  },
  {
    id: 'reg-002',
    title: 'Peraturan Menteri Lingkungang Hidup Dan Kehutanan Republik Indonesia',
    summary:
      'PERATURAN MENTERI LINGKUNGAN HIDUP DAN KEHUTANAN REPUBLIK INDONESIA NOMOR 18 TAHUN 2022 TENTANG ORGANISASI DAN TATA KERJA BALAI PEMANTAPAN KAWASAN HUTAN DAN TATA LINGKUNGAN',
    details:
      '',
    url: 'https://www.scribd.com/document/629643124/PermenLHK-Nomor-18-Tahun-2022', // Placeholder URL
  },
  {
    id: 'reg-003',
    title: 'Peraturan Direktur Jenderal Planologi Kehutanan Dan Tata Lingkungan',
    summary:
      'PERATURAN DIREKTUR JENDERAL PLANOLOGI KEHUTANAN DAN TATA LINGKUNGAN NOMOR : P.3/ PKTL/ SET.2 / 0TL.O/ 1/2021 TENTANG PELAKSANAAN FUNGSI BALAI PEMANTAPAN KAWASAN HUTAN BIDANG TATA LINGKUNGAN',
    details:
      '',
    url: 'https://www.scribd.com/document/628151381/PERATURAN-DIREKTUR-JENDERAL-PLANOLOGI-KEHUTANAN-DAN-TATA-LINGKUNGAN', // Placeholder URL
  },
];

export default function FileUnduhanPage() {
  return (
    <div className="container mx-auto max-w-4xl py-16 px-4">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight text-primary font-headline sm:text-5xl">
          UUD Kemenhut
        </h1>
        <p className="mt-4 text-lg text-foreground/80">
          Berikut adalah daftar dokumen, peraturan, dan file lain yang dapat Anda unduh.
        </p>
      </div>

      <Accordion type="single" collapsible className="w-full">
        {regulations.map((reg) => (
          <AccordionItem value={reg.id} key={reg.id}>
            <AccordionTrigger className="text-left hover:no-underline">
              <div className="flex items-center gap-4">
                <FileText className="h-5 w-5 text-accent flex-shrink-0" />
                <span className="font-headline text-lg">{reg.title}</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="space-y-4 pl-9">
              <p className="font-semibold text-foreground/90">{reg.summary}</p>
              <p className="text-foreground/70">{reg.details}</p>
              <a href={reg.url} target="_blank" rel="noopener noreferrer">
                <Button variant="outline" className="mt-4">
                  <Eye className="mr-2 h-4 w-4" />
                  Lihat File
                </Button>
              </a>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
