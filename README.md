# Maison & Co. — Nuxt 3 Real Estate Landing

Luxury real estate landing page built with Instrument Serif, Tailwind CSS, and custom video logic. Supports English and Polish with URL-based locale switching (`/en/`, `/pl/`).

## Getting started

```bash
npm install
npm run dev   # http://localhost:3000
```

## Content editing with Keystatic

Keystatic CMS is integrated directly into the Nuxt app and manages the locale JSON files used by `@nuxtjs/i18n`.

- Admin UI: `/keystatic`
- Managed files: `i18n/locales/en.json`, `i18n/locales/pl.json`

### Locally

Run the app and open `http://localhost:3000/keystatic`. Changes are saved directly to the JSON files on disk.

### Production

Storage is handled by **Keystatic Cloud** (`cloud` mode). Editors log in with their Keystatic Cloud account — no GitHub account required.

Changes saved in the admin trigger a commit to the `main` branch, which automatically triggers a Vercel redeploy.

To invite a new editor: keystatic.cloud → project settings → Members → Invite.

## Environment variables

| Variable                  | Required | Description                                                                             |
| ------------------------- | -------- | --------------------------------------------------------------------------------------- |
| `NUXT_PUBLIC_BASE_URL`    | no       | Public URL of the site (e.g. `https://example.vercel.app`) — used for SEO hreflang tags |
| `KEYSTATIC_CLOUD_PROJECT` | no       | Keystatic Cloud project ID (e.g. `team/project`)                                        |
