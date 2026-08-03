import { AuthModal } from '@/components/AuthModal';
import { Benefits } from '@/components/Benefits';
import { CartDrawer } from '@/components/CartDrawer';
import { Catalog } from '@/components/Catalog';
import { Featured } from '@/components/Featured';
import { Footer } from '@/components/Footer';
import { AccountSection } from '@/components/AccountSection';
import { Hero } from '@/components/Hero';
import { Navbar } from '@/components/Navbar';
import { RegisteredCatalogDownload } from '@/components/RegisteredCatalogDownload';
export default function Home(){return <><Navbar/><main><Hero/><Featured/><Catalog/><Benefits/><AccountSection/></main>
      <section className="featured-video-section" aria-labelledby="featured-video-title">
        <div className="featured-video-copy">
          <span className="featured-video-kicker">Selección AZ+PHARMA</span>
          <h2 id="featured-video-title">Descubrí nuestros productos destacados</h2>
          <p>
            Una selección de presentaciones pensada para mostrarte, de forma clara
            y profesional, algunos de los productos disponibles en nuestro catálogo.
          </p>
          <a href="#productos" className="featured-video-link">
            Ver catálogo completo
          </a>
        </div>

        <div className="featured-video-frame">
          <video
            src="/videos/productos-destacados.mp4"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            aria-label="Video de productos destacados de AZ+PHARMA"
          />
        </div>
      </section>
<RegisteredCatalogDownload/>
<Footer/><CartDrawer/><AuthModal/></>}
