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

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />

        <section className="featured-video-section featured-video-section-top">
          <div className="featured-video-copy">
            <span className="featured-video-kicker">Selección AZ+PHARMA</span>
            <h2>Descubrí nuestros productos destacados</h2>
            <p>
              Una selección de presentaciones pensada para mostrarte, de forma
              clara y profesional, algunos de los productos disponibles en
              nuestro catálogo.
            </p>
            <a href="#productos" className="featured-video-link">
              Ver catálogo completo
            </a>
          </div>

          <div className="featured-video-frame">
            <video
              src="/videos/video-principal-az-pharma.mp4"
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              aria-label="Video principal de AZ+PHARMA"
            />
          </div>
        </section>

        <Featured />
        <Catalog />

        <section
          className="video-gallery-section video-gallery-section-only"
          aria-label="Videos de AZ+PHARMA"
        >
          <div className="video-gallery-grid video-gallery-grid-only">
            <article className="video-gallery-card video-gallery-card-only">
              <div className="video-gallery-frame">
                <video
                  src="/videos/video-producto-az-pharma-02.mp4"
                  autoPlay
                  muted
                  loop
                  playsInline
                  controls={false}
                  preload="metadata"
                  aria-label="Video de AZ+PHARMA"
                />
              </div>
            </article>

            <article className="video-gallery-card video-gallery-card-only">
              <div className="video-gallery-frame">
                <video
                  src="/videos/video-producto-az-pharma-03.mp4"
                  autoPlay
                  muted
                  loop
                  playsInline
                  controls={false}
                  preload="metadata"
                  aria-label="Video de AZ+PHARMA"
                />
              </div>
            </article>
          </div>
        </section>

        <Benefits />
        <AccountSection />
        <RegisteredCatalogDownload />
      </main>

      <Footer />
      <CartDrawer />
      <AuthModal />
    </>
  );
}
