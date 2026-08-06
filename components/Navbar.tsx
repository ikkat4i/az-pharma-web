'use client';

import Image from 'next/image';
import Link from 'next/link';
import {
  Menu,
  ShoppingCart,
  UserRound,
  X,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { useStore } from './StoreProvider';

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  const {
    lang,
    setLang,
    currency,
    setCurrency,
    t,
    cartCount,
    setCartOpen,
    setAuthOpen,
    user,
    logout,
  } = useStore();

  useEffect(() => {
    fetch('/api/admin/session', { cache: 'no-store' })
      .then((response) => response.json())
      .then((data) => setIsAdmin(Boolean(data.isAdmin)))
      .catch(() => setIsAdmin(false));
  }, []);

  return (
    <header className="navbar">
      <div className="nav-inner">
        <Link
          href="/"
          className="brand brand-logo"
          aria-label="Ir al inicio de AZ+PHARMA"
        >
          <Image
            src="/images/az-pharma-logo-header.png"
            alt="AZ+PHARMA"
            width={220}
            height={150}
            priority
            className="brand-logo-image"
          />
        </Link>

        <nav className={open ? 'nav-links open' : 'nav-links'}>
          <Link href="/#productos" onClick={() => setOpen(false)}>
            {t('products')}
          </Link>

          <Link href="/#contacto" onClick={() => setOpen(false)}>
            {t('contact')}
          </Link>

          {isAdmin && (
            <Link href="/dashboard" onClick={() => setOpen(false)}>
              {t('dashboard')}
            </Link>
          )}
        </nav>

        <div className="nav-actions">
          <select
            className="currency-select"
            value={currency}
            onChange={(event) =>
              setCurrency(event.target.value as 'USD' | 'BRL' | 'PYG')
            }
            aria-label="Seleccionar moneda"
          >
            <option value="USD">USD</option>
            <option value="BRL">BRL</option>
            <option value="PYG">PYG</option>
          </select>

          <select
            className="lang-select"
            value={lang}
            onChange={(event) =>
              setLang(event.target.value as 'es' | 'pt' | 'en')
            }
            aria-label="Seleccionar idioma"
          >
            <option value="es">ES</option>
            <option value="pt">PT</option>
            <option value="en">EN</option>
          </select>

          {user ? (
            <div className="user-menu">
              <span>{user.name.split(' ')[0]}</span>
              <button type="button" onClick={logout}>
                {t('logout')}
              </button>
            </div>
          ) : (
            <button
              type="button"
              className="login"
              onClick={() => setAuthOpen(true)}
            >
              <UserRound size={18} />
              {t('enter')}
            </button>
          )}

          <button
            type="button"
            className="icon-btn cart-icon"
            onClick={() => setCartOpen(true)}
            aria-label="Abrir carrito"
          >
            <ShoppingCart size={21} />

            {cartCount > 0 && <span>{cartCount}</span>}
          </button>

          <button
            type="button"
            className="menu-btn"
            onClick={() => setOpen((current) => !current)}
            aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={open}
          >
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </div>
    </header>
  );
}