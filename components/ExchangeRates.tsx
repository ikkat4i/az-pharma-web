'use client';

import { RefreshCw, TrendingUp } from 'lucide-react';
import { useState } from 'react';
import { useStore } from './StoreProvider';

export function ExchangeRates() {
  const { rates, ratesDate, ratesFallback } = useStore();
  const [refreshing, setRefreshing] = useState(false);

  const refresh = async () => {
    setRefreshing(true);
    try {
      await fetch(`/api/exchange-rates?t=${Date.now()}`, { cache: 'no-store' });
      window.location.reload();
    } finally {
      setRefreshing(false);
    }
  };

  return (
    <section className="exchange-section" aria-labelledby="exchange-title">
      <div className="section-shell exchange-shell">
        <div className="exchange-heading">
          <div>
            <span className="exchange-kicker"><TrendingUp size={16}/> Cotizaciones</span>
            <h2 id="exchange-title">Conversión referencial de monedas</h2>
            <p>Los productos tienen precio base en dólares. Las conversiones incluyen un margen comercial del 3 %.</p>
          </div>
          <button onClick={refresh} disabled={refreshing} className="refresh-rates">
            <RefreshCw size={17} className={refreshing ? 'spin' : ''}/>
            {refreshing ? 'Actualizando…' : 'Actualizar ahora'}
          </button>
        </div>

        <div className="exchange-grid">
          <article>
            <small>Moneda base</small>
            <strong>US$ 1,00</strong>
            <span>Dólar estadounidense</span>
          </article>
          <article>
            <small>Real brasileño + 3 %</small>
            <strong>{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(rates.BRL)}</strong>
            <span>Por cada US$ 1</span>
          </article>
          <article>
            <small>Guaraní paraguayo + 3 %</small>
            <strong>{new Intl.NumberFormat('es-PY', { style: 'currency', currency: 'PYG', maximumFractionDigits: 0 }).format(rates.PYG)}</strong>
            <span>Por cada US$ 1</span>
          </article>
        </div>

        <div className="exchange-note">
          <span>{ratesDate ? `Última referencia disponible: ${ratesDate}` : 'Fecha de referencia no disponible'}</span>
          <span>{ratesFallback ? 'Se están usando valores de respaldo.' : 'Fuente automática: Frankfurter / BCP.'}</span>
          <span>El precio final confirmado por WhatsApp puede variar.</span>
        </div>
      </div>
    </section>
  );
}
