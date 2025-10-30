'use client';

import React from 'react';

interface AdminLayoutProps {
  children: React.ReactNode;
}

export function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <div className="p-4 sm:p-6 md:p-8">
      <div className="max-w-7xl mx-auto">
        {children}
      </div>
    </div>
  );
}
