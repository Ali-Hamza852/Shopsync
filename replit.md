# Workspace

## Overview

pnpm workspace monorepo using TypeScript. Contains an AI-powered E-Commerce Vector Search Engine frontend.

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
- **Frontend**: React + Vite + Tailwind CSS + Framer Motion
- **UI**: Shadcn components, Lucide React icons

## Key Commands

- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- `pnpm --filter @workspace/api-server run dev` — run API server locally

## Artifacts

### vector-search (AI Vector Search Engine)
- **Preview path**: `/`
- **Location**: `artifacts/vector-search/`
- **Description**: A modern dark-mode AI product search UI that calls the Hugging Face HNSW vector search API (`https://alihamza852-fyp-project-hnsw.hf.space/search`).
- **Key pages**:
  - `src/pages/SearchPage.tsx` — Main hero + results page
- **Key components**:
  - `src/components/SearchBar.tsx` — LLM-style search input with suggestions dropdown
  - `src/components/ClusterCard.tsx` — Product group card with match score badge, expandable listings
  - `src/components/ProductImage.tsx` — Lazy image loader using the `/api/fetch-image` proxy
  - `src/components/SkeletonCard.tsx` — Animated loading skeleton
  - `src/components/HeroBackground.tsx` — Animated gradient + floating particles backdrop
- **API utilities**:
  - `src/lib/api.ts` — `searchProducts()`, `fetchProductImage()`, `getPlatformName()`, `getPlatformIcon()`
  - `src/lib/types.ts` — TypeScript interfaces for the search API response

### api-server (Express API)
- **Preview path**: `/api`
- **Location**: `artifacts/api-server/`
- **Routes**:
  - `GET /api/healthz` — Health check
  - `GET /api/fetch-image?url=<url>` — Server-side proxy that fetches a product URL and extracts the `og:image` meta tag to avoid client-side CORS issues

## Design System
- Deep dark background: `hsl(222, 47%, 5%)`
- Primary accent: Electric Blue `hsl(224, 76%, 60%)`
- Secondary accent: Neon Purple `hsl(270, 60%, 55%)`
- Tertiary accent: Cyan `hsl(192, 80%, 52%)`
- Fonts: Inter (body), Space Grotesk (headings)

See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details.
