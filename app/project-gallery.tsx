'use client';

import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, ChevronLeft, ChevronRight, Play, X } from 'lucide-react';

type ProjectMedia = { name: string; title: string; detail: string; alt: string; video?: string; stage?: string };

const stages: ProjectMedia[] = [
  { name: 'hall-before', title: 'Start with the surface.', detail: 'Concrete preparation', stage: '01 / BEFORE', alt: 'Bare concrete inside the large timber-roofed hall, with preparation equipment on the floor' },
  { name: 'hall-during', title: 'Build the new finish.', detail: 'Flake coating in progress', stage: '02 / DURING', alt: 'The same hall during coating, showing bare concrete in front and decorative flake across the back' },
  { name: 'interior-finish-poster', title: 'See the space come together.', detail: 'The completed interior', stage: '03 / AFTER', alt: 'Finished decorative flake flooring across the hall beside its timber wall' },
];

const projects: ProjectMedia[] = [
  { name: 'interior-finish-poster', video: 'interior-finish', title: 'The finished hall', detail: 'Interior · Full walkthrough', alt: 'Warm decorative flake floor in the completed hall' },
  { name: 'porch-finish', title: 'A fresh welcome home', detail: 'Porch · Project photo', alt: 'Completed gray flake coating across a covered brick porch with white columns' },
  { name: 'concrete-overlay-poster', video: 'concrete-overlay', title: 'Around the pool', detail: 'Outdoor · Concrete overlay', alt: 'Golden textured concrete overlay surrounding a swimming pool' },
  { name: 'hall-preparation-poster', video: 'hall-preparation', title: 'Before the transformation', detail: 'Interior · Preparation walkthrough', alt: 'Prepared concrete floor and equipment inside the large hall' },
  { name: 'hall-finished-poster', video: 'hall-finished', title: 'The finish takes shape', detail: 'Interior · Coating in progress', alt: 'Team working on the decorative flake coating in the hall' },
  { name: 'residential-walkthrough-poster', video: 'residential-walkthrough', title: 'A color of its own', detail: 'Residential · Decorative flake', alt: 'Burgundy decorative flake flooring inside a residential space' },
  { name: 'porch-detail', title: 'Get closer to the detail', detail: 'Flake finish · Project photo', alt: 'Close view of the gray and white decorative flake texture on the porch' },
  { name: 'porch-walkthrough-poster', video: 'porch-walkthrough', title: 'From entrance to every edge', detail: 'Porch · Full walkthrough', alt: 'Finished porch coating beside a brick wall and doorway' },
  { name: 'next-level-project-12', video: 'next-level-project', title: 'More room to get outside', detail: 'Outdoor · Recreation court', alt: 'Color-coated outdoor recreation court' },
  { name: 'flake-floor-12', video: 'flake-floor', title: 'Wall-to-wall texture', detail: 'Interior · Decorative flake', alt: 'Gray decorative flake flooring from a Next Level interior project' },
];
const media = [...stages, ...projects];

function GalleryPhoto({ item }: { item: ProjectMedia }) {
  const sizes = item.stage
    ? '(max-width: 700px) 88vw, 29vw'
    : '(max-width: 370px) 88vw, (max-width: 900px) 43vw, 29vw';
  return <picture>
    <source srcSet={`/media/${item.name}-480.avif 480w, /media/${item.name}-800.avif 800w`} sizes={sizes} type="image/avif" />
    <img src={`/media/${item.name}-800.webp`} srcSet={`/media/${item.name}-480.webp 480w, /media/${item.name}-800.webp 800w`} sizes={sizes} alt={item.alt} width={800} height={1100} loading="lazy" decoding="async" />
  </picture>;
}

export function ProjectGallery() {
  const dialog = useRef<HTMLDialogElement>(null);
  const [active, setActive] = useState<number | null>(null);
  const item = active === null ? null : media[active];
  const move = (direction: number) => setActive(index => index === null ? null : (index + direction + media.length) % media.length);

  useEffect(() => {
    if (active === null) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = previous; };
  }, [active !== null]);

  const card = (entry: ProjectMedia, index: number) => <a
    key={`${entry.name}-${index}`}
    className={`gallery-card ${entry.stage ? 'gallery-stage' : ''}`}
    href={`/media/${entry.video ? `${entry.video}.mp4` : `${entry.name}.webp`}`}
    aria-label={`${entry.video ? 'Watch' : 'Enlarge'} ${entry.title}`}
    onClick={event => {
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      event.preventDefault();
      setActive(index);
      dialog.current?.showModal();
    }}
  >
    <div className="gallery-image">
      <GalleryPhoto item={entry} />
      {entry.stage && <span className="gallery-badge">{entry.stage}</span>}
      <span className={`gallery-open ${entry.video ? 'gallery-play' : ''}`} aria-hidden="true">
        {entry.video ? <Play size={20} fill="currentColor" /> : <ArrowUpRight size={20} />}
      </span>
      {entry.video && <span className="gallery-video-label">WATCH FILM</span>}
    </div>
    <div className="gallery-caption"><h3>{entry.title}</h3><p>{entry.detail}</p></div>
  </a>;

  return <>
    <div className="project-story">
      <div className="gallery-heading"><h3>One space. Every stage.</h3><p>A look inside one of our larger floor transformations.</p></div>
      <div className="stage-grid">{stages.map(card)}</div>
    </div>
    <div className="gallery-heading gallery-collection-heading"><h3>Explore the work.</h3><p>Open a photo for the details. Play a film to walk through the space.</p></div>
    <div className="gallery-grid">{projects.map((entry, index) => card(entry, index + stages.length))}</div>

    <dialog ref={dialog} className="gallery-dialog" aria-labelledby="gallery-dialog-title"
      onClose={() => setActive(null)}
      onClick={event => { if (event.target === event.currentTarget) dialog.current?.close(); }}
      onKeyDown={event => {
        if (event.target instanceof HTMLVideoElement) return;
        if (event.key === 'ArrowRight') { event.preventDefault(); move(1); }
        if (event.key === 'ArrowLeft') { event.preventDefault(); move(-1); }
      }}>
      <div className="gallery-viewer">
        <div className="gallery-toolbar">
          <span aria-live="polite">{active === null ? '' : `${active + 1} / ${media.length}`}</span>
          <button type="button" aria-label="Close gallery" onClick={() => dialog.current?.close()}><X /></button>
        </div>
        {item && <div className="gallery-full-media" key={item.video || item.name}>
          {item.video
            ? <video controls autoPlay muted playsInline preload="metadata" poster={`/media/${item.name}.webp`} aria-label={item.title}><source src={`/media/${item.video}.mp4`} type="video/mp4" /><a href={`/media/${item.video}.mp4`}>Open video</a></video>
            : <img src={`/media/${item.name}.webp`} alt={item.alt} />}
        </div>}
        <div className="gallery-viewer-footer">
          <button type="button" aria-label="Previous project" onClick={() => move(-1)}><ChevronLeft /></button>
          <div><h3 id="gallery-dialog-title">{item?.title}</h3><p>{item?.detail}</p></div>
          <button type="button" aria-label="Next project" onClick={() => move(1)}><ChevronRight /></button>
        </div>
      </div>
    </dialog>
  </>;
}
