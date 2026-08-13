'use client';

import { useEffect, useState } from 'react';
import { useStore } from './StoreProvider';

const slides = {
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
      title: 'Tu pedido por WhatsApp',
      subtitle:
        'Elegí tus productos, revisá el carrito y enviá el pedido en segundos.',
      image: '/images/banner-computadora-manos.png',
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
      title: 'Seu pedido pelo WhatsApp',
      subtitle:
        'Escolha os produtos, revise o carrinho e envie o pedido em segundos.',
      image: '/images/banner-computadora-manos.png',
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
      title: 'Order through WhatsApp',
      subtitle:
        'Choose your products, review the cart and send the order in seconds.',
      image: '/images/banner-computadora-manos.png',
    },
  ],
};

export function Hero() {
  const { lang } = useStore();
  const [active, setActive] = useState(0);

  const current = slides[lang];
  const slide = current[active];

  useEffect(() => {
    const id = window.setInterval(() => {
      setActive((value) => (value + 1) % current.length);
    }, 6000);

    return () => window.clearInterval(id);
  }, [current.length]);

  return (
    <section
      id="inicio"
      className="hero"
      style={{
        backgroundImage: `url(${slide.image})`,
      }}
    >
      <div className="hero-overlay" />

      <div
        key={`${lang}-${active}`}
        className="hero-content"
      >
        <span className="hero-badge">
          {slide.badge}
        </span>

        <h1>
          {slide.title}
        </h1>

        <p>
          {slide.subtitle}
        </p>
      </div>

      <div className="dots">
        {current.map((_, index) => (
          <button
            key={index}
            type="button"
            aria-label={`Slide ${index + 1}`}
            className={
              index === active
                ? 'dot active'
                : 'dot'
            }
            onClick={() => setActive(index)}
          />
        ))}
      </div>
    </section>
  );
}