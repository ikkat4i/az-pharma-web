'use client';

import { Minus, Plus, RotateCcw, Search, X } from 'lucide-react';
import { useEffect, useState } from 'react';

type Props = { src: string; alt: string; buttonClassName?: string };

export function ImageZoom({ src, alt, buttonClassName = '' }: Props) {
  const [open, setOpen] = useState(false);
  const [zoom, setZoom] = useState(1);
  function close(){ setOpen(false); setZoom(1); }
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') close();
      if (event.key === '+' || event.key === '=') setZoom(v => Math.min(4, v + .25));
      if (event.key === '-') setZoom(v => Math.max(1, v - .25));
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKeyDown);
    return () => { document.body.style.overflow = ''; window.removeEventListener('keydown', onKeyDown); };
  }, [open]);
  return <>
    <button type="button" className={`image-zoom-button ${buttonClassName}`.trim()} onClick={(event)=>{event.preventDefault();event.stopPropagation();setOpen(true);setZoom(1)}} aria-label={`Ampliar imagen de ${alt}`} title="Ampliar imagen"><Search size={18}/></button>
    {open && <div className="image-lightbox" role="dialog" aria-modal="true" aria-label={`Imagen ampliada de ${alt}`} onClick={close}>
      <button type="button" className="image-lightbox-close" onClick={close} aria-label="Cerrar imagen"><X size={24}/></button>
      <div className="image-zoom-toolbar" onClick={e=>e.stopPropagation()}>
        <button type="button" onClick={()=>setZoom(v=>Math.max(1,v-.25))} aria-label="Alejar"><Minus size={20}/></button>
        <strong>{Math.round(zoom*100)}%</strong>
        <button type="button" onClick={()=>setZoom(v=>Math.min(4,v+.25))} aria-label="Acercar"><Plus size={20}/></button>
        <button type="button" onClick={()=>setZoom(1)} aria-label="Restablecer"><RotateCcw size={19}/></button>
      </div>
      <div className="image-lightbox-content image-lightbox-scroll" onClick={e=>e.stopPropagation()} onWheel={event=>{event.preventDefault();setZoom(v=>Math.min(4,Math.max(1,v+(event.deltaY<0?.2:-.2))))}}>
        <img src={src} alt={alt} draggable={false} className="image-lightbox-native" style={{width:`${zoom*100}%`}}/>
      </div>
    </div>}
  </>;
}
