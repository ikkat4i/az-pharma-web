import type { Metadata } from 'next';
import './globals.css';
import { StoreProvider } from '@/components/StoreProvider';

export const metadata: Metadata = {
  title: 'AZ+PHARMA',
  description: 'Especialistas en fármacos para tratamientos de peso',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="es"><head>
        <link rel="icon" href="/favicon.ico?v=7" sizes="any" />
        <link rel="icon" type="image/png" href="/icon.png?v=7" />
        <link rel="apple-touch-icon" href="/apple-icon.png?v=7" />
        <link rel="manifest" href="/manifest.webmanifest?v=3" />
      </head>
      <body><StoreProvider>{children}</StoreProvider></body></html>;
}
