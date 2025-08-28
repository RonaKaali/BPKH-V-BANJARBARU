import Image from 'next/image';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function Home() {
  const announcements = [
    {
      title: 'Inisiatif Reboisasi Baru Diluncurkan',
      description:
        'Bergabunglah dengan kami dalam tujuan baru kami yang ambisius untuk menanam 1 juta pohon pada tahun 2025. Pelajari bagaimana Anda dapat berkontribusi.',
      image: 'https://picsum.photos/1200/600?random=1',
      hint: 'forest canopy',
    },
    {
      title: 'Peraturan Keselamatan Kebakaran Terbaru',
      description:
        'Harap tinjau pedoman keselamatan kebakaran yang diperbarui untuk semua taman nasional, yang berlaku segera.',
      image: 'https://picsum.photos/1200/600?random=2',
      hint: 'wildfire prevention',
    },
    {
      title: 'Keberhasilan Konservasi Satwa Liar',
      description:
        'Sebuah studi baru-baru ini menunjukkan peningkatan 15% populasi spesies burung asli di kawasan lindung.',
      image: 'https://picsum.photos/1200/600?random=3',
      hint: 'wildlife photography',
    },
  ];

  return (
    <div className="flex flex-col">
      <section className="w-full bg-primary/10 py-20 md:py-24">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold tracking-tight text-primary sm:text-5xl md:text-6xl font-headline">
            Pusat Informasi Kehutanan
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-lg text-foreground/80">
            Sumber utama Anda untuk memahami dan menavigasi kebijakan,
            peraturan, dan upaya konservasi kehutanan.
          </p>
          <div className="mt-10 flex justify-center gap-4">
            <Button asChild size="lg">
              <Link href="/regulations">Jelajahi Peraturan</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/faq">Tanya Asisten AI</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="w-full py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-primary font-headline mb-12">
            Pengumuman Terbaru
          </h2>
          <Carousel
            opts={{
              align: 'start',
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent>
              {announcements.map((item, index) => (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                  <div className="p-1 h-full">
                    <Card className="h-full flex flex-col">
                      <div className="relative h-48 w-full">
                        <Image
                          src={item.image}
                          alt={item.title}
                          fill
                          className="object-cover rounded-t-lg"
                          data-ai-hint={item.hint}
                        />
                      </div>
                      <CardHeader>
                        <CardTitle className="font-headline text-xl">
                          {item.title}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-foreground/80">{item.description}</p>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="ml-12" />
            <CarouselNext className="mr-12" />
          </Carousel>
        </div>
      </section>
    </div>
  );
}
