# Experts Live Saudi 2026 — Landing Page

Bilingual (English / Arabic) landing page for **Experts Live Saudi 2026**, 29–30 November 2026, PNU Conference & Convention Center, Riyadh. Includes the Demo Day application and investor-invite forms, stored in PostgreSQL.

- `/en` — English (LTR) · `/ar` — Arabic (RTL) · `/` redirects by browser language
- Facts and copy come from the official agent kit (`EXPERTS-LIVE-SAUDI.md`, `BRAND.md`). Unconfirmed items are listed in [`docs/OPEN-ITEMS.md`](docs/OPEN-ITEMS.md) and tagged `// TBC:` in the code.
- Planning and design rationale: [`docs/DISCOVERY.md`](docs/DISCOVERY.md)

## Stack

| | |
|---|---|
| Framework | Next.js 16 (App Router) + TypeScript, `output: 'standalone'` |
| Styling | CSS Modules + design tokens in `src/styles/tokens.css` (no UI library) |
| Fonts | Montserrat, IBM Plex Sans Arabic, Reem Kufi — self-hosted via `next/font/local` |
| Forms | Route handler `POST /api/applications`, Zod validation shared by client and server |
| Database | PostgreSQL 16 (`pg`), SQL migrations in `db/migrations` |

## Run locally

```bash
pnpm install
cp .env.example .env            # set DATABASE_URL and IP_HASH_SALT

# Option A: Postgres in Docker
docker compose up -d db

pnpm db:migrate                 # creates the applications table
pnpm dev                        # http://localhost:3000
```

Production build: `pnpm build && pnpm start` (runs the standalone server).

Everything in Docker: `docker compose up --build` (runs migrations on start).

> `NEXT_PUBLIC_SITE_URL` is read at **build** time (canonical links, Open Graph, sitemap). Set it before `pnpm build`.

## Form data

Submissions go to the `applications` table:

| Column | Notes |
|---|---|
| `kind` | `startup` or `investor` |
| `status` | `new` by default (`reviewing`, `accepted`, `declined`, `spam`) |
| `full_name`, `email`, `phone`, `organisation` | Common contact fields |
| `details` (JSONB) | Startup: website, sector, stage, pitch, interests · Investor: role, investorType, focusSectors |
| `ip_hash` | Salted SHA-256 of the visitor IP. Raw IPs are never stored |

Export to CSV (opens correctly in Excel, including Arabic):

```bash
pnpm db:export            # all
pnpm db:export startup    # or: investor
```

Protection: Zod validation on both sides, a honeypot field, a 10 KB body limit and an in-memory rate limit (5 requests/minute per IP). If the app runs on more than one instance, move the rate limit to the database or Redis.

## Project structure

```
src/
  app/
    [locale]/        layout (html lang/dir, fonts, metadata) and page
    api/applications POST handler
    robots.ts, sitemap.ts
  components/        one component + CSS module per section
  content/           en.ts, ar.ts (all copy), types.ts
  lib/               site constants, validation, db pool, rate limit, logos
  styles/            tokens.css, globals.css
  proxy.ts           "/" → /ar or /en
db/migrations/       SQL migrations
scripts/             migrate, export-csv, postbuild
public/              logos, venue photo, og image, icons
```

## Editing copy

All text lives in `src/content/en.ts` and `src/content/ar.ts` (same shape, typed by `types.ts`). Rules from the brand kit:

- Never call it a "Microsoft event". It is **Experts Live — Digital Conference**.
- Don't add sponsors, prices, speaker titles or partner statuses that aren't in the official kit. Mark anything new as *to be confirmed*.
- In Arabic strings, wrap number ranges like `29–30` in `⁦…⁩` so they keep their order in RTL.

## Brand rules implemented

- PNU logo is always first, top right (both languages). The Experts Live Saudi wordmark sits on a white rounded chip.
- Colours, type and logo order from `BRAND.md` (v2 "night stage").
- English left / Arabic right in the hero on both pages.
- Approved footer line used verbatim.

## Quality checklist

- Semantic landmarks, skip link, visible focus ring, ARIA tabs for "Find your path", labelled form fields with inline errors
- `prefers-reduced-motion` respected (one orchestrated hero animation only)
- Responsive at 375 / 768 / 1024 / 1440
- Event JSON-LD, Open Graph, `hreflang` alternates, sitemap, robots
