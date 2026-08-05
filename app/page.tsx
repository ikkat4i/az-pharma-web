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

        <section
          className="featured-video-section featured-video-section-top"
          aria-labelledby="featured-video-title"
        >
          <div className="featured-video-copy">
            <span className="featured-video-kicker">
              Selección AZ+PHARMA
            </span>

            <h2 id="featured-video-title">
              Descubrí nuestros productos destacados
            </h2>

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
              aria-label="Video principal de productos AZ+PHARMA"
            />
          </div>
        </section>

        <Featured />
        <Catalog />

        <section
          className="video-gallery-section"
          aria-labelledby="video-gallery-title"
        >
          <div className="video-gallery-heading">
            <span className="featured-video-kicker">Conocé AZ+PHARMA</span>
            <h2 id="video-gallery-title">
              Productos y presentaciones en detalle
            </h2>
            <p>
              Mirá de cerca algunas de nuestras presentaciones y conocé mejor
              la selección disponible en nuestro catálogo.
            </p>
          </div>

          <div className="video-gallery-grid">
            <article className="video-gallery-card">
              <div className="video-gallery-frame">
                <video
                  src="/videos/video-producto-az-pharma-02.mp4"
                  muted
                  loop
                  playsInline
                  controls
                  preload="metadata"
                  aria-label="Video de presentación de producto AZ+PHARMA"
                />
              </div>
              <div className="video-gallery-copy">
                <h3>Presentaciones seleccionadas</h3>
                <p>
                  Una vista más cercana de productos disponibles en nuestro
                  catálogo.
                </p>
              </div>
            </article>

            <article className="video-gallery-card">
              <div className="video-gallery-frame">
                <video
                  src="/videos/video-producto-az-pharma-03.mp4"
                  muted
                  loop
                  playsInline
                  controls
                  preload="metadata"
                  aria-label="Video adicional de productos AZ+PHARMA"
                />
              </div>
              <div className="video-gallery-copy">
                <h3>Calidad y presentación</h3>
                <p>
                  Detalles visuales para ayudarte a reconocer cada producto y
                  su presentación.
                </p>
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
