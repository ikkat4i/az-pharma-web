'use client';

import Link from 'next/link';
import { ChevronRight, Save } from 'lucide-react';
import { useEffect, useState } from 'react';
import type { Product } from '@/data/products';

type Draft = {
  priceUSD: string;
  stock: string;
};

export function AdminInventoryTable({
  products,
  loading,
  updateProduct,
}: {
  products: Product[];
  loading: boolean;
  updateProduct: (
    id: number,
    patch: Partial<Pick<Product, 'priceUSD' | 'stock'>>,
  ) => Promise<{ ok: boolean; message: string }>;
}) {
  const [drafts, setDrafts] = useState<Record<number, Draft>>({});
  const [savingId, setSavingId] = useState<number | null>(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    setDrafts(
      Object.fromEntries(
        products.map((product) => [
          product.id,
          {
            priceUSD: product.priceUSD === null ? '' : String(product.priceUSD),
            stock: String(product.stock),
          },
        ]),
      ),
    );
  }, [products]);

  async function save(product: Product) {
    const draft = drafts[product.id];
    if (!draft) return;

    setSavingId(product.id);
    setMessage('');

    const result = await updateProduct(product.id, {
      priceUSD: draft.priceUSD.trim() === '' ? null : Number(draft.priceUSD),
      stock: Math.max(0, Number(draft.stock) || 0),
    });

    setMessage(result.message);
    setSavingId(null);
  }

  if (loading) {
    return <p className="inventory-help">Cargando productos desde Supabase…</p>;
  }

  return (
    <>
      <p className="inventory-help">
        Editá el precio en dólares o el stock y presioná <b>Guardar</b>. El
        cambio quedará almacenado en Supabase y será visible para todos.
      </p>

      {message && <p className="inventory-saved">{message}</p>}

      <div className="inventory-editor inventory-editor-supabase">
        <div className="inventory-editor-head">
          <span>Producto</span>
          <span>Precio US$</span>
          <span>Stock</span>
          <span>Acciones</span>
        </div>

        {products.map((product) => {
          const draft = drafts[product.id] ?? {
            priceUSD: product.priceUSD === null ? '' : String(product.priceUSD),
            stock: String(product.stock),
          };

          return (
            <article key={product.id}>
              <div className="inventory-product-name">
                <b>{product.name}</b>
                <small>{product.laboratory}</small>
              </div>

              <label>
                <span className="sr-only">Precio de {product.name}</span>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  value={draft.priceUSD}
                  placeholder="Consultar"
                  onChange={(event) =>
                    setDrafts((current) => ({
                      ...current,
                      [product.id]: {
                        ...draft,
                        priceUSD: event.target.value,
                      },
                    }))
                  }
                />
              </label>

              <label>
                <span className="sr-only">Stock de {product.name}</span>
                <input
                  type="number"
                  min="0"
                  step="1"
                  value={draft.stock}
                  onChange={(event) =>
                    setDrafts((current) => ({
                      ...current,
                      [product.id]: {
                        ...draft,
                        stock: event.target.value,
                      },
                    }))
                  }
                />
              </label>

              <div className="inventory-row-actions">
                <button
                  type="button"
                  className="inventory-save-button"
                  disabled={savingId === product.id}
                  onClick={() => save(product)}
                >
                  <Save size={16} />
                  {savingId === product.id ? 'Guardando…' : 'Guardar'}
                </button>

                <Link href={`/productos/${product.slug}`}>
                  Ver <ChevronRight />
                </Link>
              </div>
            </article>
          );
        })}
      </div>
    </>
  );
}
