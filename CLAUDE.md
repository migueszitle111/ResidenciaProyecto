# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**MEDXpro** is a Next.js 14 full-stack SaaS platform for clinical neurological diagnostics (electrodiagnosis). Healthcare professionals use it to generate, customize, and export neurological diagnostic reports (PDF), manage subscriptions, and access educational content.

## Commands

```bash
npm run dev            # Start development server (localhost:3000)
npm run build          # Production build
npm run start          # Serve production build
npm run lint           # Run ESLint
npm run build:pdf-css  # Rebuild tailwind.pdf.css — run this after any CSS/Tailwind change that affects PDF output
```

No test runner is configured in this project.

## Architecture

### Tech Stack
- **Framework**: Next.js 14 App Router — mixed `.js` / `.jsx`, no TypeScript source files (despite `jsconfig.json`)
- **Styling**: Tailwind CSS + Framer Motion; custom font `LuxoraGrotesk` defined in `tailwind.config.js`
- **Auth**: NextAuth.js v4 — credentials (email/password bcrypt) + QR-based mobile-to-web login
- **Database**: MongoDB Atlas via Mongoose (`lib/mongodb.js`) — connection singleton cached on `globalThis`
- **File Storage**: Supabase Storage — server client: `lib/supabaseadmin.js`; browser client: `lib/supabaseBrowser.js`
- **Payments**: Stripe (live keys in `.env`)
- **PDF Generation**: `pdf-lib` + `@pdf-lib/fontkit` — server-side only, via `/api/pdf/generate-pdf/*` routes
- **Path alias**: `@/*` → project root (`jsconfig.json`)

### Key Directories

| Path | Purpose |
|---|---|
| `app/api/` | All Next.js API routes |
| `app/api/auth/` | NextAuth handler, QR login (init/approve/status/revoke), password reset |
| `app/Reporte/Tipos/` | Core feature — one subfolder per neurological report type (12 types) |
| `app/Educacion/` | Courses, congresses, diplomados |
| `app/Monitoreo/` | Neuromuscular monitoring / intraoperative feature |
| `app/s/[slug]/` | Public share link viewer |
| `components/` | Shared UI: Header, Footer, LandingPage, PageTransition, QrSessionGuard |
| `lib/api/` | `crud.js`, `storage.js`, `schemas.js` (Zod), `security.js`, `qr-login.js` |
| `models/` | Mongoose schemas: `user.js`, `webQrLoginChallenge.js`, education models |
| `src/context/` | React Context for client report state |
| `middleware.js` | Auth + rate limiting for all routes |

### Authentication

Two parallel mechanisms:

1. **Standard**: email/password → NextAuth credentials provider → JWT session cookie
2. **QR login**: mobile app scans a challenge URL (`medxpro://web-login?...`) → web browser polls `/api/auth/qr/status` → on mobile approval, a 20-minute web session is created. `components/QrSessionGuard.js` enforces expiry on every protected page render.

API routes accept both NextAuth session cookies **and** mobile Bearer JWT tokens (verified with `MOBILE_JWT_SECRET`). The helper `getAuthenticatedRequestUser()` in `lib/api/security.js` handles both transparently.

The separate Express backend lives at `https://backendmedxpro-tef2.onrender.com` and shares `MOBILE_JWT_SECRET` for token validation.

### Protected Routes

`middleware.js` blocks unauthenticated access to page routes `/Perfil`, `/Educacion`, `/Reporte`, `/Tecnicas`, `/Monitoreo` and most `/api/` routes. Admin-only API prefixes: `/api/temarios`, `/api/share/_debug`.

### Report System (Core Feature)

`app/Reporte/Tipos/` contains 12 neurological report types:
`Auditiva`, `Visual`, `Somatosensorial`, `Miopatia`, `Motores`, `Neuronopatia`, `Neuropatia`, `Plexopatia`, `Polineuropatia`, `Radiculopatia`, `Trigeminofacial`, `Union_Neuromuscular`

Each type has: `page.js` (route), `ReportFace.jsx` (interactive UI), `MenuBotones.jsx` (action bar), `Style.css`.

**State** is managed via React Context (`src/context/`):
- `reportContext.jsx` — conclusions array + button disable flags
- `reportContextRadiculopatia.jsx` — variant for Radiculopatia (value/title tracking)
- `checkboxContext.jsx` — 96 boolean items (A1–A96) for left/right side anatomy
- `backgroundContext.jsx` — active background image toggles
- `DropContext.jsx` / `DropContextR.jsx` — drag-drop items per report

**PDF export flow**: client POSTs to `/api/pdf/generate-pdf/<type>` → server fetches a base PDF template from the Express backend → overlays anatomy images using `pdf-lib` → returns binary PDF. Run `npm run build:pdf-css` after any Tailwind change affecting print output.

### File Sharing

`/api/share/` handles secure patient report delivery:
1. `POST /api/share/init` → creates a `share_links` row in Supabase Postgres with a unique `nanoid` slug
2. `POST /api/share/complete` → attaches files (from Supabase Storage) to the link
3. Public viewer at `/s/[slug]` fetches signed download URLs via `/api/share/signed/[slug]/[fileId]`
4. `POST /api/share/purge` → deletes the link and all associated files

### Supabase Storage Buckets

| Bucket env var | Bucket name | Contents |
|---|---|---|
| `SHARE_BUCKET` | `report-packages` | Diagnostic report files |
| `DEFAULT_STORAGE_BUCKET` | `monitoreo-packages` | EMG/monitoring data |
| — | `reportesnormales-packages` | Standard report files |
| `PUBLIC_ASSETS_BUCKET` | `assets` | Public logos and images |

`lib/supabaseadmin.js` exposes `getBucketFromPath()` to route a storage path to the correct bucket.

### Rate Limiting

In-memory rate limiting (stored on `globalThis`) is applied in both `middleware.js` and individual API routes via `lib/api/security.js`. Key limits: register 5/15 min by IP, login 10/15 min by IP, PDF generation 40/10 min by user, share operations 60/10 min by user.

### Input Validation & Security

All API mutations go through `parseJsonBody()` in `lib/api/security.js`, which validates against a Zod schema from `lib/api/schemas.js` and recursively strips MongoDB operators (`$`, `.`) via `sanitizeDeep()`. Use `requireAuthenticatedUser()` / `requireAdminUser()` guards at the top of every API route handler.

### Environment Variables

Use `.env.local` in development to override production URLs:
```
NEXTAUTH_URL=http://localhost:3000
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

Required secrets: `MONGODB_URI`, `NEXTAUTH_SECRET`, `MOBILE_JWT_SECRET`, `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, `STRIPE_SECRET_KEY`.

`.env` (production values) is listed in `.gitignore` — never commit it.

### Pending Work

See `PENDIENTES.txt` at the project root for the current task list.
