---
name: BPR Bapera Web Development
description: Helper skill for developing the BPR Bapera website, built with Next.js and Sanity CMS.
---

# BPR Bapera Web Development Guide

This skill provides context and instructions for working on the BPR Bapera website project.

## Tech Stack
- **Framework**: Next.js 14
- **CMS**: Sanity CMS
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Language**: TypeScript

## Project Structure
- `src/app`: Next.js App Router pages and layouts
- `src/sanity`: Sanity configuration and schemas
  - `src/sanity/schemaTypes`: Sanity document schemas
- `src/components`: React components
  - `layout/`: `Header`, `Footer`, `PageHeader`
  - `ui/`: reusable primitives like `Button`, `Input`, `Container`, `Section`
  - `features/`: feature components like `CreditSimulator`, `FormPengaduan`, `TableInterest`
  - `product/`: product card components
- `src/config`: app configuration and site constants
- `src/types`: TypeScript definitions
- `src/data`: fallback static data and seed content
- `src/lib`: utilities, hooks, and Sanity query helpers

## Common Tasks

### 1. Running the Development Server
```bash
pnpm install
pnpm dev
```

### 2. Managing Sanity Schemas
Sanity schemas are in `src/sanity/schemaTypes`.
- After modifying a schema, restart the dev server if schema changes do not appear.
- Register new schema types in `src/sanity/schemaTypes/index.ts`.

### 3. Adding New Content Types
1. Create a new schema file in `src/sanity/schemaTypes/`
2. Define the schema with `defineType` and `defineField`
3. Register it in `src/sanity/schemaTypes/index.ts`

### 4. Fetching Data
- Use the GROQ queries in `src/lib/sanity-queries.ts`
- Keep queries scoped to only required fields for performance

## Key Files
- `sanity.config.ts`: Sanity Studio configuration
- `src/app/layout.tsx`: application root layout
- `src/app/robots.ts`: robots configuration
- `src/app/sitemap.ts`: sitemap generation
- `tailwind.config.ts`: Tailwind configuration
- `PRD.md`: product requirements and feature status

## Development Rules
- Use TypeScript for all new code
- Keep components small and single-purpose
- Use `cn()` for Tailwind class composition
- Prefer centralized config values from `src/config`
- Maintain accessibility, responsive design, and semantic structure

## Notes
- Dynamic content is sourced from Sanity with fallback static data in `src/data`
- Product detail pages are implemented for `/produk/kredit/[slug]`
- The contact page currently uses a Google Maps placeholder
- Refer to `PRD.md` for current feature implementation status
