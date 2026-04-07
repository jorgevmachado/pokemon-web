import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import React from 'react';

import { getServerSession } from '@/app/shared/lib/auth/server';
import { NavigationFrame } from '@/app/ui/features/navigation';
import { AlertProvider } from '@/app/ui/components/alert';
import { LoadingProvider } from '@/app/ui/components/loading';

import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: {
    default: 'Pokemon Trainer Portal',
    template: '%s | Pokemon Trainer Portal',
  },
  description: 'Pokemon-themed authentication and protected dashboard experience.',
  icons: {
    // Browser tab icon is resolved from app/favicon.ico by Next.js App Router.
    apple: '/icon.svg',
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession();

  return (
    <html
      lang='en'
      className={`${geistSans.variable} ${geistMono.variable}`}
      suppressHydrationWarning
    >
      <body className='antialiased'>
        <AlertProvider>
          <LoadingProvider>
            <NavigationFrame isAuthenticated={session.isAuthenticated}>{children}</NavigationFrame>
          </LoadingProvider>
        </AlertProvider>
      </body>
    </html>
  );
}
