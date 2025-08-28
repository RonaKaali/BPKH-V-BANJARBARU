
import Link from 'next/link';
import Image from 'next/image';

export function Footer() {
  return (
    <footer className="border-t border-border/40 bg-background/95">
      <div className="container flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0">
        <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
          <Image src="https://firebasestorage.googleapis.com/v0/b/app-interviews-dev.appspot.com/o/user-uploads%2F1719572635956-kemenhut.png?alt=media" alt="Logo Kementerian Kehutanan" width={32} height={32} />
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            © {new Date().getFullYear()} Kementerian Kehutanan. Semua Hak Dilindungi.
          </p>
        </div>
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <Link href="#" className="hover:text-primary transition-colors">Kebijakan Privasi</Link>
            <Link href="#" className="hover:text-primary transition-colors">Ketentuan Layanan</Link>
        </div>
      </div>
    </footer>
  );
}
