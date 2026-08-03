'use client';
import Image from 'next/image';
import Link from 'next/link';
import { Check, Sparkles } from 'lucide-react';
import { useStore } from './StoreProvider';
export function Featured(){
  const {t,formatPrice,products}=useStore(); const product=products[0];
  return <section className="featured"><div className="featured-inner">
    <div className="featured-copy"><h2>{t('specialists')} <span>{t('treatments')}</span> {t('weight')}</h2>
      <div className="feature-list"><div><Sparkles/><p><b>{t('qualityProducts')}</b><small>{t('qualityProductsSub')}</small></p></div><div><Sparkles/><p><b>{t('trust')}</b><small>{t('trustSub')}</small></p></div><div><Sparkles/><p><b>{t('transform')}</b><small>{t('transformSub')}</small></p></div></div>
      <div className="featured-actions"><a className="primary-btn" href="#productos">{t('seeProducts')}</a><a className="secondary-btn" href="#beneficios">{t('learnMore')}</a></div>
    </div>
    <article className="featured-card"><div className="featured-card-top"><b>{t('featured')}</b><span><Check size={14}/>{t('available')}</span></div><div className="featured-image"><Image className="featured-product-img" src={product.image} alt={product.name} fill quality={100} sizes="420px" unoptimized /></div><small>{product.laboratory}</small><h3>{product.name}</h3><p>{product.detail}</p><div className="featured-price"><strong>{formatPrice(product.priceUSD)}</strong><Link href={`/productos/${product.slug}`}>{t('details')}</Link></div></article>
  </div></section>
}
