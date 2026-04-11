# Maison & Co. — Nuxt 3 Real Estate Landing

Luxury real estate landing page z Instrument Serif, Tailwind CSS i własną logiką video.

## 🚀 Uruchomienie

```bash
npm install
npm run dev   # http://localhost:3000
```

## 📁 Struktura

```
realestate/
├── assets/css/index.css          # Google Font import + Tailwind + .glass, .reveal, .line-draw
├── components/
│   ├── AppNav.vue                 # Liquid-glass pill, max-w-5xl, animated underlines
│   ├── HeroSection.vue            # Video bg + requestAnimationFrame crossfade loop
│   ├── AboutSection.vue           # Split layout, dot-matrix accent, float card
│   ├── FeaturedVideoSection.vue   # Dark bg, gold-frame video player, progress bar
│   ├── PhilosophySection.vue      # Editorial quote, three pillars, line-draw rules
│   ├── ServicesSection.vue        # 2×3 hover grid, gold top-line, animated arrow
│   └── AppFooter.vue
├── composables/useReveal.ts       # IntersectionObserver für .reveal / .line-draw
├── pages/index.vue
├── tailwind.config.ts             # Instrument Serif, custom colors, 15+ animations
└── nuxt.config.ts
```

## 🎬 Video fade logic (HeroSection.vue)

- `canplay` → `fadeTo(0, 1, 500ms)` — fade in za pomocą rAF
- `timeupdate` → gdy `duration - currentTime ≤ 0.55s` → `fadeTo(current, 0, 500ms)`
- `ended` → `currentTime = 0`, `play()` → pętla z crossfade (bez atrybutu `loop`)
- Animacja przez `requestAnimationFrame` z ease in-out quad

## ✨ Tailwind animations

| Klasa                  | Efekt                                      |
|------------------------|--------------------------------------------|
| `animate-slide-up`     | Hero headline wjeżdża z dołu               |
| `animate-fade-up`      | Elementy hero fade + translateY            |
| `animate-nav-in`       | Navbar wjeżdża z góry                      |
| `animate-float-slow`   | Delikatny float (7s loop)                  |
| `.line-draw`           | Poziome linie rysują się od lewej          |
| `.reveal`              | Scroll-triggered fadeUp (IntersectionObs.) |
| `.reveal-scale`        | Scroll-triggered scale 0.94 → 1           |
| `.glass`               | Liquid-glass (blur + border)               |
| `.text-shimmer`        | Gold shimmer na tekście                    |
| `d-100…d-800`          | Transition/animation delay utility         |

## 🎨 Personalizacja

- **Kolory**: edytuj `stone` i `gold` w `tailwind.config.ts`
- **Video URL**: zmień `VIDEO_URL` w `HeroSection.vue`
- **Treść**: edytuj tablice `services`, `pillars`, `values` bezpośrednio w komponentach
- **Fonty**: `@import` w `assets/css/index.css` — zamień na dowolny Google Font
