import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { Header } from '@/components/shared/header';
import { PokemonGrid } from '@/components/pokemon/pokemon-grid';
import { FloatingFilterBar } from '@/components/pokemon/floating-filter-bar';
import { getQueryClient } from '@/lib/query-client';
import { prefetchPokemonList } from '@/lib/prefetch-pokemon';

export const metadata = {
  title: 'Pokedex | Browse All Pokemon',
  description: 'Browse, search, and filter through all Pokemon. Find your favorite Pokemon by name or type.',
};

export default async function PokedexPage() {
  const queryClient = getQueryClient();

  // Prefetch Pokemon list on server
  await prefetchPokemonList(queryClient);

  return (
    <>
      <Header />
      <HydrationBoundary state={dehydrate(queryClient)}>
        <div className="container mx-auto px-4 pt-4 pb-24">
          <PokemonGrid />
        </div>
        <FloatingFilterBar />
      </HydrationBoundary>
    </>
  );
}
