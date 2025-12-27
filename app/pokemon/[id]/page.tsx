import { PokemonDetail } from '@/components/pokemon/pokemon-detail';
import { CompareDialog } from '@/components/pokemon/compare-dialog';

interface PokemonPageProps {
  params: Promise<{ id: string }>;
}

export default async function PokemonPage({ params }: PokemonPageProps) {
  const { id } = await params;

  return (
    <>
      <PokemonDetail id={id} />
      <CompareDialog />
    </>
  );
}
