
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col">
      <section className="w-full bg-primary/10 py-20 md:py-24">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold tracking-tight text-primary sm:text-5xl md:text-6xl font-headline">
BALAI PEMANTAPAN KAWASAN HUTAN WILAYAH V
BANJARBARU          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-lg text-foreground/80">
            Sumber utama Anda untuk memahami dan menavigasi kebijakan,
            peraturan, dan upaya konservasi kehutanan.
          </p>
          <div className="mt-10 flex justify-center gap-4">
            <Button asChild size="lg">
              <Link href="/regulations">Jelajahi Peraturan</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/faq">BPKH V </Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="w-full py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-primary font-headline mb-12">
            
          </h2>
        </div>
      </section>
    </div>
  );
}
