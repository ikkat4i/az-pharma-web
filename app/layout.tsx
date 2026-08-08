import type { Metadata } from 'next';
import './globals.css';
import { StoreProvider } from '@/components/StoreProvider';

export const metadata: Metadata = {
  title: 'AZ+PHARMA',
  description: 'Especialistas en fármacos para tratamientos de peso',

  icons: {
    icon: [
      {
        url: '/images/azplus-favicon-v20260808.png',
        type: 'image/png',
        sizes: '512x512',
      },
    ],
    shortcut: '/images/azplus-favicon-v20260808.png',
    apple: '/images/azplus-favicon-v20260808.png',
  },

  manifest: '/manifest.webmanifest',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body>
        <StoreProvider>{children}</StoreProvider>
      </body>
    </html>
  );
}