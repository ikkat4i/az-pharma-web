'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useStore } from './StoreProvider';

type Slide = {
  badge: string;
  title: string;
  subtitle: string;
  image: string;
  artwork?: boolean;
};

const slides: Record<'es' | 'pt' | 'en', Slide[]> = {
  es: [
    {
      badge: 'CATÁLOGO 2026',
      title: 'Tirzepatida Original',
      subtitle: 'Presentaciones seleccionadas de laboratorios nacionales.',
      image: '/images/banner-medicamentos-pro.jpg',
    },
    {
      badge: 'CALIDAD Y TRAZABILIDAD',
      title: 'Confianza en cada producto',
      subtitle:
        'Procedencia verificada, conservación responsable y atención profesional.',
      image: '/images/banner-calidad-pro.jpg',
    },
    {
      badge: 'COMPRA DIRECTA',
      title: 'Tu farmacia online de confianza',
      subtitle:
        'Elegí tus productos, revisá el carrito y enviá el pedido por WhatsApp.',
      image: '/images/banner-whatsapp-productos-reales.png',
      artwork: true,
    },
  ],
  pt: [
    {
      badge: 'CATÁLOGO 2026',
      title: 'Tirzepatida Original',
      subtitle: 'Apresentações selecionadas de laboratórios nacionais.',
      image: '/images/banner-medicamentos-pro.jpg',
    },
    {
      badge: 'QUALIDADE E RASTREABILIDADE',
      title: 'Confiança em cada produto',
      subtitle:
        'Procedência verificada, conservação responsável e atendimento profissional.',
      image: '/images/banner-calidad-pro.jpg',
    },
    {
      badge: 'COMPRA DIRETA',
      title: 'Sua farmácia online de confiança',
      subtitle:
        'Escolha seus produtos, revise o carrinho e envie o pedido pelo WhatsApp.',
      image: '/images/banner-whatsapp-productos-reales.png',
      artwork: true,
    },
  ],
  en: [
    {
      badge: '2026 CATALOG',
      title: 'Original Tirzepatide',
      subtitle: 'Selected presentations from national laboratories.',
      image: '/images/banner-medicamentos-pro.jpg',
    },
    {
      badge: 'QUALITY AND TRACEABILITY',
      title: 'Confidence in every product',
      subtitle:
        'Verified origin, responsible storage and professional service.',
      image: '/images/banner-calidad-pro.jpg',
    },
    {
      badge: 'DIRECT PURCHASE',
      title: 'Your trusted online pharmacy',
      subtitle:
        'Choose your products, review your cart and send the order by WhatsApp.',
      image: '/images/banner-whatsapp-productos-reales.png',
      artwork: true,
    },
  ],
};

export function Hero() {
  const { lang } = useStore();
  const [active, setActive] = useState(0);
  const current = slides[lang];

  useEffect(() => {
    const id = window.setInterval(
      () => setActive((value) => (value + 1) % current.length),
      6000,
    );

    return () => window.clearInterval(id);
  }, [current.length]);

  const move = (direction: number) =>
    setActive(
      (value) => (value + direction + current.length) % current.length,
    );

  const slide = current[active];

  return (
    <section
      id="inicio"
      className={`hero${slide.artwork ? ' hero-artwork' : ''}`}
      style={{ backgroundImage: `url(${slide.image})` }}
    >
      {!slide.artwork && <div className="hero-overlay" />}

      <button
        className="hero-arrow left"
        onClick={() => move(-1)}
        aria-label="Anterior"
        type="button"
      >
        <ChevronLeft />
      </button>

      {!slide.artwork && (
        <div key={`${lang}-${active}`} className="hero-content">
          <span className="hero-badge">{slide.badge}</span>
          <h1>{slide.title}</h1>
          <p>{slide.subtitle}</p>
        </div>
      )}

      <button
        className="hero-arrow right"
        onClick={() => move(1)}
        aria-label="Siguiente"
        type="button"
      >
        <ChevronRight />
      </button>

      <div className="dots">
        {current.map((_, index) => (
          <button
            key={index}
            type="button"
            aria-label={`Slide ${index + 1}`}
            className={index === active ? 'dot active' : 'dot'}
            onClick={() => setActive(index)}
          />
        ))}
      </div>
    </section>
  );
}
