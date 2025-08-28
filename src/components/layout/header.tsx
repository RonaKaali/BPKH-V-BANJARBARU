
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import Image from 'next/image';

const navLinks = [
    { href: '/', label: 'Beranda' },
    { href: '/tata-usaha', label: 'Tata Usaha' },
    { href: '/ppkh', label: 'PPKH' },
    { href: '/sdhtl', label: 'SDHTL' },
    { href: '/ppid', label: 'PPID' },
    { href: '/tentang-balai', label: 'Tentang Balai' },
    { href: '/pelayanan', label: 'PELAYANAN' },
    { href: '/file-unduhan', label: 'FILE UNDUHAN' },
];

export function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-24 max-w-screen-2xl items-center">
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <Image src="https://firebasestorage.googleapis.com/v0/b/app-interviews-dev.appspot.com/o/user-uploads%2F1719572635956-kemenhut.png?alt=media" alt="Logo Kementerian Kehutanan" width={50} height={50} />
          <span className="font-bold font-headline sm:inline-block">
            Pusat Informasi Kehutanan
          </span>
        </Link>
        <nav className="flex-1 flex items-center justify-end space-x-6 text-sm font-medium">
          {navLinks.map(({ href, label }) => (
            <Link
              key={label}
              href={href}
              className={cn(
                'transition-colors hover:text-primary',
                pathname === href ? 'text-primary' : 'text-foreground/60'
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
