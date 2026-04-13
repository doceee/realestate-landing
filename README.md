# Maison & Co. — Nuxt 3 Real Estate Landing

Luxury real estate landing page built with Instrument Serif, Tailwind CSS, and custom video logic. Supports English and Polish with URL-based locale switching (`/en/`, `/pl/`).

## 🚀 Getting started

```bash
npm install
npm run dev   # http://localhost:3000
```

## 🧑‍💼 Content editing with Keystatic

Keystatic is integrated directly into the Nuxt app and manages the existing locale JSON files used by `@nuxtjs/i18n`.

- Admin UI: `/keystatic`
- API routes: `/api/keystatic/*`
- Managed files:
    - `i18n/locales/en.json`
    - `i18n/locales/pl.json`

Run the app locally and open `http://localhost:3000/keystatic` to edit homepage copy through the CMS UI.

In production, access to `/keystatic` and `/api/keystatic/*` is protected with HTTP Basic Auth.

```bash
KEYSTATIC_BASIC_AUTH_USER=admin
KEYSTATIC_BASIC_AUTH_PASSWORD=admin
```

If these variables are missing in production, Keystatic returns `503` instead of exposing the admin UI publicly.
