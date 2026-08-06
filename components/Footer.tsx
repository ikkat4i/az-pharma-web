import Image from 'next/image';
import Link from 'next/link';
import { Instagram, MapPin, MessageCircle, ShieldCheck } from 'lucide-react';

const WHATSAPP_URL =
  'https://wa.me/595973694377?text=Hola%20AZ%2BPHARMA%2C%20quisiera%20realizar%20una%20consulta.';

export function Footer() {
  return (
    <footer id="contacto" className="footer footer-premium">
      <div className="footer-premium-inner">
        <section className="footer-brand-column">
          <Link href="/" className="footer-brand-link" aria-label="AZ+PHARMA">
            <Image
              src="/images/az-pharma-logo-header.png"
              alt="AZ+PHARMA"
              width={260}
              height={165}
              className="footer-brand-image"
            />
          </Link>

          <p>
            Tu farmacia online con atención cercana, compra segura y envíos
            coordinados a todo Paraguay.
          </p>

          <div className="footer-trust">
            <ShieldCheck size={19} />
            <span>Calidad, confianza y cuidado</span>
          </div>
        </section>

        <section className="footer-links-column">
          <h3>Navegación</h3>
          <Link href="/">Inicio</Link>
          <Link href="/#productos">Productos</Link>
          <Link href="/#contacto">Contacto</Link>
        </section>

        <section className="footer-contact-column">
          <h3>Atención</h3>

          <a href={WHATSAPP_URL} target="_blank" rel="noreferrer">
            <MessageCircle size={18} />
            WhatsApp
          </a>

          <span>
            <MapPin size={18} />
            Ciudad del Este, Paraguay
          </span>

          <span className="footer-instagram-pending">
            <Instagram size={18} />
            Instagram próximamente
          </span>
        </section>
      </div>

      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} AZ+PHARMA</span>
        <span>Cuidando tu bienestar, un paso a la vez.</span>
      </div>
    </footer>
  );
}
