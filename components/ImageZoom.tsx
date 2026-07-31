'use client';

import { Minus, Plus, RotateCcw, X } from 'lucide-react';
import { useEffect, useState } from 'react';

type Props = {
  src: string;
  alt: string;
  buttonClassName?: string;
};

export function ImageZoom({ src, alt, buttonClassName = '' }: Props) {
  const [open, setOpen] = useState(false);
  const [zoom, setZoom] = useState(1);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
      if (event.key === '+' || event.key === '=') setZoom(z => Math.min(4, z + .25));
      if (event.key === '-') setZoom(z => Math.max(1, z - .25));
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [open]);

  const close = () => {
    setOpen(false);
    setZoom(1);
  };

  return (
    <>

      {open && (
        <div className="image-lightbox" role="dialog" aria-modal="true" aria-label={`Imagen ampliada de ${alt}`} onClick={close}>
          <button className="image-lightbox-close" onClick={close} aria-label="Cerrar imagen">
            <X size={24} />
          </button>

          <div className="image-zoom-toolbar" onClick={(event) => event.stopPropagation()}>
            <button onClick={() => setZoom(z => Math.max(1, z - .25))} aria-label="Alejar"><Minus size={20}/></button>
            <strong>{Math.round(zoom * 100)}%</strong>
            <button onClick={() => setZoom(z => Math.min(4, z + .25))} aria-label="Acercar"><Plus size={20}/></button>
            <button onClick={() => setZoom(1)} aria-label="Restablecer"><RotateCcw size={19}/></button>
          </div>

          <div
            className="image-lightbox-content image-lightbox-scroll"
            onClick={(event) => event.stopPropagation()}
            onWheel={(event) => {
              event.preventDefault();
              setZoom(z => Math.min(4, Math.max(1, z + (event.deltaY < 0 ? .2 : -.2))));
            }}
          >
            <img
              src={src}
              alt={alt}
              draggable={false}
              className="image-lightbox-native"
              style={{ width: `${zoom * 100}%` }}
            />
          </div>
        </div>
      )}
    </>
  );
}
