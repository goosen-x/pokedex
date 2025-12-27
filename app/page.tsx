import { TypeFilter } from '@/components/shared/type-filter';
import { PokemonSearch } from '@/components/pokemon/pokemon-search';
import { PokemonGrid } from '@/components/pokemon/pokemon-grid';

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-6">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <PokemonSearch />
      </div>
      <div className="mb-6">
        <TypeFilter />
      </div>
      <PokemonGrid />
    </div>
  );
}
