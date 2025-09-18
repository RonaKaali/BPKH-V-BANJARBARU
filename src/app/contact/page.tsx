
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Facebook, Instagram, Mail, MapPin, Phone, Printer, Youtube } from "lucide-react";

const contactInfo = [
    {
        icon: Phone,
        label: "Telepon & Faks",
        details: [
            { icon: Phone, text: "(0511) 4772587", url: "tel:05114772587" },
            { icon: Printer, text: "(0511) 4772101", url: "tel:05114772101" },
        ]
    },
    {
        icon: Instagram,
        label: "Instagram",
        details: [
            { icon: Instagram, text: "@bpkhwilayahv", url: "https://www.instagram.com/bpkhwilayahv/" },
        ]
    },
    {
        icon: Youtube,
        label: "YouTube",
        details: [
            { icon: Youtube, text: "@bpkhv.banjarbaru", url: "https://www.youtube.com/@bpkhv.banjarbaru" },
        ]
    },
    {
        icon: Facebook,
        label: "Facebook",
        details: [
            { icon: Facebook, text: "BPKH Wilayah V Banjarbaru", url: "https://www.facebook.com/bpkhwilayahv.banjarbaru.5" },
        ]
    },
    {
        icon: Mail,
        label: "Email",
        details: [
            { icon: Mail, text: "bpkh.wil5@kehutanan.go.id", url: "mailto:bpkh.wil5@kehutanan.go.id" },
        ]
    },
    {
        icon: MapPin,
        label: "Alamat Kantor",
        details: [
            { 
                icon: MapPin, 
                text: "Jl. Ir. P. M. Noor, Kel. Sulingan, Kec. Murung Pudak, Kab. Tabalong, Kalimantan Selatan",
                url: "https://maps.app.goo.gl/qE5mZ4j5y9k8S3C57"
            },
        ]
    },
];

export default function ContactPage() {
    return (
        <div className="container mx-auto py-12 px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {contactInfo.map((info, index) => (
                    <Card key={index} className="bg-primary/5 border-primary/20 hover:shadow-lg transition-shadow">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-3 text-primary">
                                <info.icon className="h-6 w-6" />
                                <span className="font-bold text-xl">{info.label}</span>
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-2 text-muted-foreground">
                                {info.details.map((detail, i) => (
                                    <div key={i} className="flex items-center gap-3">
                                        <detail.icon className="h-4 w-4" />
                                        {detail.url ? (
                                            <a 
                                                href={detail.url} 
                                                target="_blank" 
                                                rel="noopener noreferrer" 
                                                className="hover:text-primary hover:underline transition-colors"
                                            >
                                                {detail.text}
                                            </a>
                                        ) : (
                                            <span>{detail.text}</span>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

             <Card className="mt-8">
                <CardHeader>
                    <CardTitle className="text-2xl font-bold text-primary">Peta Lokasi</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="aspect-[16/9] w-full rounded-lg overflow-hidden border">
                        <iframe 
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3984.935360348956!2d115.4169739759404!3d-2.170949037410884!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2de55776044a29a3%3A0x63c6c3e3e0d8b4b1!2sBalai%20Pemantapan%20Kawasan%20Hutan%20(BPKH)%20Wilayah%20V!5e0!3m2!1sid!2sid!4v1716361545436!5m2!1sid!2sid" 
                            width="100%" 
                            height="100%" 
                            style={{ border: 0 }} 
                            allowFullScreen 
                            loading="lazy" 
                            referrerPolicy="no-referrer-when-downgrade">
                        </iframe>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
