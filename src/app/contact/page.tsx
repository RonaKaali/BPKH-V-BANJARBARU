'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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
];

export default function ContactPage() {
    return (
        <div className="container mx-auto py-12 px-4">
            <div className="mb-12">
                <h2 className="text-3xl font-bold text-primary text-center mb-8">Hubungi Kami</h2>
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
            </div>

            <div className="max-w-4xl mx-auto">
                 <Card className="mb-8">
                    <CardHeader>
                         <CardTitle className="flex items-center gap-3 text-primary">
                            <MapPin className="h-6 w-6" />
                            <span className="font-bold text-xl">Alamat & Peta Lokasi</span>
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                         <p className="text-lg text-foreground/80 mb-4">
                            Jl. Ir. P. M. Noor, Guntung Paikat, Kec. Banjarbaru Sel., Kota Banjar Baru, Kalimantan Sel. 70714
                        </p>
                        <div className="aspect-[16/9] w-full rounded-lg overflow-hidden border">
                            <iframe
                                src="https://maps.google.com/maps?q=-3.4439437,114.8546658&hl=id&z=14&amp;output=embed"
                                className="w-full h-full"
                                style={{ border: 0 }}
                                allowFullScreen={true}
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                            ></iframe>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
