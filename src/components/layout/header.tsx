
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

const navLinks = [
    { href: '/', label: 'BERANDA' },
    { href: '/tata-usaha', label: 'TATA USAHA' },
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
            <img src="https://www.kehutanan.go.id/images/logo.png" alt="Logo Kementerian Kehutanan" className="h-16 w-auto object-contain" />
          </Link>
          <div>
            <h1 className="text-xl font-bold text-primary font-headline">
              Balai Pemantapan Kawasan Hutan Wilayah V Banjarbaru
            </h1>
            <p className="text-sm text-muted-foreground">
              Telp: (0511) 4772587 Faks: (0511) 4772101 Email: bpkh5banjarbaru@menlhk.go.id
            </p>
          </div>
        </div>
        <nav className="mt-4 flex flex-1 items-center justify-center space-x-6 text-sm font-medium border-t border-border/40 pt-2">
          {navLinks.map(({ href, label }) => (
            <Link
              key={label}
              href={href}
              className={cn(
                'transition-colors hover:text-primary px-3 py-2 rounded-md',
                pathname === href ? 'text-primary font-bold bg-primary/10' : 'text-foreground/70'
              )}
            >
              {label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
