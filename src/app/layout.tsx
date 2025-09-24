import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import AppHeader from '@/components/shared/header';
import AppFooter from '@/components/shared/footer';
import { CartProvider } from '@/hooks/use-cart.tsx';

export const metadata: Metadata = {
  title: 'FoodyMood',
  description: 'Food for every mood.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=PT+Sans:wght@400;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased min-h-screen flex flex-col bg-background" suppressHydrationWarning>
        <CartProvider>
          <AppHeader />
          <main className="flex-1">
            {children}
          </main>
          <AppFooter />
          <Toaster />
        </CartProvider>
      </body>
    </html>
  );
}
