# Pokedex

Modern Pokedex application built with Next.js 16, React 19, and TypeScript.

## Tech Stack

- **Framework**: Next.js 16.1.1 (App Router)
- **UI**: React 19.2.3
- **Styling**: Tailwind CSS 4 + shadcn/ui + Radix UI
- **State Management**: Zustand 5 (client state) + TanStack React Query 5 (server state)
- **Language**: TypeScript 5
- **Icons**: Lucide React

## Features

- Browse Pokemon with infinite scroll
- Search Pokemon by name
- Filter by Pokemon type (18 types)
- Compare two Pokemon side-by-side
- View detailed Pokemon information (stats, evolution chain, abilities)
- **"Who's That Pokemon?" Quiz** - guess Pokemon by silhouette
- Responsive design (mobile-first)
- Dark mode support

## Routes

| Route | Description |
|-------|-------------|
| `/` | Home page with Pokemon grid, search, and type filter |
| `/pokemon/[id]` | Pokemon detail page with stats, evolution, moves |
| `/quiz` | "Who's That Pokemon?" silhouette guessing game |

## Project Structure

```
pokedex/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout with providers
│   ├── page.tsx           # Home page with Pokemon grid
│   ├── globals.css        # Global styles and CSS variables
│   ├── pokemon/[id]/      # Dynamic Pokemon detail page
│   └── quiz/              # Quiz game page
│
├── components/
│   ├── ui/                # shadcn/ui components (Button, Card, Dialog, etc.)
│   ├── pokemon/           # Pokemon-specific components
│   ├── quiz/              # Quiz game components
│   │   ├── pokemon-card.tsx
│   │   ├── pokemon-grid.tsx
│   │   ├── pokemon-search.tsx
│   │   ├── pokemon-detail.tsx
│   │   ├── compare-dialog.tsx
│   │   ├── evolution-chain.tsx
│   │   └── stats-chart.tsx
│   ├── shared/            # Shared components (Header, TypeFilter)
│   └── providers/         # Context providers (QueryProvider)
│
├── hooks/                  # Custom React hooks
│   ├── use-pokemon-list.ts  # Infinite query for Pokemon list
│   ├── use-pokemon.ts       # Single Pokemon data + species + evolution
│   └── use-debounce.ts      # Debounced callback for search
│
├── lib/
│   ├── api/pokeapi.ts      # PokéAPI integration
│   ├── types/pokemon.ts    # TypeScript types and color schemes
│   └── utils.ts            # Utility functions (cn)
│
├── stores/                 # Zustand stores
│   ├── filter-store.ts     # Search and type filter state
│   ├── compare-store.ts    # Pokemon comparison state
│   └── quiz-store.ts       # Quiz game state (with localStorage persist)
│
└── lib/constants/          # Constants
    └── generations.ts      # Pokemon generation ranges (Gen 1-9)
```

## Getting Started

### Prerequisites

- Node.js 18+
- npm/yarn/pnpm

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm run start
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

## API

This project uses [PokéAPI](https://pokeapi.co/) - a free RESTful Pokemon API.

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |

## Adding shadcn/ui Components

```bash
npx shadcn@latest add <component-name>
```

## License

MIT
