'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ShoppingCart, Star } from 'lucide-react';
import type { Product } from '@/data/products';
import { useStore } from './StoreProvider';
import { ImageZoom } from './ImageZoom';

export function ProductCard({ product }: { product: Product }) {
  const { addToCart, t, formatPrice } = useStore();

  return (
    <article className="product-card">
      {product.badge && <span className={`product-badge ${product.badgeTone ?? 'blue'}`}>{product.badge}</span>}

      <div className="catalog-image-wrap">
        <Link className="product-link" href={`/productos/${product.slug}`}>
          <div className="product-image">
            <Image
              className="catalog-product-img"
              src={product.image}
              alt={product.name}
              fill
              sizes="380px"
              quality={100}
              unoptimized
            />
          </div>
        </Link>
        <ImageZoom src={product.image} alt={product.name} buttonClassName="catalog-zoom" />
      </div>

      <Link className="product-link product-copy-link" href={`/productos/${product.slug}`}>
        <span className="laboratory">{product.laboratory}</span>
        <h3>{product.name}</h3>
        <p>{product.detail}</p>
      </Link>
      <div className="stars">
        {Array.from({ length: 5 }).map((_, i) => <Star key={i} size={15} fill="currentColor" />)}
      </div>
      
      <strong className="price">{formatPrice(product.priceUSD)}</strong>
      <button className="cart-btn" onClick={() => addToCart(product)}><ShoppingCart size={17} />{t('add')}</button>
    </article>
  );
}
