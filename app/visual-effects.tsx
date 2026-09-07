'use client';

import { useEffect, useRef, useState } from 'react';
import { Play } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function VisualEffects() {
  const progress = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    let frame = 0;
    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const distance = document.documentElement.scrollHeight - window.innerHeight;
        if (progress.current) progress.current.style.transform = `scaleX(${distance > 0 ? window.scrollY / distance : 0})`;
      });
    };
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    update();
    const animations: Animation[] = [];
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        if (!preference.matches) animations.push(entry.target.animate([
          { opacity: 0, transform: 'translateY(24px)' },
          { opacity: 1, transform: 'translateY(0)' },
        ], { duration: 700, easing: 'cubic-bezier(.2,.7,.2,1)' }));
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.12 });
    document.querySelectorAll('.section-head, .service-row article, .project-grid figure, .about-copy, .process-video, .start li, .contact h2').forEach(element => observer.observe(element));
    const stopMotion = () => { if (preference.matches) animations.forEach(animation => animation.cancel()); };
    preference.addEventListener('change', stopMotion);
    return () => {
      observer.disconnect();
      animations.forEach(animation => animation.cancel());
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
      preference.removeEventListener('change', stopMotion);
    };
  }, []);
  return <div ref={progress} className="reading-progress" aria-hidden="true" />;
}

export function ProjectFilm({ src, poster, label }: { src: string; poster: string; label: string }) {
  const video = useRef<HTMLVideoElement>(null);
  const [started, setStarted] = useState(false);
  const play = async () => {
    setStarted(true);
    try { await video.current?.play(); } catch { /* Native controls remain available if playback is blocked. */ }
  };
  return <div className={`film ${started ? 'film-started' : ''}`}>
    <video ref={video} controls playsInline muted preload="none" poster={poster} aria-label={label}><source src={src} type="video/mp4" /><a href={src}>Watch project video</a></video>
    {!started && <Button className="film-play" onClick={play} aria-label={`Play ${label}`}><span className="film-play-icon"><Play fill="currentColor" aria-hidden="true" /></span><span>WATCH THE PROJECT</span></Button>}
  </div>;
}
