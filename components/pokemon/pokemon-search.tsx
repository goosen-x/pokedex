'use client';

import { useCallback } from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useFilterStore } from '@/stores/filter-store';
import { useDebouncedCallback } from '@/hooks/use-debounce';

export function PokemonSearch() {
  const { setSearchQuery } = useFilterStore();

  const debouncedSetSearch = useDebouncedCallback(
    (value: string) => setSearchQuery(value),
    300
  );

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      debouncedSetSearch(e.target.value);
    },
    [debouncedSetSearch]
  );

  return (
    <div className="relative w-full max-w-md">
      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      <Input
        type="search"
        placeholder="Search Pokemon by name..."
        onChange={handleChange}
        className="w-full pl-9"
        aria-label="Search Pokemon"
      />
    </div>
  );
}
