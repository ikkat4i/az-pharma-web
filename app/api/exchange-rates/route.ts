import { NextResponse } from 'next/server';

export const revalidate = 3600;
const COMMERCIAL_MARGIN = 1.03;

export async function GET() {
  try {
    const [pygResponse, brlResponse] = await Promise.all([
      fetch('https://api.frankfurter.dev/v2/rate/USD/PYG?providers=BCP', { next: { revalidate: 3600 } }),
      fetch('https://api.frankfurter.dev/v2/rate/USD/BRL', { next: { revalidate: 3600 } }),
    ]);
    if (!pygResponse.ok || !brlResponse.ok) throw new Error('Exchange service unavailable');
    const [pyg, brl] = await Promise.all([pygResponse.json(), brlResponse.json()]);
    const rawRates = { USD: 1, BRL: Number(brl.rate), PYG: Number(pyg.rate) };
    return NextResponse.json({
      base: 'USD',
      marginPercent: 3,
      rawRates,
      rates: {
        USD: 1,
        BRL: rawRates.BRL * COMMERCIAL_MARGIN,
        PYG: rawRates.PYG * COMMERCIAL_MARGIN,
      },
      date: pyg.date || brl.date,
      source: 'Frankfurter / Banco Central del Paraguay',
    });
  } catch {
    const rawRates = { USD: 1, BRL: 5.2, PYG: 7500 };
    return NextResponse.json({
      base: 'USD',
      marginPercent: 3,
      rawRates,
      rates: { USD: 1, BRL: rawRates.BRL * COMMERCIAL_MARGIN, PYG: rawRates.PYG * COMMERCIAL_MARGIN },
      date: null,
      source: 'Valores de respaldo',
      fallback: true,
    });
  }
}
