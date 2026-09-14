# Next Level — source notes
Business: Next Level Concrete Coatings & More, Boiling Springs, South Carolina.
Read from the desktop WhatsApp conversation with Juanca, with the user's authorization.
WhatsApp destination: +1 973 445 4908, the contact's actual WhatsApp number. The user was asked about a possible alternative number but instructed us to continue autonomously; using the verified chat destination.
Business voice telephone: +1 864 494 8712. Number visible on the branded vehicle in the supplied video (local portion 494-8712), and corroborated by https://epoxyinstallpros.com/south-carolina/spartanburg.
Primary Facebook page: https://www.facebook.com/share/1JuezjgG6z/ . The WhatsApp preview identifies the business and Boiling Springs. Facebook itself required login in the available browser; no unverified Facebook claims used.
The Instagram link in the conversation is a reference post by another business, Luxury Epoxy / Alston Lyda, so it is not presented as Next Level's Instagram or its own work.
Media recovered from exact files opened through the WhatsApp app:
- next-level-project.mp4 — 2026-09-04 07:04:36, branded vehicle and blue/green recreation court.
- flake-floor.mp4 — 2026-09-04 07:07:23, completed interior decorative flake floor.
- surface-preparation.mp4 — 2026-09-04 07:07:53, garage concrete grinding/preparation.
JPG files are unaltered frames extracted from these originals. No stock or AI-generated project photos.
Other shared clips, including the older 31 August video, were not needed for this selected gallery and are not represented as downloaded.
No fabricated reviews, ratings, warranties, discounts, installation times, credentials, years of experience, chemical performance, or service radius.
All calls to action open a visitor-initiated conversation; no messages sent to Juanca.

Redesign: the hero garage-inspiration.png is an AI-generated architectural visualization, visibly labeled DESIGN INSPIRATION / AI VISUALIZATION. It is not represented as a client project. Actual project videos remain unchanged. Barlow Condensed 800 and Manrope 400/700 fonts downloaded from Google Fonts, served locally. Brand typography is an approximation of the supplied vehicle lettering; vivid blue and red accents follow that branding.

Editorial refinement references (design/content organization only; no client claims or assets copied): Black Diamond Garages epoxy-floor-coating; Epoxy Pros; San Diego Premier Epoxy; Park via Awwwards; Riddle Epoxy; GarageFloorCoating.com. Applied material closeups, clear photo hierarchy, offset project gallery, and shorter copy.

Hero image replaced with bright-garage-inspiration.png: original AI architectural inspiration with silver-gray flake floor, oak cabinetry and natural light. Label preserved; no changes to real project media.

Optimisation pass: no content, claim, or subject changed. Only encoding and layout.
- Every photo is now served as AVIF with a WebP fallback, re-encoded from the same originals. The originals moved to media-src/ (not deployed) and the JPG frames are regenerated from the untouched MP4s by scripts/prepare-media.py.
- og-image.jpg is a 1200x630 crop of the same AI hero visualisation, framed to match the desktop hero. It is the link-preview image, so it carries the same DESIGN INSPIRATION status as the hero; it is not presented as a client project.
- Fonts converted from TTF to WOFF2 and subset to Latin. Same Barlow Condensed 800 and Manrope 400/700 from Google Fonts.
- The service-strip separator was an asterisk glyph absent from both brand fonts, so it rendered in whatever fallback the OS chose. It is now drawn in CSS.
- Structured data (HomeAndConstructionBusiness) declares only what is verified above: name, description, telephone, locality/region/country, and the Facebook page. No opening hours, ratings, reviews, price range, geo coordinates, street address, or service radius — none of those are confirmed.
# Client update — September 8, 2026

Reviewed the Juanca conversation in WhatsApp Desktop. The client supplied the actual blue/orange logo, requested a photo gallery, and supplied a large interior project's before/during/finished views plus residential, porch, and concrete-overlay videos. No messages were sent.

- Original logo: `media-src/next-level-logo-original.jpeg`; only white margins are trimmed in the web derivative.
- Gallery photos: `hall-before.jpeg`, `porch-finish.jpeg`, and WhatsApp images dated September 8 at 6:50:32 AM (coating underway) and 7:01:50 AM (porch detail).
- Six new video originals are retained in `media-src/`. Their web versions are `residential-walkthrough`, `interior-finish`, `hall-preparation`, `hall-finished`, `porch-walkthrough`, and `concrete-overlay` in `public/media/`.
- The completed hall still is extracted from the client's finished-interior video. The separate `hall-finished` walkthrough shows the team still working and is labeled as coating in progress on the page.
- `scripts/prepare-juanca-media.py` generates AVIF/WebP images and MP4 fast-start containers without re-encoding the supplied video/audio. Review contact sheets stay in ignored `work/`.
- The existing AI inspiration hero remains labeled as a visualization. It is not included in the real-project gallery.
