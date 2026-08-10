'use client';

import {
  Download,
  FileText,
  LockKeyhole,
  UserCheck,
} from 'lucide-react';

import { useStore } from './StoreProvider';

const copy = {
  es: {
    kicker: 'Beneficio para clientes registrados',
    title: 'Descargá el catálogo oficial en PDF',
    body:
      'Accedé al catálogo 2026 con el detalle de los productos disponibles en AZ+ PHARMA.',
    registered:
      'Tu cuenta está activa. Ya podés descargar el catálogo.',
    download: 'Descargar catálogo PDF',
    locked: 'Ingresá o registrate para descargar',
    note:
      'El archivo está disponible exclusivamente para clientes registrados.',
  },

  pt: {
    kicker: 'Benefício para clientes cadastrados',
    title: 'Baixe o catálogo oficial em PDF',
    body:
      'Acesse o catálogo 2026 com os detalhes dos produtos disponíveis na AZ+ PHARMA.',
    registered:
      'Sua conta está ativa. Você já pode baixar o catálogo.',
    download: 'Baixar catálogo PDF',
    locked: 'Entre ou cadastre-se para baixar',
    note:
      'O arquivo está disponível exclusivamente para clientes cadastrados.',
  },

  en: {
    kicker: 'Registered customer benefit',
    title: 'Download the official PDF catalog',
    body:
      'Access the 2026 catalog with details of the products available from AZ+ PHARMA.',
    registered:
      'Your account is active. You can now download the catalog.',
    download: 'Download PDF catalog',
    locked: 'Sign in or register to download',
    note:
      'The file is available exclusively to registered customers.',
  },
} as const;

export function RegisteredCatalogDownload() {
  const { user, lang, setAuthOpen } = useStore();
  const text = copy[lang];

  return (
    <section
      className="registered-catalog-section"
      aria-labelledby="catalog-download-title"
    >
      <div className="registered-catalog-icon">
        <FileText size={34} />
      </div>

      <div className="registered-catalog-content">
        <span className="registered-catalog-kicker">
          {text.kicker}
        </span>

        <h2 id="catalog-download-title">
          {text.title}
        </h2>

        <p>{text.body}</p>

        <div
          className={`registered-catalog-status ${
            user ? 'is-active' : 'is-locked'
          }`}
        >
          {user ? (
            <UserCheck size={18} />
          ) : (
            <LockKeyhole size={18} />
          )}

          <span>
            {user ? text.registered : text.note}
          </span>
        </div>
      </div>

      <div className="registered-catalog-action">
        {user ? (
          <a
            className="registered-catalog-button"
            href="/catalogos/catalogo-oficial-az-pharma-2026.pdf"
            download="Catalogo-Oficial-AZ-PHARMA-2026.pdf"
          >
            <Download size={20} />
            {text.download}
          </a>
        ) : (
          <button
            type="button"
            className="registered-catalog-button is-locked"
            onClick={() => setAuthOpen(true)}
          >
            <LockKeyhole size={20} />
            {text.locked}
          </button>
        )}
      </div>
    </section>
  );
