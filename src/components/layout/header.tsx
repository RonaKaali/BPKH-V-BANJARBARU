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
import { ChevronDown } from 'lucide-react';

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
      { href: '/tata-usaha/buku-statistik', label: 'Buku Statistik' },
    ],
  },
  { href: '/ppkh', label: 'PPKH' },
  { href: '/sdhtl', label: 'SDHTL' },
  { href: '/ppid', label: 'PPID' },
  { href: '/tentang-balai', label: 'TENTANG BALAI' },
  { href: '/pelayanan', label: 'PELAYANAN' },
  { href: '/file-unduhan', label: 'FILE UNDUHAN' },
];

export function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container max-w-screen-2xl py-4">
        <div className="flex items-center gap-4">
          <Link href="/">
            <img
              src="https://www.kehutanan.go.id/images/logo.png"
              alt="Logo Kementerian Kehutanan"
              className="h-16 w-auto object-contain"
            />
          </Link>
          <div>
            <h1 className="text-xl font-bold text-primary font-headline">
              Balai Pemantapan Kawasan Hutan Wilayah V Banjarbaru
            </h1>
            <p className="text-sm text-muted-foreground">
              Telp: (0511) 4772587 Faks: (0511) 4772101 Email:
              bpkh5banjarbaru@menlhk.go.id
            </p>
          </div>
        </div>
        <nav className="mt-4 flex flex-1 items-center justify-center space-x-1 text-sm font-medium border-t border-border/40 pt-2">
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
