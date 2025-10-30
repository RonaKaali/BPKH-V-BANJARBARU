'use client';

import { usePathname } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import { mainVariants } from '../animations/variants';

export function MainLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="relative flex min-h-dvh flex-col bg-background">
      <AnimatePresence>
        <motion.main
          key={pathname}
          variants={mainVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="flex-1"
        >
          {children}
        </motion.main>
      </AnimatePresence>
    </div>
  );
}
