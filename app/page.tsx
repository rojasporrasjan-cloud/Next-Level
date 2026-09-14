import { ArrowUpRight, MessageCircle, MapPin, Phone } from 'lucide-react';
import { businessJsonLd, site, whatsapp } from '@/lib/site';
import { ProjectFilm, VisualEffects } from './visual-effects';
import { ProjectGallery } from './project-gallery';

function WhatsAppLink({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <a className={`button ${className}`} href={whatsapp} target="_blank" rel="noopener noreferrer">
      <MessageCircle size={19} aria-hidden="true" />
      <span>{children}</span>
      <ArrowUpRight size={20} aria-hidden="true" />
    </a>
  );
}

function Brand() {
  return (
    <span className="brand-logo">
      <img src="/media/next-level-logo.webp" alt="Next Level Concrete Coatings & More" width={640} height={428} />
    </span>
  );
}

/* Cada foto se sirve en AVIF con respaldo WebP; el navegador elige la primera
   que entiende. Los originales PNG/JPG pesaban entre 3 y 17 veces más. */
function Photo({
  name,
  alt,
  width,
  height,
  priority = false,
}: {
  name: string;
  alt: string;
  width: number;
  height: number;
  priority?: boolean;
}) {
  return (
    <picture>
      <source srcSet={`/media/${name}.avif`} type="image/avif" />
      <source srcSet={`/media/${name}.webp`} type="image/webp" />
      <img
        src={`/media/${name}.webp`}
        alt={alt}
        width={width}
        height={height}
        loading={priority ? 'eager' : 'lazy'}
        fetchPriority={priority ? 'high' : 'auto'}
      />
    </picture>
  );
}

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(businessJsonLd) }}
      />
      <VisualEffects />
      <a className="skip-link" href="#main">Skip to content</a>

      <div className="location-bar" id="top">
        <span><MapPin size={12} aria-hidden="true" /> Boiling Springs, South Carolina</span>
        <a href={`tel:${site.phone}`}>Call {site.phoneDisplay} <ArrowUpRight size={12} aria-hidden="true" /></a>
      </div>

      <header className="header">
        {/* Sitio de una sola ruta: el logo vuelve al inicio de la página en vez
            de navegar, lo que evita cargar el router cliente de Next. */}
        <a href="#top" aria-label="Next Level Concrete Coatings and More, back to top"><Brand /></a>
        <nav aria-label="Main navigation">
          <a href="#services">What we do</a>
          <a href="#work">Our work</a>
          <a href="#about">About us</a>
          <a href="#contact" className="nav-cta">Let’s talk floors <ArrowUpRight size={16} aria-hidden="true" /></a>
        </nav>
      </header>

      <main id="main">
        <section className="hero" aria-labelledby="hero-title">
          <figure className="hero-photo">
            <Photo
              name="bright-garage-inspiration"
              alt="Design inspiration: a light silver-gray flake floor, warm oak cabinetry and sunlight in a refined modern garage"
              width={1122}
              height={1402}
              priority
            />
            <figcaption>DESIGN INSPIRATION · AI VISUALIZATION</figcaption>
          </figure>
          <div className="hero-copy">
            <p className="eyebrow"><span className="orange-dot" /> CONCRETE. REIMAGINED.</p>
            <h1 id="hero-title">YOUR SPACE.<br /><em>NEXT LEVEL.</em></h1>
            <p className="intro">Beautiful floors. A fresh perspective.<br />Concrete coatings for the way you live.</p>
            <div className="hero-actions">
              <WhatsAppLink>Let’s talk floors</WhatsAppLink>
              <a href="#work" className="hero-work-link">Explore our work <ArrowUpRight size={18} aria-hidden="true" /></a>
            </div>
            <div className="hero-location">
              <MapPin size={17} aria-hidden="true" />
              <span>Boiling Springs, South Carolina</span>
            </div>
          </div>
        </section>

        <div className="service-strip" aria-label="Project types">
          <span>INTERIOR FLOORS</span><i aria-hidden="true" />
          <span>GARAGES</span><i aria-hidden="true" />
          <span>OUTDOOR SURFACES</span><i aria-hidden="true" />
          <span>SURFACE PREPARATION</span>
        </div>

        <section className="section services" id="services" aria-labelledby="services-title">
          <p className="eyebrow">01 / WHAT WE DO</p>
          <div className="section-head">
            <h2 id="services-title">A better finish.<br />A different feeling.</h2>
            <p>Your project starts with your space. Tell us what you want to change and we’ll discuss the surface, the look, and the next steps.</p>
          </div>
          <div className="service-row">
            <article>
              <Photo name="flake-floor-12" alt="Close view of a gray decorative flake finish" width={576} height={1024} />
              <div><span className="number">01</span><h3>Decorative flake floors</h3><p>Texture, character, and a distinctive finish. Give your concrete a look of its own.</p></div>
            </article>
            <article>
              <Photo name="flake-floor-2" alt="Interior floor from a Next Level project" width={576} height={1024} />
              <div><span className="number">02</span><h3>Garages &amp; interiors</h3><p>Bring a fresh perspective to the concrete floors you use every day.</p></div>
            </article>
            <article>
              <Photo name="next-level-project-12" alt="Color-coated outdoor recreation court" width={576} height={1024} />
              <div><span className="number">03</span><h3>Outdoor surfaces</h3><p>Patios, walkways, and recreation areas. Make more of the space outside.</p></div>
            </article>
            <article>
              <Photo name="surface-preparation-12" alt="Mechanical preparation of a garage floor" width={576} height={1024} />
              <div><span className="number">04</span><h3>Surface preparation</h3><p>Before the new look comes the groundwork. See the process behind the finish.</p></div>
            </article>
          </div>
        </section>

        <section className="section work" id="work" aria-labelledby="work-title">
          <p className="eyebrow">02 / THE NEXT LEVEL IN REAL LIFE</p>
          <div className="section-head">
            <h2 id="work-title">Less imagining.<br /><em>More seeing.</em></h2>
            <p>Real spaces. Real work from our team.<br />See the before, the process, and the finished floors.</p>
          </div>
          <ProjectGallery />
          <div className="work-bottom">
            <p>Have a space in mind? Send us a photo of it.</p>
            <a className="text-link" href={whatsapp} target="_blank" rel="noopener noreferrer">Let’s discuss your project <ArrowUpRight size={16} aria-hidden="true" /></a>
          </div>
        </section>

        <section className="section about" id="about" aria-labelledby="about-title">
          <div className="about-copy">
            <p className="eyebrow">03 / FROM THE GROUND UP</p>
            <h2 id="about-title">The work starts<br />at the surface.</h2>
            <p>We’re Next Level Concrete Coatings &amp; More, based in Boiling Springs, South Carolina. Our work brings together concrete preparation and finishes for interior and outdoor spaces.</p>
            <p>This garage project shows the preparation stage up close. It’s part of the work behind the finished floor.</p>
            <a className="text-link" href={site.facebook} target="_blank" rel="noopener noreferrer">Find Next Level on Facebook <ArrowUpRight size={16} aria-hidden="true" /></a>
          </div>
          <figure className="process-video">
            <ProjectFilm src="/media/surface-preparation.mp4" poster="/media/surface-preparation-12.webp" label="garage floor preparation" />
            <figcaption>BEHIND THE SCENES / GARAGE FLOOR PREPARATION</figcaption>
          </figure>
        </section>

        <section className="section start" aria-labelledby="start-title">
          <div>
            <p className="eyebrow">A SIMPLE PLACE TO START</p>
            <h2 id="start-title">Your project.<br />Let’s talk it through.</h2>
          </div>
          <ol>
            <li><span>01</span><div><h3>Show us your space</h3><p>Send a few photos, your ZIP code, and approximate dimensions if you have them.</p></div></li>
            <li><span>02</span><div><h3>Tell us what you have in mind</h3><p>Share the look you like and how you use the area. We’ll discuss options for your project.</p></div></li>
            <li><span>03</span><div><h3>Discuss the next step</h3><p>Ask about pricing, availability, and what your surface needs before work begins.</p></div></li>
          </ol>
        </section>

        <section id="contact" className="contact" aria-labelledby="contact-title">
          <p className="eyebrow">LET’S MAKE SOMETHING OF YOUR SPACE</p>
          <h2 id="contact-title">Ready for your<br /><em>next level?</em></h2>
          <p>Message Juanca to start a conversation about your concrete coating project.</p>
          <WhatsAppLink>Start a WhatsApp conversation</WhatsAppLink>
          <div className="contact-details">
            <a href={`tel:${site.phone}`}><Phone size={15} aria-hidden="true" /> {site.phoneDisplay}</a>
            <span><MapPin size={15} aria-hidden="true" /> Boiling Springs, SC</span>
          </div>
          <p className="service-note">Send your ZIP code to confirm service availability in your area.</p>
        </section>
      </main>

      <footer>
        <a href="#top" aria-label="Back to top"><Brand /></a>
        <nav className="footer-nav" aria-label="Footer navigation">
          <a href="#services">What we do</a>
          <a href="#work">Our work</a>
          <a href="#about">About us</a>
          <a href="#contact">Contact</a>
        </nav>
        <p>© 2026 Next Level Concrete Coatings &amp; More</p>
        <a className="footer-social" href={site.facebook} target="_blank" rel="noopener noreferrer">
          Facebook <ArrowUpRight size={14} aria-hidden="true" />
        </a>
      </footer>
    </>
  );
}
