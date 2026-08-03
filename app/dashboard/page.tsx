'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Bell,
  Box,
  ClipboardList,
  Cog,
  DollarSign,
  LayoutGrid,
  Package,
  RefreshCw,
  Trash2,
  Users,
} from 'lucide-react';

import { Navbar } from '@/components/Navbar';
import { useStore, type Order } from '@/components/StoreProvider';
import { AdminLogoutButton } from '@/components/AdminLogoutButton';
import { AdminInventoryTable } from '@/components/AdminInventoryTable';

type Tab =
  | 'resumen'
  | 'pedidos'
  | 'clientes'
  | 'inventario'
  | 'cotizaciones'
  | 'config';

const fmt = (date: string) =>
  new Intl.DateTimeFormat('es-PY', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(new Date(date));

export default function Dashboard() {
  const [tab, setTab] = useState<Tab>('resumen');
  const [query, setQuery] = useState('');

  const {
    orders,
    customers,
    updateOrderStatus,
    deleteOrder,
    formatPrice,
    rates,
    ratesDate,
    ratesFallback,
    products,
    productsLoading,
    updateProduct,
  } = useStore();

  const filteredOrders = orders.filter((order) =>
    (
      order.id +
      order.customer +
      order.items.map((item) => item.name).join(' ')
    )
      .toLowerCase()
      .includes(query.toLowerCase()),
  );

  const stock = products.reduce((sum, product) => sum + product.stock, 0);

  const nav = [
    ['resumen', 'Resumen', LayoutGrid],
    ['pedidos', 'Pedidos', ClipboardList],
    ['clientes', 'Clientes', Users],
    ['inventario', 'Inventario', Box],
    ['cotizaciones', 'Cotizaciones', DollarSign],
    ['config', 'Configuración', Cog],
  ] as const;

  return (
    <>
      <Navbar />

      <main className="admin-layout">
        <aside className="admin-side">
          <div className="admin-title">
            <b>AD</b>
            <div>
              <strong>Admin Panel</strong>
              <small>AZ+PHARMA</small>
            </div>
          </div>

          <nav>
            {nav.map(([id, label, Icon]) => (
              <button
                key={id}
                type="button"
                className={tab === id ? 'active' : ''}
                onClick={() => setTab(id)}
              >
                <Icon />
                {label}
              </button>
            ))}
          </nav>

          <AdminLogoutButton />
        </aside>

        <section className="admin-main">
          <header className="admin-head">
            <div>
              <h1>
                {tab === 'resumen'
                  ? 'Bienvenido, Administrador'
                  : nav.find(([id]) => id === tab)?.[1]}
              </h1>
              <p>
                {new Intl.DateTimeFormat('es-PY', {
                  weekday: 'long',
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                }).format(new Date())}
              </p>
            </div>

            <button type="button" aria-label="Notificaciones">
              <Bell />
              <i>
                {orders.filter((order) => order.status === 'Pendiente').length}
              </i>
            </button>
          </header>

          {tab === 'resumen' && (
            <>
              <div className="stats-grid">
                <article>
                  <span className="stat-icon blue">↗</span>
                  <strong>
                    {formatPrice(
                      orders.reduce((sum, order) => sum + order.totalUSD, 0),
                    )}
                  </strong>
                  <small>Ventas registradas</small>
                </article>

                <article>
                  <span className="stat-icon green">
                    <Package />
                  </span>
                  <strong>
                    {
                      orders.filter(
                        (order) =>
                          !['Entregado', 'Cancelado'].includes(order.status),
                      ).length
                    }
                  </strong>
                  <small>Pedidos activos</small>
                </article>

                <article>
                  <span className="stat-icon purple">
                    <Users />
                  </span>
                  <strong>{customers.length}</strong>
                  <small>Clientes totales</small>
                </article>

                <article>
                  <span className="stat-icon gold">▥</span>
                  <strong>{stock}</strong>
                  <small>Productos en stock</small>
                </article>
              </div>

              <PanelOrders
                orders={orders.slice(0, 5)}
                update={updateOrderStatus}
                remove={deleteOrder}
                title="Pedidos recientes"
              />
            </>
          )}

          {tab === 'pedidos' && (
            <>
              <div className="admin-toolbar">
                <label>
                  <span className="sr-only">Buscar pedidos</span>
                  <input
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    placeholder="Buscar pedido, cliente o producto"
                  />
                </label>
                <span>{filteredOrders.length} pedidos</span>
              </div>

              <PanelOrders
                orders={filteredOrders}
                update={updateOrderStatus}
                remove={deleteOrder}
                title="Todos los pedidos"
              />
            </>
          )}

          {tab === 'clientes' && (
            <div className="admin-card">
              <div className="admin-card-head">
                <h2>Clientes registrados</h2>
                <span>{customers.length}</span>
              </div>

              {customers.length === 0 ? (
                <Empty text="Aún no hay clientes registrados." />
              ) : (
                <div className="admin-table">
                  <div className="tr th">
                    <span>Cliente</span>
                    <span>Teléfono</span>
                    <span>Registro</span>
                  </div>

                  {customers.map((customer, index) => (
                    <div className="tr" key={`${customer.phone}-${index}`}>
                      <b>{customer.name}</b>
                      <span>+{customer.phone}</span>
                      <span>
                        {customer.createdAt ? fmt(customer.createdAt) : '—'}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {tab === 'inventario' && (
            <div className="admin-card">
              <div className="admin-card-head">
                <h2>Inventario conectado</h2>
                <span>{products.length} productos</span>
              </div>

              <AdminInventoryTable
                products={products}
                loading={productsLoading}
                updateProduct={updateProduct}
              />
            </div>
          )}

          {tab === 'cotizaciones' && (
            <RatesPanel
              rates={rates}
              ratesDate={ratesDate ?? ''}
              ratesFallback={ratesFallback}
            />
          )}

          {tab === 'config' && (
            <div className="admin-card settings-card">
              <h2>Configuración del comercio</h2>

              <label>
                Nombre del comercio
                <input defaultValue="AZ+PHARMA" />
              </label>

              <label>
                Número de WhatsApp
                <input defaultValue="+595 973 694377" />
              </label>

              <label>
                Ciudad
                <input defaultValue="Ciudad del Este, Paraguay" />
              </label>

              <label>
                <input type="checkbox" defaultChecked />
                Solicitar receta antes de confirmar pedidos
              </label>

              <button
                type="button"
                onClick={() =>
                  alert('Configuración guardada localmente para esta demostración.')
                }
              >
                Guardar cambios
              </button>
            </div>
          )}
        </section>
      </main>
    </>
  );
}

function RatesPanel({
  rates,
  ratesDate,
  ratesFallback,
}: {
  rates: { USD: number; BRL: number; PYG: number };
  ratesDate: string;
  ratesFallback: boolean;
}) {
  const [refreshing, setRefreshing] = useState(false);

  const refresh = async () => {
    setRefreshing(true);

    try {
      await fetch(`/api/exchange-rates?t=${Date.now()}`, {
        cache: 'no-store',
      });
      window.location.reload();
    } finally {
      setRefreshing(false);
    }
  };

  return (
    <div className="admin-card rates-admin">
      <div className="admin-card-head">
        <div>
          <h2>Cotizaciones</h2>
          <p>Uso interno del administrador</p>
        </div>

        <button
          type="button"
          className="rates-refresh"
          onClick={refresh}
          disabled={refreshing}
        >
          <RefreshCw className={refreshing ? 'spin' : ''} />
          {refreshing ? 'Actualizando…' : 'Actualizar ahora'}
        </button>
      </div>

      <div className="rates-admin-grid">
        <article>
          <small>Moneda base</small>
          <strong>US$ 1,00</strong>
          <span>Dólar estadounidense</span>
        </article>

        <article>
          <small>Real brasileño</small>
          <strong>
            {new Intl.NumberFormat('pt-BR', {
              style: 'currency',
              currency: 'BRL',
            }).format(rates.BRL)}
          </strong>
          <span>Valor aplicado por cada US$ 1</span>
        </article>

        <article>
          <small>Guaraní paraguayo</small>
          <strong>
            {new Intl.NumberFormat('es-PY', {
              style: 'currency',
              currency: 'PYG',
              maximumFractionDigits: 0,
            }).format(rates.PYG)}
          </strong>
          <span>Valor aplicado por cada US$ 1</span>
        </article>
      </div>

      <div className="rates-admin-note">
        <b>Margen comercial: +3 %</b>
        <span>
          {ratesDate ? `Última referencia: ${ratesDate}` : 'Sin fecha disponible'}
        </span>
        <span>
          {ratesFallback
            ? 'Se están usando valores de respaldo.'
            : 'Fuente automática activa.'}
        </span>
        <span>
          Estas cotizaciones no se muestran como sección pública; se usan para
          calcular los precios convertidos.
        </span>
      </div>
    </div>
  );
}

function Empty({ text }: { text: string }) {
  return (
    <div className="admin-empty">
      <Package />
      <p>{text}</p>
    </div>
  );
}

function PanelOrders({
  orders,
  update,
  remove,
  title,
}: {
  orders: Order[];
  update: (id: string, status: Order['status']) => void;
  remove: (id: string) => void;
  title: string;
}) {
  return (
    <div className="admin-card">
      <div className="admin-card-head">
        <h2>{title}</h2>
        <span>{orders.length}</span>
      </div>

      {orders.length === 0 ? (
        <Empty text="Todavía no hay pedidos. Los pedidos enviados desde el carrito aparecerán aquí." />
      ) : (
        <div className="admin-table orders-table">
          <div className="tr th">
            <span>Pedido</span>
            <span>Cliente</span>
            <span>Producto</span>
            <span>Estado</span>
            <span>Fecha</span>
            <span />
          </div>

          {orders.map((order) => (
            <div className="tr" key={order.id}>
              <b>{order.id}</b>
              <span>{order.customer}</span>
              <span>
                {order.items
                  .map((item) => `${item.name} x${item.quantity}`)
                  .join(', ')}
              </span>

              <select
                value={order.status}
                onChange={(event) =>
                  update(order.id, event.target.value as Order['status'])
                }
              >
                <option>Pendiente</option>
                <option>Confirmado</option>
                <option>En camino</option>
                <option>Entregado</option>
                <option>Cancelado</option>
              </select>

              <span>{fmt(order.createdAt)}</span>

              <button
                type="button"
                className="delete-order"
                onClick={() => remove(order.id)}
                aria-label={`Eliminar pedido ${order.id}`}
              >
                <Trash2 />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
