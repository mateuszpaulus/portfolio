# Mateusz Paulus — Portfolio

A high-performance, bilingual developer portfolio built with Next.js 16, TypeScript, and Tailwind CSS v4. Features WebGL effects, scroll-driven animations, PWA support, and Lighthouse scores of 95+.

[![CI](https://github.com/mateuszpaulus/portfolio/actions/workflows/ci.yml/badge.svg)](https://github.com/mateuszpaulus/portfolio/actions)
[![Lighthouse Performance](https://img.shields.io/badge/Lighthouse-98%2F100-4caf50?logo=lighthouse)](https://paulus.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-strict-3178c6?logo=typescript)](https://www.typescriptlang.org/)
[![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=nextdotjs)](https://nextjs.org/)

---

## Features

- **Bilingual (PL / EN)** — full i18n via next-intl v4, locale-aware routing, SEO alternates
- **WebGL background** — Three.js shader with simplex noise, mouse-reactive, auto-disabled on mobile and reduced-motion
- **Scroll-driven CSS animations** — zero JS for visual effects where possible (`@scroll-timeline`, `animation-timeline`)
- **Page View Transitions** — native `document.startViewTransition` for project navigation
- **Interactive globe** — Three.js sphere with OrbitControls, orbital ring, particle cloud; CSS fallback on mobile
- **Custom cursor + Magnetic buttons** — Framer Motion spring, desktop-only
- **Typewriter effect** — looping role titles in the Hero
- **Easter egg** — Konami Code triggers canvas-confetti modal with keyboard hint UI
- **Contact form** — react-hook-form + Zod validation, Resend email API, rate limiting, honeypot
- **Performance section** — animated Lighthouse circles, Web Vitals cards, animated counters
- **PWA** — service worker with three cache strategies, offline page, full icon set
- **Dynamic OG images** — Edge Runtime `/api/og`, locale-aware, per-project images
- **CI/CD** — GitHub Actions: TypeScript check, ESLint, build, Lighthouse CI budget

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16.2 (App Router) |
| Language | TypeScript 5 (strict) |
| Styling | Tailwind CSS v4 + shadcn/ui (Nova/Radix) |
| Animations | Framer Motion v12 + CSS scroll-driven |
| 3D / WebGL | Three.js 0.183 + three-stdlib |
| i18n | next-intl v4 |
| Forms | react-hook-form + Zod |
| Email | Resend |
| Font | Geist (next/font) |
| Deploy | Vercel |

---

## Getting Started

### Prerequisites

- Node.js 20+
- npm 10+

### Installation

```bash
git clone https://github.com/mateuszpaulus/paulus-portfolio.git
cd paulus-portfolio
npm install
```

### Environment variables

Copy the example file and fill in your values:

```bash
cp .env.example .env.local
```

```env
RESEND_API_KEY=re_...
CONTACT_TO_EMAIL=you@example.com
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) — the app redirects to `/pl` or `/en` based on browser locale.

---

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start development server |
| `npm run build` | Production build |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run type-check` | TypeScript check (no emit) |
| `npm run analyze` | Bundle analyzer |
| `npm run lighthouse` | Run Lighthouse report on localhost |

---

## Project Structure

```
app/
  [locale]/         # All pages (layout, Hero → Contact)
  api/
    contact/        # POST handler — Resend + rate limit
    og/             # Dynamic OG image (Edge Runtime)
  offline/          # PWA offline fallback page

components/
  layout/           # Navbar, Footer, ThemeProvider
  sections/         # Hero, About, Projects, Experience, Contact …
  common/           # SectionHeading, TechTag, ThemeToggle …
  ui/               # shadcn/ui primitives

features/
  projects/         # Types, hooks, ProjectCard, ProjectModal
  contact/          # ContactForm, validation schema
  performance/      # LighthouseCircle, WebVitalCard
  experiments/      # ThreeSphere, ShaderBackground, CustomCursor …

content/            # JSON data (projects, decisions, performance)
messages/           # en.json, pl.json — all UI text
lib/i18n/           # next-intl navigation + request config
hooks/              # useInView, useMediaQuery, useAnimatedCounter …
public/
  icons/            # PWA icons (8 sizes)
  sw.js             # Service Worker
```

---

## Internationalisation

Routes: `/pl/*` and `/en/*`. Locale is resolved via `proxy.ts` (Next.js 16 — no `middleware.ts`).

All UI text lives in `messages/en.json` and `messages/pl.json`. No hardcoded strings in components.

---

## Performance

| Metric | Score |
|---|---|
| Lighthouse Performance | 98 |
| Lighthouse Accessibility | 100 |
| Lighthouse Best Practices | 100 |
| Lighthouse SEO | 100 |
| LCP | 1.2s |
| CLS | 0.01 |
| INP | 45ms |
| JS bundle (gzip) | ~87 KB |

Key techniques: Server Components by default, dynamic import for Three.js, CSS-only scroll animations, `next/image`, `next/font`, immutable cache headers for static assets.

---

## Deployment

The project is configured for **Vercel**. Security headers, caching rules, and redirects are defined in `vercel.json`.

Lighthouse CI runs automatically on every pull request via GitHub Actions with the following budgets:

- Performance ≥ 90
- Accessibility ≥ 95
- SEO ≥ 95
- LCP ≤ 2.5s
- CLS ≤ 0.1

---

## Easter Egg

Type the **Konami Code** (`↑ ↑ ↓ ↓ ← → ← → B A`) anywhere on the page. A hint UI is visible between the Contact section and the footer.

---

## License

MIT — feel free to use as inspiration. Please do not deploy a direct copy as your own portfolio.

---

## Contact

**Mateusz Paulus** — [paulus.m.mateusz@gmail.com](mailto:paulus.m.mateusz@gmail.com)
