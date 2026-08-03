'use client';
import { Filter } from 'lucide-react';
import { useMemo, useState } from 'react';
import { ProductCard } from './ProductCard';
import { useStore } from './StoreProvider';
export function Catalog(){const [sort,setSort]=useState('relevance');const {t,products}=useStore();const sorted=useMemo(()=>sort==='name'?[...products].sort((a,b)=>a.name.localeCompare(b.name)):products,[sort,products]);return <section id="productos" className="catalog section-shell"><div className="catalog-head"><div><h2>{t('catalog')}</h2><p>{products.length} {t('results')}</p></div><label className="sort"><Filter size={17}/><select value={sort} onChange={e=>setSort(e.target.value)}><option value="relevance">{t('relevance')}</option><option value="name">{t('nameSort')}</option></select></label></div><div className="product-grid">{sorted.map(product=><ProductCard key={product.id} product={product}/>)}</div></section>}
