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
      title: 'New Reforestation Initiative Launched',
      description:
        'Join us in our ambitious new goal to plant 1 million trees by 2025. Learn how you can contribute.',
      image: 'https://picsum.photos/1200/600?random=1',
      hint: 'forest canopy',
    },
    {
      title: 'Updated Fire Safety Regulations',
      description:
        'Please review the updated fire safety guidelines for all national parks, effective immediately.',
      image: 'https://picsum.photos/1200/600?random=2',
      hint: 'wildfire prevention',
    },
    {
      title: 'Wildlife Conservation Success',
      description:
        'A recent study shows a 15% increase in the population of native bird species in protected areas.',
      image: 'https://picsum.photos/1200/600?random=3',
      hint: 'wildlife photography',
    },
  ];

  return (
    <div className="flex flex-col items-center">
      <section className="w-full bg-primary/10 py-20 md:py-32">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold tracking-tight text-primary sm:text-5xl md:text-6xl font-headline">
            Forestry Information Hub
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-lg text-foreground/80">
            Your central source for understanding and navigating forestry
            policies, regulations, and conservation efforts.
          </p>
          <div className="mt-10 flex justify-center gap-4">
            <Button asChild size="lg">
              <Link href="/regulations">Explore Regulations</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/faq">Ask AI Helper</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="w-full py-16 md:py-24">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-primary font-headline mb-12">
            Latest Announcements
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
