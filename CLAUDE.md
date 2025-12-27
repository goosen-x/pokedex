# Pokedex - Claude Code Instructions

## Project Overview

This is a Pokedex web application built with Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS 4, and shadcn/ui components.

## Tech Stack

- **Next.js 16.1.1** - React framework with App Router
- **React 19.2.3** - UI library
- **TypeScript 5** - Type safety
- **Tailwind CSS 4** - Utility-first CSS (OKHSL color system)
- **shadcn/ui** - Component library (New York style)
- **Radix UI** - Accessible component primitives
- **Zustand 5** - Client-side state management
- **TanStack React Query 5** - Server state and caching
- **Lucide React** - Icons

## Routes

| Route | Description |
|-------|-------------|
| `/` | Home page with Pokemon grid, search, and type filter |
| `/pokemon/[id]` | Pokemon detail page with stats, evolution, moves |
| `/quiz` | "Who's That Pokemon?" silhouette guessing game |

## Project Structure

```
app/
  ├── layout.tsx       → Root layout with QueryProvider
  ├── page.tsx         → Home page (Pokemon grid)
  ├── globals.css      → Global styles + CSS variables
  └── pokemon/
      └── [id]/
          └── page.tsx → Pokemon detail page

components/
  ├── ui/              → shadcn/ui base components
  ├── pokemon/         → Pokemon-specific components
  ├── quiz/            → Quiz game components
  ├── shared/          → Header, TypeFilter
  └── providers/       → QueryProvider

hooks/                 → use-pokemon-list, use-pokemon, use-debounce, use-random-pokemon
lib/
  ├── api/pokeapi.ts   → PokéAPI integration
  ├── types/pokemon.ts → TypeScript types + TYPE_COLORS
  ├── constants/generations.ts → Pokemon generations (Gen 1-9)
  └── utils.ts         → cn() utility

stores/                → filter-store, compare-store, quiz-store (Zustand)
```

## Key Components

| Component | Location | Description |
|-----------|----------|-------------|
| `PokemonGrid` | `components/pokemon/` | Infinite scroll grid with filtering |
| `PokemonCard` | `components/pokemon/` | Card for grid (memoized) |
| `PokemonDetail` | `components/pokemon/` | Full pokemon info page |
| `CompareDialog` | `components/pokemon/` | Side-by-side comparison modal |
| `PokemonSearch` | `components/pokemon/` | Debounced search input |
| `TypeFilter` | `components/shared/` | 18 type filter buttons |
| `Header` | `components/shared/` | Navigation + compare button |
| `QuizGame` | `components/quiz/` | "Who's That Pokemon?" game |
| `PokemonSilhouette` | `components/quiz/` | Silhouette image (CSS filter) |
| `GenerationSelect` | `components/quiz/` | Gen 1-9 filter dropdown |

## Coding Conventions

### Components
- Use functional components with TypeScript
- Prefer named exports for components
- Use `'use client'` directive for client components
- Memoize expensive components with `React.memo`

### Styling
- Use Tailwind CSS classes
- Use `cn()` utility from `@/lib/utils` for conditional classes
- Follow shadcn/ui patterns for new UI components
- Type colors: `TYPE_COLORS` in `lib/types/pokemon.ts`

### State Management
- **Zustand** for client-side state (filters, UI state)
- **React Query** for server data fetching and caching
- Cache Pokemon data for 5-10 minutes

### API
- All API calls go through `lib/api/pokeapi.ts`
- Use React Query hooks for data fetching
- Handle loading and error states

### File Naming
- Components: `kebab-case.tsx` (e.g., `pokemon-card.tsx`)
- Hooks: `use-kebab-case.ts` (e.g., `use-pokemon.ts`)
- Stores: `kebab-case-store.ts` (e.g., `filter-store.ts`)

## Commands

```bash
npm run dev      # Development server (http://localhost:3000)
npm run build    # Production build
npm run start    # Start production
npm run lint     # ESLint check
```

## Adding shadcn/ui Components

```bash
npx shadcn@latest add <component-name>
```

Components will be added to `components/ui/`.

## Important Notes

- PokéAPI base URL: `https://pokeapi.co/api/v2`
- Pokemon images: Use `getPokemonImageUrl()` from pokeapi.ts
- Images config: `next.config.ts` allows `raw.githubusercontent.com`
- Path aliases: `@/*` maps to project root

## Common Tasks

### Add new Pokemon feature
1. Add types to `lib/types/pokemon.ts`
2. Add API function to `lib/api/pokeapi.ts`
3. Create hook in `hooks/` if needed
4. Create component in `components/pokemon/`

### Add new route
1. Create folder in `app/` with `page.tsx`
2. Use async params for dynamic routes: `params: Promise<{ id: string }>`

### Modify filters
Edit `stores/filter-store.ts` for new filter options.
