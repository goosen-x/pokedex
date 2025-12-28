'use client';

import { useEffect, useRef, useCallback } from 'react';
import { usePokemonList } from '@/hooks/use-pokemon-list';
import { useFilterStore } from '@/stores/filter-store';
import { PokemonCard } from './pokemon-card';
import { PokemonCardSkeleton } from './pokemon-card-skeleton';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import type { PokemonTypeName } from '@/lib/types/pokemon';

export function PokemonGrid() {
  const {
    pokemon,
    isLoading,
    isError,
    error,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = usePokemonList();

  const { searchQuery, selectedType } = useFilterStore();
  const loadMoreRef = useRef<HTMLDivElement>(null);

  // Фильтрация покемонов
  const filteredPokemon = pokemon.filter((p) => {
    // Фильтр по имени
    if (searchQuery && !p.name.includes(searchQuery)) {
      return false;
    }

    // Фильтр по типу
    if (selectedType) {
      const hasType = p.types.some(
        (t) => t.type.name === selectedType
      );
      if (!hasType) return false;
    }

    return true;
  });

  // Infinite scroll с IntersectionObserver
  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const [target] = entries;
      if (target.isIntersecting && hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    },
    [fetchNextPage, hasNextPage, isFetchingNextPage]
  );

  useEffect(() => {
    const element = loadMoreRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(handleObserver, {
      root: null,
      rootMargin: '100px',
      threshold: 0,
    });

    observer.observe(element);

    return () => observer.disconnect();
  }, [handleObserver]);

  // Начальная загрузка
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 min-[400px]:grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
        {Array.from({ length: 20 }).map((_, i) => (
          <PokemonCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  // Ошибка
  if (isError) {
    return (
      <Card className="mx-auto max-w-md border-destructive/50">
        <CardContent className="flex flex-col items-center justify-center py-12">
          <p className="mb-4 text-lg text-destructive">
            Error loading Pokemon: {error?.message}
          </p>
          <Button onClick={() => window.location.reload()}>Retry</Button>
        </CardContent>
      </Card>
    );
  }

  // Нет результатов
  if (filteredPokemon.length === 0) {
    return (
      <Card className="mx-auto max-w-md">
        <CardContent className="flex flex-col items-center justify-center py-12">
          <p className="text-lg text-muted-foreground">
            No Pokemon found matching your criteria
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 min-[400px]:grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
        {filteredPokemon.map((p) => (
          <PokemonCard key={p.id} pokemon={p} />
        ))}

        {/* Скелетоны при загрузке следующей страницы */}
        {isFetchingNextPage &&
          Array.from({ length: 10 }).map((_, i) => (
            <PokemonCardSkeleton key={`skeleton-${i}`} />
          ))}
      </div>

      {/* Триггер для infinite scroll */}
      {hasNextPage && !selectedType && !searchQuery && (
        <div ref={loadMoreRef} className="flex justify-center py-8">
          <Button
            variant="outline"
            onClick={() => fetchNextPage()}
            disabled={isFetchingNextPage}
          >
            {isFetchingNextPage ? 'Loading...' : 'Load More'}
          </Button>
        </div>
      )}
    </>
  );
}
