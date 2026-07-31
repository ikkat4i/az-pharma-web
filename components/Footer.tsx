'use client';
import { MapPin, Phone } from 'lucide-react';
import { useStore } from './StoreProvider';
export function Footer(){const {t}=useStore();return <footer id="contacto" className="footer"><div className="footer-main"><div><h2>AZ<span>+</span>PHARMA</h2><p className="preline">{t('footerDescription')}</p></div><div><h3>{t('contact')}</h3><ul><li><Phone/><a href="https://wa.me/595973694377" target="_blank" rel="noreferrer">+595 973 694377</a></li><li><MapPin/>Ciudad del Este · Alto Paraná · Paraguay</li></ul></div></div><div className="footer-bottom"><p>© 2026 AZ+PHARMA · Grupo AZUTECHNOLOGY. Todos los derechos reservados. Habilitación DINAVISA Nº 00000/2024.</p><nav><a href="#">{t('privacy')}</a><a href="#">{t('terms')}</a><a href="#">{t('shipping')}</a></nav></div></footer>}
