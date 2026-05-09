# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**MEDXpro** is a Next.js 14 full-stack SaaS platform for clinical neurological diagnostics (electrodiagnosis). It serves healthcare professionals who generate, customize, and export neurological diagnostic reports (PDF), manage subscriptions, and access educational content.

## Commands

```bash
npm run dev          # Start development server (localhost:3000)
npm run build        # Production build
npm run start        # Serve production build
npm run lint         # Run ESLint
npm run build:pdf-css  # Build Tailwind CSS output for Puppeteer PDF rendering
```

There are no test files or test runner configured in this project.

## Architecture

### Tech Stack
- **Framework**: Next.js 14 App Router (mixed `.js` and `.jsx` — no TypeScript source files despite `jsconfig.json`)
- **Styling**: Tailwind CSS + Framer Motion; custom font `LuxoraGrotesk` defined in `tailwind.config.js`
- **Auth**: NextAuth.js v4 — credentials (email/password bcrypt) + QR-based mobile-to-web login
- **Database**: MongoDB Atlas via Mongoose (`lib/mongodb.js`)
- **File Storage**: Supabase Storage (server: `lib/supabaseadmin.js`, browser: `lib/supabaseBrowser.js`)
- **Payments**: Stripe (live keys in `.env`)
- **PDF Generation**: Puppeteer (server-side), PDFLib, jsPDF, html2pdf
- **Path alias**: `@/*` maps to the project root (`jsconfig.json`)

### Key Directories

| Path | Purpose |
|---|---|
| `app/api/` | All Next.js API routes |
| `app/api/auth/` | NextAuth handler, QR login (init/approve/status/revoke), password reset |
| `app/Reporte/Tipos/` | Core feature — one subfolder per neurological report type |
| `app/Educacion/` | Courses, congresses, diplomados |
| `app/Monitoreo/` | Neuromuscular monitoring feature |
| `components/` | Shared UI (Header, Footer, LandingPage, PageTransition, QrSessionGuard) |
| `lib/api/` | `crud.js` (DB ops), `storage.js` (Supabase), `schemas.js` (Zod validation), `security.js`, `qr-login.js` |
| `models/` | Mongoose schemas: `user.js`, `webQrLoginChallenge.js`, course/congress/diplomado models |
| `src/context/` | React Context for client state: `reportContext.jsx`, `checkboxContext.jsx`, `backgroundContext.jsx`, `DropContext.jsx` |
| `middleware.js` | Protects routes; validates both NextAuth sessions and QR sessions |

### Authentication Flow

Two parallel auth mechanisms exist:

1. **Standard login**: Email/password → NextAuth credentials provider → session cookie
2. **QR login**: Mobile app generates a challenge → web polls `/api/auth/qr/status` → on approval, creates a 20-minute web session. `components/QrSessionGuard.js` enforces QR session expiry on protected pages.

The mobile app communicates with the separate Express backend at `https://backendmedxpro-tef2.onrender.com`. The `MOBILE_JWT_SECRET` env var is shared between this web app and that backend for token validation.

### Protected Routes

Middleware (`middleware.js`) blocks unauthenticated access to: `/Perfil`, `/Educacion`, `/Reporte`, `/Tecnicas`, `/Monitoreo`.

### Report System

The core feature lives in `app/Reporte/Tipos/`. Each subdirectory is a distinct neurological report type (Auditiva, Miopatia, Motores, Radiculopatia, Plexopatia, etc.). Report state is managed via `src/context/reportContext.jsx` and `checkboxContext.jsx`. PDF export is handled through `/api/pdf/generate-pdf/` using Puppeteer server-side; `npm run build:pdf-css` must be run to regenerate `tailwind.pdf.css` when styles change.

### Supabase Storage Buckets

| Bucket | Contents |
|---|---|
| `report-packages` | Diagnostic report files |
| `monitoreo-packages` | EMG/monitoring data |
| `reportesnormales-packages` | Standard report files |
| `assets` | Public logos and images |

### Environment Variables

Development uses `.env.local` to override production URLs:
```
NEXTAUTH_URL=http://localhost:3000
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

Required secrets (never commit): `MONGODB_URI`, `NEXTAUTH_SECRET`, `MOBILE_JWT_SECRET`, `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, `STRIPE_SECRET_KEY`.

### Pending Work

See `PENDIENTES.txt` at the project root for the prioritized task list (typography fixes, Plexopatia multi-select bugs, Radiculopatia UI, planned removal of Dermatomas section, login/registration design overhaul, Gmail login integration).
