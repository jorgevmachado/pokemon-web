import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import React from 'react';

import { getServerSession } from '@/app/shared/lib/auth/server';
import { UserProvider } from '@/app/ui/features/auth';
import { getAuthenticatedUserBootstrap } from '@/app/ui/features/auth/user/server';
import { NavigationFrame } from '@/app/ui/features/navigation';
import { AlertProvider } from '@/app/ds';
import { LoadingProvider } from '@/app/ds/loading';

import './globals.css';
import { BreadcrumbProvider } from '@/app/ui/components/breadcrumb';

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
  const { initialUser, tokenExpiresAt } = await getAuthenticatedUserBootstrap(
    session.isAuthenticated,
    session.token,
  );
  const isAuthenticated = session.isAuthenticated && Boolean(initialUser);

  return (
    <html
      lang='en'
      className={`${geistSans.variable} ${geistMono.variable}`}
      suppressHydrationWarning
    >
      <body className='antialiased'>
        <AlertProvider>
          <UserProvider
            key={session.token || 'guest-session'}
            initialUser={initialUser}
            isAuthenticated={isAuthenticated}
            tokenExpiresAt={isAuthenticated ? tokenExpiresAt : null}
          >
            <LoadingProvider>
              <BreadcrumbProvider>
                <NavigationFrame isAuthenticated={isAuthenticated}>{children}</NavigationFrame>
              </BreadcrumbProvider>
            </LoadingProvider>
          </UserProvider>
        </AlertProvider>
      </body>
    </html>
  );
}
