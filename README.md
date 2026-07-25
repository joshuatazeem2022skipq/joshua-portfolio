# Joshua Tazeem — Portfolio

Premium dark-mode portfolio for a Software Architect / Full-Stack System Design profile.

## Stack

- Next.js 16 (App Router)
- React 19 + TypeScript
- Tailwind CSS 4
- Framer Motion + GSAP
- Three.js / React Three Fiber / Drei
- Lenis smooth scroll
- React Icons

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Content source

All copy is driven by `src/lib/resume-data.ts`, extracted from `Joshua.pdf`.

To update experience, skills, or contact details, edit that file only.

Resume PDF is served from `public/resume/Joshua.pdf`.

## Scripts

- `npm run dev` — development server
- `npm run build` — production build
- `npm run start` — serve production build
- `npm run lint` — ESLint

## Credits

Planet and Milky Way texture maps from [Solar System Scope](https://www.solarsystemscope.com/textures/) (CC BY 4.0), based on NASA imagery.

Bottom nav lunar ground: Apollo 16 surface panorama via [Lunar and Planetary Institute](https://www.lpi.usra.edu/resources/apollopanoramas/) (NASA public domain), cropped to grey terrain only.

## Deploy

Optimized for Vercel. Set the production URL in `src/lib/constants.ts` (`siteConfig.url`) for accurate sitemap and Open Graph URLs.
