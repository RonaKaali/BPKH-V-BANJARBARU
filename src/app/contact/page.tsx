import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Mail, MapPin, Phone, TreePine } from 'lucide-react';

const branches = [
  {
    name: 'Northern Regional Office',
    address: '123 Forest Lane, Pinewood City, 10101',
    phone: '(123) 456-7890',
    email: 'north.office@forestry.gov',
  },
  {
    name: 'Southern Wetlands Division',
    address: '456 Marsh Road, Riverbend, 20202',
    phone: '(234) 567-8901',
    email: 'south.office@forestry.gov',
  },
  {
    name: 'Western Mountain Range HQ',
    address: '789 Summit Trail, Boulder Creek, 30303',
    phone: '(345) 678-9012',
    email: 'west.office@forestry.gov',
  },
  {
    name: 'Eastern Coastal Plains Unit',
    address: '101 Ocean View Dr, Sandy Shores, 40404',
    phone: '(456) 789-0123',
    email: 'east.office@forestry.gov',
  },
];

export default function ContactPage() {
  return (
    <div className="container mx-auto max-w-6xl py-16 px-4">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight text-primary font-headline sm:text-5xl">
          Contact Us
        </h1>
        <p className="mt-4 text-lg text-foreground/80">
          Find your local Ministry of Forestry branch. We are here to help.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
        {branches.map((branch) => (
          <Card key={branch.name} className="flex flex-col">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <TreePine className="h-6 w-6 text-primary" />
                <span className="font-headline">{branch.name}</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col space-y-4 text-foreground/90 flex-grow">
                <div className="flex items-start gap-4">
                    <MapPin className="h-5 w-5 mt-1 text-accent flex-shrink-0" />
                    <span>{branch.address}</span>
                </div>
                <div className="flex items-center gap-4">
                    <Phone className="h-5 w-5 text-accent flex-shrink-0" />
                    <span>{branch.phone}</span>
                </div>
                <div className="flex items-center gap-4">
                    <Mail className="h-5 w-5 text-accent flex-shrink-0" />
                    <span>{branch.email}</span>
                </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
