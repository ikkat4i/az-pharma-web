import type { Product } from '@/data/products';

export type ProductRow = {
  id: number;
  slug: string;
  laboratory: string;
  name: string;
  detail: string | null;
  presentation: string | null;
  benefit: string | null;
  usage: string | null;
  origin: string | null;
  image_path: string | null;
  badge: string | null;
  badge_tone: 'blue' | 'green' | 'gold' | null;
  price_usd: number | string | null;
  stock: number;
  prescription: boolean;
};

export function mapProductRow(row: ProductRow): Product {
  return {
    id: Number(row.id),
    slug: row.slug,
    laboratory: row.laboratory,
    name: row.name,
    detail: row.detail ?? '',
    presentation: row.presentation ?? '',
    benefit: row.benefit ?? '',
    usage: row.usage ?? '',
    origin: row.origin ?? 'Paraguay',
    image: row.image_path || '/images/products/tg5.png',
    badge: row.badge ?? undefined,
    badgeTone: row.badge_tone ?? undefined,
    priceUSD:
      row.price_usd === null || row.price_usd === ''
        ? null
        : Number(row.price_usd),
    stock: Number(row.stock ?? 0),
    prescription: Boolean(row.prescription),
  };
}
