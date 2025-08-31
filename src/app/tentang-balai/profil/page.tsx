
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, Target, MapPin, Briefcase } from "lucide-react";

const misiItems = [
  "Melaksanakan pengukuhan kawasan hutan.",
  "Melaksanakan penatagunaan kawasan hutan.",
  "Melaksanakan penyiapan data dan informasi geospasial tematik kehutanan.",
  "Melaksanakan penilaian penggunaan kawasan hutan.",
  "Melaksanakan pengelolaan sistem informasi dan standardisasi data spasial kehutanan."
];

const tugasFungsiItems = [
    "Penyiapan data, informasi, dan petunjuk teknis pelaksanaan pemantapan kawasan hutan dan pengelolaan data dan informasi sumber daya hutan.",
    "Pelaksanaan pengukuhan kawasan hutan.",
    "Pelaksanaan penatagunaan kawasan hutan dan penilaian penggunaan kawasan hutan.",
    "Pengelolaan data dan informasi geospasial dan non geospasial kehutanan.",
    "Pemantauan dan evaluasi pelaksanaan pemantapan kawasan hutan dan pengelolaan data dan informasi sumber daya hutan.",
    "Pelaksanaan penyusunan rencana, program, anggaran dan pelaporan, urusan administrasi kepegawaian, keuangan, pengelolaan barang milik negara, kerja sama, hubungan masyarakat, serta urusan ketatausahaan dan kerumahtanggaan Balai.",
]

export default function TentangBalaiPage() {
  return (
    <div className="container mx-auto py-12 px-4 space-y-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-primary text-center">Profil Balai Pemantapan Kawasan Hutan (BPKH) Wilayah V</CardTitle>
        </CardHeader>
        <CardContent>
            <div className="grid md:grid-cols-3 gap-8 items-center">
                <div className="md:col-span-1 flex flex-col items-center text-center">
                    <img
                        src="/images/kepala-balai.jpg"
                        alt="Kepala Balai"
                        className="w-48 h-auto rounded-lg object-cover shadow-lg mb-4"
                    />
                    <h4 className="text-xl font-bold text-primary">Suhendro A. Basori, S.Hut., M.Sc.</h4>
                    <p className="text-md text-foreground/80">Kepala BPKH V Banjarbaru</p>
                </div>
                <div className="md:col-span-2 text-justify">
                    <p className="text-foreground/80 mb-4">
                        Balai Pemantapan Kawasan Hutan (BPKH) merupakan Unit Pelaksana Teknis (UPT) di bidang pemantapan kawasan hutan yang berada di bawah dan bertanggung jawab kepada Direktur Jenderal Planologi Kehutanan dan Tata Lingkungan, Kementerian Lingkungan Hidup dan Kehutanan.
                    </p>
                    <p className="text-foreground/80 mb-4">
                        BPKH Wilayah V yang berkedudukan di Banjarbaru memiliki tugas melaksanakan pemantapan kawasan hutan dan pengelolaan data serta informasi sumber daya hutan di wilayah kerjanya, yaitu Provinsi Kalimantan Selatan.
                    </p>
                    <p className="text-foreground/80">
                        Sebagai garda terdepan dalam inventarisasi dan pemantapan status hukum kawasan hutan, kami berkomitmen untuk menyediakan data dan informasi geospasial kehutanan yang akurat, mutakhir, dan dapat dipertanggungjawabkan. Kami bekerja dengan integritas, profesionalisme, dan teknologi terkini untuk memastikan kepastian hukum kawasan hutan, yang menjadi landasan bagi pengelolaan hutan yang lestari dan berkelanjutan untuk kesejahteraan masyarakat.
                    </p>
                </div>
            </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
            <div className="flex items-center gap-4">
                <Target className="h-8 w-8 text-primary" />
                <CardTitle className="text-2xl font-bold text-primary">Visi & Misi</CardTitle>
            </div>
        </CardHeader>
        <CardContent className="space-y-6">
            <div>
                <h3 className="font-bold text-xl mb-2">Visi</h3>
                <p className="text-foreground/80 text-lg italic bg-muted p-4 rounded-lg">
                    "Memastikan pemantapan dan optimasi kawasan hutan untuk mengawal penguatan fondasi transformasi untuk Indonesia Maju."
                </p>
            </div>
            <div>
                <h3 className="font-bold text-xl mb-3">Misi</h3>
                <ul className="space-y-3">
                {misiItems.map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                        <Check className="h-6 w-6 text-green-500 mt-1 flex-shrink-0" />
                        <span className="text-foreground/80">{item}</span>
                    </li>
                ))}
                </ul>
            </div>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-2 gap-8">
        <Card>
            <CardHeader>
                <div className="flex items-center gap-4">
                    <Briefcase className="h-8 w-8 text-primary" />
                    <CardTitle className="text-2xl font-bold text-primary">Tugas & Fungsi</CardTitle>
                </div>
            </CardHeader>
            <CardContent>
                <p className="text-foreground/80 mb-4 font-semibold">
                   Berdasarkan Permen LHK No. 16 Tahun 2021, BPKH mempunyai tugas melaksanakan pemantapan kawasan hutan dan pengelolaan data dan informasi sumber daya hutan.
                </p>
                <ul className="space-y-3">
                    {tugasFungsiItems.map((item, index) => (
                        <li key={index} className="flex items-start gap-3">
                            <Check className="h-5 w-5 text-green-500 mt-1 flex-shrink-0" />
                            <span className="text-foreground/80 text-sm">{item}</span>
                        </li>
                    ))}
                </ul>
            </CardContent>
        </Card>
        <Card>
            <CardHeader>
                <div className="flex items-center gap-4">
                    <MapPin className="h-8 w-8 text-primary" />
                    <CardTitle className="text-2xl font-bold text-primary">Wilayah Kerja</CardTitle>
                </div>
            </CardHeader>
            <CardContent>
                <p className="text-foreground/80 mb-4">
                    BPKH Wilayah V Banjarbaru memiliki wilayah kerja yang mencakup seluruh provinsi di Kalimantan Selatan. Kami bertanggung jawab atas pemantapan kawasan hutan di area yang luas dan beragam ini.
                </p>
            </CardContent>
        </Card>
      </div>
    </div>
  );
}
