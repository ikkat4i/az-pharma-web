import Image from 'next/image';
import Link from 'next/link';
import {
  Facebook,
  Instagram,
  MapPin,
  MessageCircle,
  ShieldCheck,
} from 'lucide-react';

const WHATSAPP_URL =
  'https://wa.me/595973694377?text=Hola%20AZ%2BPHARMA%2C%20quisiera%20realizar%20una%20consulta';

const INSTAGRAM_URL = 'https://www.instagram.com/azu_pharma/';

export function Footer() {
  return (
    <footer className="footer" id="contacto">
      <div className="footer-inner">
        <section className="footer-brand-column">
          <Image
            src="/images/logo.png"
            alt="AZ+PHARMA"
            width={170}
            height={70}
          />

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

          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noreferrer"
          >
            <Instagram size={18} />
            @azpharma0
          </a>

          <span>
            <Facebook size={18} />
            Az+Pharma
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