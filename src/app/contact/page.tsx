import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Phone, Printer, Instagram, Facebook, Youtube } from 'lucide-react';

const contactInfo = {
  phone: '(0511) 4772864',
  fax: '(0511) 4772864',
  instagram: '@bpkhwilayahv',
  youtube_handle: '@bpkhv.banjarbaru',
  youtube_url: 'https://www.youtube.com/@bpkhv.banjarbaru',
  facebook: 'BPKH Wilayah V Banjarbaru',
  facebook_url: 'https://web.facebook.com/bpkhwilayahv.banjarbaru.5?_rdc=1&_rdr#',
};

export default function ContactPage() {
  return (
    <div className="container mx-auto max-w-6xl py-16 px-4">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight text-primary font-headline sm:text-5xl">
          Hubungi Kami
        </h1>
        <p className="mt-4 text-lg text-foreground/80">
          Hubungi kami melalui detail kontak di bawah ini.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
        {/* Phone and Fax */}
        <Card className="flex flex-col bg-accent text-accent-foreground">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <Phone className="h-6 w-6 text-primary" />
              <span className="font-headline">Telepon & Faks</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col space-y-4 flex-grow">
            <div className="flex items-center gap-4">
              <Phone className="h-5 w-5 text-primary flex-shrink-0" />
              <span>{contactInfo.phone}</span>
            </div>
            <div className="flex items-center gap-4">
              <Printer className="h-5 w-5 text-primary flex-shrink-0" />
              <span>{contactInfo.fax}</span>
            </div>
          </CardContent>
        </Card>

        {/* Instagram */}
        <Card className="flex flex-col bg-accent text-accent-foreground">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <Instagram className="h-6 w-6 text-primary" />
              <span className="font-headline">Instagram</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col space-y-4 flex-grow">
            <div className="flex items-center gap-4">
              <Instagram className="h-5 w-5 text-primary flex-shrink-0" />
              <a href="https://www.instagram.com/bpkhwilayahv/" target="_blank" rel="noopener noreferrer" className="hover:underline">
                {contactInfo.instagram}
              </a>
            </div>
          </CardContent>
        </Card>

        {/* Youtube */}
        <Card className="flex flex-col bg-accent text-accent-foreground">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <Youtube className="h-6 w-6 text-primary" />
              <span className="font-headline">YouTube</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col space-y-4 flex-grow">
            <div className="flex items-center gap-4">
              <Youtube className="h-5 w-5 text-primary flex-shrink-0" />
              <a href={contactInfo.youtube_url} target="_blank" rel="noopener noreferrer" className="hover:underline">
                {contactInfo.youtube_handle}
              </a>
            </div>
          </CardContent>
        </Card>

        {/* Facebook */}
        <Card className="flex flex-col bg-accent text-accent-foreground">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <Facebook className="h-6 w-6 text-primary" />
              <span className="font-headline">Facebook</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col space-y-4 flex-grow">
            <div className="flex items-center gap-4">
              <Facebook className="h-5 w-5 text-primary flex-shrink-0" />
              <a href={contactInfo.facebook_url} target="_blank" rel="noopener noreferrer" className="hover:underline">
                {contactInfo.facebook}
              </a>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
