# System Architecture

## Overview
Project ini menggunakan **Next.js 14 App Router** dengan **TypeScript** dan **Tailwind CSS**. Arsitektur difokuskan pada scalability, maintainability, dan type safety.

## Directory Structure

```
src/
├── app/                    # Next.js App Router (Pages & Routing)
├── components/             # React Components
│   ├── layout/             # Layout components (Header, Footer)
│   ├── ui/                 # Reusable UI components (Button, Input)
│   ├── features/           # Feature-specific components (Forms, Calculators)
│   └── product/            # Domain-specific components (Cards)
├── config/                 # Configuration & Constants (Site, Nav, Contact)
├── data/                   # Static Data Content (Products, Articles)
├── lib/                    # Utilities & Hooks
│   ├── hooks/              # Custom React Hooks
│   └── utils.ts            # Helper functions
├── types/                  # TypeScript Definitions
└── styles/                 # Global Styles
```

## Key Architectural Decisions

### 1. Data Layer Separation
Data statis dipisahkan dari business logic dan type definitions.
- **Location:** `src/data/`
- **Benefit:** Memudahkan update konten tanpa menyentuh kode logic.

### 2. Centralized Configuration
Semua konfigurasi global di-centralize.
- **Location:** `src/config/`
- **Benefit:** Single source of truth untuk navigation, contact info, dan site metadata.

### 3. Type Safety
Menggunakan TypeScript strict mode dengan JSDoc comments.
- **Location:** `src/types/`
- **Benefit:** Better IntelliSense dan self-documenting code.

### 4. Component Hierarchy
Komponen dibagi berdasarkan reuse-level.
- **UI:** Highly reusable, dumb components (Atomic design).
- **Features:** Smart components dengan logic (e.g. CreditSimulator).
- **Layout:** Structural components.

## Tech Stack
- **Framework:** Next.js 14
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Icons:** Lucide React
- **Validation:** Custom Hooks (`useForm`)

## Development Guidelines
1.  Selalu gunakan type definitions dari `@/types`.
2.  Import data dari `@/data`.
3.  Gunakan reusable components dari `@/components/ui`.
4.  Jaga komponen tetap kecil dan terfokus (Single Responsibility).
