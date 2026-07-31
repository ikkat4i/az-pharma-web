import type { Metadata } from 'next';
import './globals.css';
import { StoreProvider } from '@/components/StoreProvider';

export const metadata: Metadata = {
  title: 'AZ+PHARMA',
  description: 'Especialistas en fármacos para tratamientos de peso',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="es"><body><StoreProvider>{children}</StoreProvider></body></html>;
}
