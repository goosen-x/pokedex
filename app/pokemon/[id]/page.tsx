import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { Header } from '@/components/shared/header';
import { PokemonDetail } from '@/components/pokemon/pokemon-detail';
import { CompareDialog } from '@/components/pokemon/compare-dialog';
import { getQueryClient } from '@/lib/query-client';
import { prefetchPokemonDetail } from '@/lib/prefetch-pokemon';

interface PokemonPageProps {
  params: Promise<{ id: string }>;
}

export default async function PokemonPage({ params }: PokemonPageProps) {
  const { id } = await params;
  const queryClient = getQueryClient();

  // Prefetch Pokemon detail data on server
  await prefetchPokemonDetail(queryClient, id);

  return (
    <>
      <Header />
      <HydrationBoundary state={dehydrate(queryClient)}>
        <PokemonDetail id={id} />
        <CompareDialog />
      </HydrationBoundary>
    </>
  );
}
