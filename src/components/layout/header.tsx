'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Sheet, 
  SheetContent, 
  SheetTrigger,
  SheetClose
} from '@/components/ui/sheet';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { ChevronDown, Lock, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Clock } from '@/components/ui/clock';

const navLinks = [
  { href: '/', label: 'BERANDA' },
  {
    label: 'TATA USAHA',
    href: '/tata-usaha',
    subLinks: [
      { href: '/tata-usaha/dokumen-perencanaan', label: 'Dokumen Perencanaan' },
      { href: '/tata-usaha/spip', label: 'SPIP' },
      { href: '/tata-usaha/akuntabilitas', label: 'AKUNTABILITAS' },
      { href: '/tata-usaha/kepegawaian', label: 'Kepegawaian' },
      { href: '/tata-usaha/keuangan', label: 'Keuangan' },
    ],
  },
  {
    label: 'PPKH',
    href: '/ppkh',
    subLinks: [
      {
        href: '/ppkh/pengukuhan-kawasan-hutan',
        label: 'PENGUKUHAN KAWASAN HUTAN',
      },
      {
        href: '/ppkh/penataan-batas-kawasan-hutan',
        label: 'PENATAAN BATAS KAWASAN HUTAN',
      },
      { href: '/ppkh/tora', label: 'TORA' },
    ],
  },
  {
    label: 'SDH',
    href: '/sdh',
    subLinks: [
      { href: '/sdh/enumerasi-tsp-psp', label: 'ENUMERASI TSP/PSP' },
      { href: '/sdh/re-enumerasi-psp', label: 'RE-ENUMERASI PSP' },
      { href: '/sdh/penafsiran-citra', label: 'PENAFSIRAN CITRA' },
      { href: '/sdh/ground-check', label: 'GROUND CHECK' },
    ],
  },
  {
    label: 'PPID',
    href: '/ppid',
    subLinks: [
      { href: '/ppid/video', label: 'VIDEO' },
      { href: '/ppid/perundangan', label: 'Perundangan' },
    ],
  },
  {
    label: 'TENTANG BALAI',
    href: '/tentang-balai',
    subLinks: [
      { href: '/tentang-balai/profil', label: 'Profil' },
      {
        href: '/tentang-balai/struktur-organisasi',
        label: 'Struktur Organisasi',
      },
    ],
  },
  {
    label: 'PELAYANAN',
    href: '/pelayanan',
    subLinks: [
      { href: '/pelayanan', label: 'Pangaduan / Masukan / Saran' },
      {
        href: '/pelayanan/kuesioner-survei-ipk',
        label: 'Kuesioner Survei IPK',
      },
      {
        href: '/pelayanan/survei-kepuasan-masyarakat',
        label: 'Survei Kepuasan Masyarakat',
      },
    ],
  },
  { href: '/file-unduhan', label: 'FILE UNDUHAN' },
];

export function Header() {
  const pathname = usePathname();

  return (
    <header 
      suppressHydrationWarning
      className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container max-w-screen-2xl py-4">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 md:gap-4">
            <Link href="/">
              <img
                src="https://www.kehutanan.go.id/images/logo.png"
                alt="Logo Kementerian Kehutanan"
                className="h-12 w-auto md:h-16 object-contain"
              />
            </Link>
            <div>
              <h1 className="text-base md:text-xl font-bold text-primary font-headline">
                BPKH Wilayah V Banjarbaru
              </h1>
              <p className="hidden md:block text-sm text-muted-foreground">
                Telp: (0511) 4772587 Faks: (0511) 4772101 Email:
                bpkh.wil5@kehutanan.go.id
              </p>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <Clock />
            <Link href="/login" passHref>
              <Button variant="outline">
                  <Lock className="mr-2 h-4 w-4" />
                  Login Admin
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Trigger */}
          <div className="md:hidden flex items-center">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-3/4">
                  <div className="flex flex-col space-y-4 p-4">
                    <Accordion type="single" collapsible className="w-full">
                      {navLinks.map((link) =>
                        link.subLinks ? (
                          <AccordionItem value={link.label} key={link.label}>
                            <AccordionTrigger className="hover:no-underline">
                              {link.label}
                            </AccordionTrigger>
                            <AccordionContent>
                              <div className="flex flex-col space-y-2 pl-4">
                                {link.subLinks.map((subLink) => (
                                  <SheetClose asChild key={subLink.label}>
                                    <Link 
                                      href={subLink.href}
                                      className={cn(
                                        'transition-colors hover:text-primary',
                                        pathname === subLink.href ? 'text-primary font-bold' : 'text-foreground/70'
                                      )} 
                                    >
                                      {subLink.label}
                                    </Link>
                                  </SheetClose>
                                ))}
                              </div>
                            </AccordionContent>
                          </AccordionItem>
                        ) : (
                          <SheetClose asChild key={link.label}>
                            <Link
                              href={link.href}
                              className={cn(
                                'flex items-center py-4 font-medium transition-colors hover:text-primary',
                                pathname === link.href
                                  ? 'text-primary font-bold'
                                  : 'text-foreground/70'
                              )}
                            >
                              {link.label}
                            </Link>
                          </SheetClose>
                        )
                      )}
                     </Accordion>
                     <Link href="/login" passHref>
                      <Button variant="outline" className="w-full">
                          <Lock className="mr-2 h-4 w-4" />
                          Login Admin
                      </Button>
                    </Link>
                  </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex mt-4 flex-1 items-center justify-center space-x-1 text-sm font-medium border-t border-border/40 pt-2">
          {navLinks.map((link) =>
            link.subLinks ? (
              <DropdownMenu key={link.label}>
                <DropdownMenuTrigger asChild>
                  <button
                    className={cn(
                      'flex items-center gap-1 transition-colors hover:text-primary px-3 py-2 rounded-md',
                      pathname.startsWith(link.href)
                        ? 'text-primary font-bold bg-primary/10'
                        : 'text-foreground/70'
                    )}
                  >
                    {link.label}
                    <ChevronDown className="h-4 w-4" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                  {link.subLinks.map((subLink) => (
                    <DropdownMenuItem key={subLink.label} asChild>
                      <Link href={subLink.href}>{subLink.label}</Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link
                key={link.label}
                href={link.href}
                className={cn(
                  'transition-colors hover:text-primary px-3 py-2 rounded-md',
                  pathname === link.href
                    ? 'text-primary font-bold bg-primary/10'
                    : 'text-foreground/70'
                )}
              >
                {link.label}
              </Link>
            )
          )}
        </nav>
      </div>
    </header>
  );
}
