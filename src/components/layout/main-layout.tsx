'use client';

import { usePathname } from 'next/navigation';
import { Header } from './header';
import { Footer } from './footer';

export function MainLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isLoginPage = pathname === '/login';

  return (
    <div className="relative flex min-h-dvh flex-col bg-background">
      {!isLoginPage && <Header />}
      <main className="flex-1">{children}</main>
      {!isLoginPage && <Footer />}
    </div>
  );
}
