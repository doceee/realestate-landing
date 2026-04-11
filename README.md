# Maison & Co. — Nuxt 3 Real Estate Landing

Luxury real estate landing page built with Instrument Serif, Tailwind CSS, and custom video logic. Supports English and Polish with URL-based locale switching (`/en/`, `/pl/`).

## 🚀 Getting started

```bash
npm install
npm run dev   # http://localhost:3000
```

## 📁 Structure

```
realestate/
├── i18n/locales/
│   ├── en.json                       # English UI strings
│   └── pl.json                       # Polish UI strings
├── assets/css/index.css              # Google Font import + Tailwind + .glass, .reveal, .line-draw
├── components/
│   ├── AppNav.vue                    # Liquid-glass pill, language switcher dropdown
│   ├── HeroSection.vue               # Video bg + requestAnimationFrame crossfade loop
│   ├── AboutSection.vue              # Split layout, dot-matrix accent, float card
│   ├── FeaturedVideoSection.vue      # Dark bg, gold-frame video player, progress bar
│   ├── PhilosophySection.vue         # Editorial quote, three pillars, line-draw rules
│   ├── ServicesSection.vue           # 2×3 hover grid, gold top-line, animated arrow
│   └── AppFooter.vue
├── composables/useReveal.ts          # IntersectionObserver for .reveal / .line-draw
├── pages/index.vue
├── tailwind.config.ts                # Instrument Serif, custom colors, 15+ animations
└── nuxt.config.ts                    # i18n config, route rules, modules
```

## 🌐 i18n

The app uses `@nuxtjs/i18n` v10 with `strategy: 'prefix'`:

| URL | Locale |
|-----|--------|
| `/en/` | English (default) |
| `/pl/` | Polish |

Visiting `/` redirects to `/en/` automatically (Nitro route rule).

**Language switcher:** dropdown in the top navigation bar; pill buttons in the mobile drawer.

**Editing translations:** all UI strings live in `i18n/locales/en.json` and `i18n/locales/pl.json`. No code changes needed to update copy.

## 🎬 Video fade logic (HeroSection.vue)

- `canplay` → `fadeTo(0, 1, 500ms)` — fade in via rAF
- `timeupdate` → when `duration - currentTime ≤ 0.55s` → `fadeTo(current, 0, 500ms)`
- `ended` → `currentTime = 0`, `play()` → crossfade loop (no `loop` attribute)
- Animation via `requestAnimationFrame` with ease-in-out quad

## ✨ Tailwind animations

| Class                  | Effect                                          |
|------------------------|-------------------------------------------------|
| `animate-slide-up`     | Hero headline slides up from below             |
| `animate-fade-up`      | Hero elements fade + translateY                |
| `animate-nav-in`       | Navbar slides in from top                      |
| `animate-float-slow`   | Gentle float (7s loop)                         |
| `.line-draw`           | Horizontal lines draw left-to-right            |
| `.reveal`              | Scroll-triggered fadeUp (IntersectionObserver) |
| `.reveal-scale`        | Scroll-triggered scale 0.94 → 1               |
| `.glass`               | Liquid-glass effect (blur + border)            |
| `.text-shimmer`        | Gold shimmer on text                           |
| `d-100…d-800`          | Transition/animation delay utilities           |

## 🎨 Customization

- **Colors:** edit `stone` and `gold` in `tailwind.config.ts`
- **Video URL:** change `VIDEO_URL` in `HeroSection.vue`
- **Content / copy:** edit `i18n/locales/en.json` and `i18n/locales/pl.json`
- **Fonts:** `@import` in `assets/css/index.css` — swap for any Google Font
