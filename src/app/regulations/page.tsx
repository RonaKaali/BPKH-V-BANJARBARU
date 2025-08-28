import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { FileText } from 'lucide-react';

const regulations = [
  {
    id: 'reg-001',
    title: 'Undang-Undang Pengelolaan Hutan Nasional Tahun 2023',
    summary:
      'Undang-undang ini menguraikan pedoman utama untuk pengelolaan hutan berkelanjutan, termasuk pemanenan kayu, reboisasi, dan konservasi keanekaragaman hayati di dalam wilayah hutan nasional.',
    details:
      'Ketentuan utamanya mencakup penilaian dampak lingkungan wajib untuk semua operasi penebangan, dana reboisasi nasional yang didukung oleh pajak kayu, dan pembentukan zona lindung baru untuk habitat spesies langka. Undang-undang ini juga menetapkan sanksi bagi yang tidak mematuhi.',
  },
  {
    id: 'reg-002',
    title: 'Kode Pencegahan dan Pengendalian Kebakaran Hutan',
    summary:
      'Serangkaian peraturan yang dirancang untuk meminimalkan risiko kebakaran hutan dan menetapkan protokol untuk penahanan dan pengelolaannya.',
    details:
      'Kode ini mengamanatkan pembuatan sekat bakar di sekitar komunitas yang rentan, membatasi api terbuka selama musim kemarau (1 Mei - 31 Oktober), dan mewajibkan pemilik lahan untuk membersihkan vegetasi kering dari properti mereka. Ini juga merinci struktur komando untuk tanggap darurat.',
  },
  {
    id: 'reg-003',
    title: 'Aturan Pemanenan Hasil Hutan Bukan Kayu',
    summary:
      'Mengatur pengumpulan produk non-kayu secara berkelanjutan seperti tanaman obat, jamur, dan resin oleh masyarakat lokal dan entitas komersial.',
    details:
      'Izin diperlukan untuk pemanenan komersial, dengan kuota ditetapkan setiap tahun berdasarkan survei ekologis. Pemanenan tradisional oleh masyarakat adat untuk penggunaan pribadi dibebaskan dari perizinan tetapi harus mengikuti praktik berkelanjutan. Daftar spesies yang dilarang diperbarui dua kali setahun.',
  },
  {
    id: 'reg-004',
    title: 'Pedoman Akses dan Rekreasi Hutan',
    summary:
      'Aturan untuk akses publik ke hutan untuk kegiatan rekreasi seperti hiking, berkemah, dan pengamatan satwa liar.',
    details:
      'Jalur dan tempat perkemahan yang telah ditentukan harus digunakan. Kendaraan bermotor dibatasi pada jalan yang ditandai. Prinsip "Leave No Trace" ditegakkan, dan semua sampah harus dibawa keluar. Berkemah dibatasi hingga 14 hari berturut-turut di satu lokasi. Area tertentu dapat ditutup sementara untuk melindungi satwa liar selama musim kawin.',
  },
  {
    id: 'reg-005',
    title: 'Undang-Undang Sekuestrasi Karbon dan Kredit',
    summary:
      'Membangun kerangka kerja bagi proyek-proyek kehutanan untuk menghasilkan kredit karbon melalui sekuestrasi karbon yang terverifikasi.',
    details:
      'Undang-undang ini mendefinisikan metodologi untuk mengukur karbon yang tersimpan di hutan, mendirikan registri nasional untuk kredit karbon, dan memberikan insentif keuangan bagi pemilik lahan yang mengubah lahan mereka menjadi tutupan hutan permanen atau mengadopsi praktik pengelolaan hutan yang lebih baik yang meningkatkan stok karbon.',
  },
];

export default function RegulationsPage() {
  return (
    <div className="container mx-auto max-w-4xl py-16 px-4">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight text-primary font-headline sm:text-5xl">
          Peraturan Kehutanan
        </h1>
        <p className="mt-4 text-lg text-foreground/80">
          Tinjauan umum tentang kebijakan utama dan kerangka hukum yang mengatur hutan kita.
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
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
