import { ArrowUpRight, MessageCircle, MapPin, Phone, Play, MoveUpRight } from 'lucide-react';

const whatsapp = 'https://wa.me/19734454908?text=Hi%20Next%20Level!%20I%27d%20like%20to%20discuss%20a%20concrete%20coating%20project.%20My%20ZIP%20code%20is%20';
const facebook = 'https://www.facebook.com/share/1JuezjgG6z/';

function WhatsAppLink({children, className = ''}:{children:React.ReactNode; className?:string}) {
  return <a className={`button ${className}`} href={whatsapp} target="_blank" rel="noopener noreferrer"><MessageCircle size={19} aria-hidden="true" /><span>{children}</span><ArrowUpRight size={20} aria-hidden="true" /></a>;
}
function Brand() {
  return <span className="brand">NEXT<MoveUpRight aria-hidden="true" />LEVEL<small>CONCRETE COATINGS & MORE</small></span>;
}
export default function Home() {
  return <>
    <a className="skip-link" href="#main">Skip to content</a>
    <div className="location-bar"><span><MapPin size={12} aria-hidden="true" /> Boiling Springs, South Carolina</span><a href="tel:+18644948712">Call (864) 494-8712 <ArrowUpRight size={12} aria-hidden="true" /></a></div>
    <header className="header">
      <a href="#" aria-label="Next Level Concrete Coatings and More home"><Brand /></a>
      <nav aria-label="Main navigation"><a href="#services">What we do</a><a href="#work">Our work</a><a href="#about">About us</a><a href="#contact" className="nav-cta">Let’s talk floors <ArrowUpRight size={16} aria-hidden="true" /></a></nav>
    </header>
    <main id="main">
      <section className="hero" aria-labelledby="hero-title">
        <div className="hero-copy"><p className="eyebrow"><span className="orange-dot" /> CONCRETE COATINGS & MORE</p><h1 id="hero-title">Your concrete.<br />On a whole<br /><em>new level.</em></h1><p className="intro">Give your floors a finish worth coming home to. From decorative flake floors to outdoor surfaces, let’s bring a fresh look to your space.</p><WhatsAppLink>Discuss your project</WhatsAppLink><p className="micro">A direct conversation on WhatsApp. Start with a few photos.</p><a href="#work" className="hero-work-link">Explore our work <span aria-hidden="true">↓</span></a></div>
        <figure className="hero-photo"><img src="/media/flake-floor-12.jpg" alt="A completed Next Level interior floor with a gray, black and white decorative flake finish" width="576" height="1024" fetchPriority="high" /><div className="photo-index"><span>THE FINISHED SPACE</span><span>01 / NEXT LEVEL</span></div><figcaption><div><small>REAL PROJECT. REAL FINISH.</small><strong>Made for a fresh start.</strong></div><ArrowUpRight size={32} aria-hidden="true" /></figcaption></figure>
      </section>
      <div className="service-strip" aria-label="Project types"><span>INTERIOR FLOORS</span><i aria-hidden="true">✳</i><span>GARAGES</span><i aria-hidden="true">✳</i><span>OUTDOOR SURFACES</span><i aria-hidden="true">✳</i><span>SURFACE PREPARATION</span></div>
      <section className="section services" id="services" aria-labelledby="services-title">
        <p className="eyebrow">01 / WHAT WE DO</p><div className="section-head"><h2 id="services-title">A better finish.<br />A different feeling.</h2><p>Your project starts with your space. Tell us what you want to change and we’ll discuss the surface, the look, and the next steps.</p></div>
        <div className="service-row">
          <article><span className="number">01</span><h3>Decorative flake floors</h3><p>A distinctive, speckled finish that gives an existing concrete floor a whole new look.</p></article>
          <article><span className="number">02</span><h3>Garages & interiors</h3><p>Explore coating options for your garage and other concrete floors around your property.</p></article>
          <article><span className="number">03</span><h3>Outdoor surfaces</h3><p>From patios and walkways to recreation areas, talk with us about your outdoor project.</p></article>
          <article><span className="number">04</span><h3>Surface preparation</h3><p>See the work that comes before the finish, including mechanical preparation of existing concrete.</p></article>
        </div>
      </section>
      <section className="section work" id="work" aria-labelledby="work-title">
        <p className="eyebrow">02 / SELECTED WORK</p><div className="section-head"><h2 id="work-title">See it for yourself.</h2><p>Take a closer look at projects from the Next Level team. Play the videos to explore the finished surfaces.</p></div>
        <div className="project-grid">
          <figure><div className="video-wrap"><span className="project-label">PROJECT 01 / INTERIOR</span><video controls playsInline muted preload="none" poster="/media/flake-floor-12.jpg" aria-label="Video tour of a completed decorative flake interior floor"><source src="/media/flake-floor.mp4" type="video/mp4" /><a href="/media/flake-floor.mp4">Watch the interior floor video</a></video></div><figcaption><div><h3>A fresh finish, from wall to wall.</h3><p>Decorative flake floor · Interior project</p></div><Play size={18} aria-hidden="true" /></figcaption></figure>
          <figure><div className="video-wrap"><span className="project-label">PROJECT 02 / OUTDOOR</span><video controls playsInline muted preload="none" poster="/media/next-level-project-12.jpg" aria-label="Video of a Next Level outdoor recreation court project"><source src="/media/next-level-project.mp4" type="video/mp4" /><a href="/media/next-level-project.mp4">Watch the outdoor project video</a></video></div><figcaption><div><h3>More room to get outside.</h3><p>Color-coated recreation court · Outdoor project</p></div><Play size={18} aria-hidden="true" /></figcaption></figure>
        </div>
        <div className="work-bottom"><p>Have a space in mind? Send us a photo of it.</p><a className="text-link" href={whatsapp} target="_blank" rel="noopener noreferrer">Let’s discuss your project <ArrowUpRight size={16} aria-hidden="true" /></a></div>
      </section>
      <section className="section about" id="about" aria-labelledby="about-title">
        <div className="about-copy"><p className="eyebrow">03 / FROM THE GROUND UP</p><h2 id="about-title">The work starts<br />at the surface.</h2><p>We’re Next Level Concrete Coatings & More, based in Boiling Springs, South Carolina. Our work brings together concrete preparation and finishes for interior and outdoor spaces.</p><p>This garage project shows the preparation stage up close. It’s part of the work behind the finished floor.</p><a className="text-link" href={facebook} target="_blank" rel="noopener noreferrer">Find Next Level on Facebook <ArrowUpRight size={16} aria-hidden="true" /></a></div>
        <figure className="process-video"><video controls playsInline muted preload="none" poster="/media/surface-preparation-12.jpg" aria-label="Video of mechanical preparation of an existing garage floor"><source src="/media/surface-preparation.mp4" type="video/mp4" /><a href="/media/surface-preparation.mp4">Watch the preparation video</a></video><figcaption>BEHIND THE SCENES / GARAGE FLOOR PREPARATION</figcaption></figure>
      </section>
      <section className="section start" aria-labelledby="start-title"><div><p className="eyebrow">A SIMPLE PLACE TO START</p><h2 id="start-title">Your project.<br />Let’s talk it through.</h2></div><ol><li><span>01</span><div><h3>Show us your space</h3><p>Send a few photos, your ZIP code, and approximate dimensions if you have them.</p></div></li><li><span>02</span><div><h3>Tell us what you have in mind</h3><p>Share the look you like and how you use the area. We’ll discuss options for your project.</p></div></li><li><span>03</span><div><h3>Discuss the next step</h3><p>Ask about pricing, availability, and what your surface needs before work begins.</p></div></li></ol></section>
      <section id="contact" className="contact" aria-labelledby="contact-title"><p className="eyebrow">LET’S MAKE SOMETHING OF YOUR SPACE</p><h2 id="contact-title">Ready for your<br /><em>next level?</em></h2><p>Message Juanca to start a conversation about your concrete coating project.</p><WhatsAppLink>Start a WhatsApp conversation</WhatsAppLink><div className="contact-details"><a href="tel:+18644948712"><Phone size={15} aria-hidden="true" /> (864) 494-8712</a><span><MapPin size={15} aria-hidden="true" /> Boiling Springs, SC</span></div><p className="service-note">Send your ZIP code to confirm service availability in your area.</p></section>
    </main>
    <footer><a href="#" aria-label="Back to top"><Brand /></a><p>© 2026 Next Level Concrete Coatings & More</p><a href={facebook} target="_blank" rel="noopener noreferrer">Facebook <ArrowUpRight size={14} aria-hidden="true" /></a></footer>
  </>;
}