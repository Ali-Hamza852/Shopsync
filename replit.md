# Workspace

## Overview

pnpm workspace monorepo using TypeScript. Contains **Shopsync** — an AI-powered e-commerce product search frontend.

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **Package manager**: pnpm
- **TypeScript version**: 5.9
- **API framework**: Express 5
- **Database**: PostgreSQL + Drizzle ORM
- **Validation**: Zod (`zod/v4`), `drizzle-zod`
- **API codegen**: Orval (from OpenAPI spec)
- **Build**: esbuild (CJS bundle)
- **Frontend**: React + Vite (custom CSS with `--t-*` tokens, no Tailwind)
- **Fonts**: Inter (body), Space Grotesk (headings/logo)

## Key Commands

- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- `pnpm --filter @workspace/api-server run dev` — run API server locally

## Artifacts

### shopsync (Main App)
- **Preview path**: `/`
- **Location**: `artifacts/shopsync/`
- **Port**: 25267
- **Description**: AI-powered product search using the Hugging Face HNSW vector search API (`https://alihamza852-fyp-project-hnsw.hf.space/search`). Results grouped by cluster with match score badges, product images, prices, and platform-specific redirect links. Supports dark/light theme toggle.
- **Key pages**:
  - `src/pages/SearchPage.tsx` — Hero + search bar + results page
- **Key components**:
  - `src/components/SearchBar.tsx` — Search textarea with submit button and spinner
  - `src/components/ClusterCard.tsx` — Product group card with match score badge and product grid
  - `src/components/ProductImage.tsx` — Lazy image with fallback SVG
  - `src/components/SkeletonCard.tsx` — Shimmer loading skeleton
  - `src/components/HeroBackground.tsx` — Animated gradient orbs + grid backdrop
- **API utilities**:
  - `src/lib/api.ts` — `searchProducts()`, `getPlatformName()`, `generateRedirectUrl()`, `formatPrice()`, `formatMatchScore()`
  - `src/lib/types.ts` — TypeScript interfaces (`Product`, `GroupData`, `SearchResult`, `SearchResponse`)
  - `src/hooks/use-theme.tsx` — `useTheme()` hook persisting to localStorage
- **CSS**: `src/index.css` — Custom CSS with `--t-*` tokens for light/dark themes (no Tailwind)
- **Favicon**: `public/favicon.jpeg` (from `attached_assets/Profile1_1775394278163.jpeg`)
- **Logo**: `attached_assets/Profile1_1775390001168.jpeg` (used via `@assets` alias)
- **Theme**: Defaults to dark. Toggling adds `.dark`/`.light` to `<html>`. Inline script in `index.html` prevents flash.

### api-server (Express API)
- **Preview path**: `/api`
- **Location**: `artifacts/api-server/`
- **Routes**:
  - `GET /api/healthz` — Health check

## Design System (Shopsync)
- Deep dark background: `#09090f`
- Light background: `#f5f7fa`
- Primary accent (blue): `#3b82f6` / `#60a5fa` (dark mode)
- Price color: `#059669` (light) / `#34d399` (dark)
- Amazon badge: `#f97316` (orange)
- Walmart badge: `#1d4ed8` (blue, light) / `#60a5fa` (dark)

See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details.
