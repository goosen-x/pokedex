'use client';

import { useCallback, useState } from 'react';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import { useFilterStore } from '@/stores/filter-store';
import { useCompareStore } from '@/stores/compare-store';
import { useDebouncedCallback } from '@/hooks/use-debounce';
import { useIsMobile } from '@/hooks/use-media-query';
import { TYPE_COLORS, TYPE_BG_COLORS, POKEMON_TYPES, type PokemonTypeName } from '@/lib/types/pokemon';
import { cn } from '@/lib/utils';

const TYPE_ICONS: Record<PokemonTypeName, string> = {
  normal: '⚪',
  fire: '🔥',
  water: '💧',
  grass: '🌿',
  electric: '⚡',
  ice: '❄️',
  fighting: '🥊',
  poison: '☠️',
  ground: '🌍',
  flying: '🕊️',
  psychic: '🔮',
  bug: '🐛',
  rock: '🪨',
  ghost: '👻',
  dragon: '🐉',
  dark: '🌑',
  steel: '⚙️',
  fairy: '✨',
};

interface FilterContentProps {
  selectedType: PokemonTypeName | null;
  onTypeSelect: (type: PokemonTypeName | null) => void;
}

function FilterContent({ selectedType, onTypeSelect }: FilterContentProps) {
  return (
    <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 pb-8">
      {/* All Types Button */}
      <button
        onClick={() => onTypeSelect(null)}
        className={cn(
          'flex flex-col items-center justify-center p-3 rounded-xl transition-all',
          selectedType === null
            ? 'bg-primary text-primary-foreground'
            : 'bg-muted hover:bg-muted/80'
        )}
      >
        <span className="text-xl mb-1">🌐</span>
        <span className="text-xs font-medium">All</span>
      </button>

      {/* Type Buttons */}
      {POKEMON_TYPES.map((type) => (
        <button
          key={type}
          onClick={() => onTypeSelect(type)}
          className={cn(
            'flex flex-col items-center justify-center p-3 rounded-xl transition-all',
            selectedType === type
              ? `${TYPE_BG_COLORS[type]} text-white ring-2 ring-offset-2 ring-offset-background`
              : 'bg-muted hover:bg-muted/80'
          )}
        >
          <span className="text-xl mb-1">{TYPE_ICONS[type]}</span>
          <span className="text-xs font-medium capitalize">{type}</span>
        </button>
      ))}
    </div>
  );
}

export function FloatingFilterBar() {
  const { searchQuery, selectedType, setSearchQuery, setSelectedType } = useFilterStore();
  const { pokemon1, pokemon2, setIsOpen: setCompareOpen } = useCompareStore();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [localSearch, setLocalSearch] = useState(searchQuery);
  const isMobile = useIsMobile();

  const compareCount = [pokemon1, pokemon2].filter(Boolean).length;

  const debouncedSetSearch = useDebouncedCallback(
    (value: string) => setSearchQuery(value),
    300
  );

  const handleSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setLocalSearch(e.target.value);
      debouncedSetSearch(e.target.value);
    },
    [debouncedSetSearch]
  );

  const handleTypeSelect = (type: PokemonTypeName | null) => {
    setSelectedType(type);
    setIsFilterOpen(false);
  };

  const clearSearch = () => {
    setLocalSearch('');
    setSearchQuery('');
  };

  const filterButton = (
    <Button
      variant={selectedType ? 'default' : 'secondary'}
      size="icon"
      className="rounded-full h-10 w-10 flex-shrink-0"
    >
      <SlidersHorizontal className="h-4 w-4" />
    </Button>
  );

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 w-[calc(100%-2rem)] max-w-xl">
      <div className="flex items-center gap-2 p-2 bg-background/80 backdrop-blur-xl border rounded-full shadow-lg">
        {/* Search Input */}
        <div className="relative flex-1 min-w-0">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground pointer-events-none" />
          <Input
            type="text"
            placeholder="Search..."
            value={localSearch}
            onChange={handleSearchChange}
            className="pl-9 pr-8 h-10 rounded-full border-0 bg-muted/50 focus-visible:ring-1"
          />
          {localSearch && (
            <button
              onClick={clearSearch}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* Selected Type Chip */}
        {selectedType && (
          <Badge
            className={cn(
              'flex items-center gap-1 px-3 py-1.5 rounded-full cursor-pointer',
              TYPE_BG_COLORS[selectedType],
              'text-white border-0'
            )}
            onClick={() => setSelectedType(null)}
          >
            <span>{TYPE_ICONS[selectedType]}</span>
            <span className="capitalize text-xs">{selectedType}</span>
            <X className="h-3 w-3 ml-1" />
          </Badge>
        )}

        {/* Compare Button (if Pokemon selected) */}
        {compareCount > 0 && (
          <Button
            variant="secondary"
            size="sm"
            className="rounded-full h-10 px-4"
            onClick={() => setCompareOpen(true)}
          >
            <span className="hidden sm:inline mr-1">Compare</span>
            <Badge variant="destructive" className="h-5 w-5 p-0 flex items-center justify-center rounded-full text-xs">
              {compareCount}
            </Badge>
          </Button>
        )}

        {/* Filter Button - Drawer on mobile, Sheet on desktop */}
        {isMobile ? (
          <Drawer open={isFilterOpen} onOpenChange={setIsFilterOpen}>
            <DrawerTrigger asChild>
              {filterButton}
            </DrawerTrigger>
            <DrawerContent>
              <DrawerHeader>
                <DrawerTitle>Filter by Type</DrawerTitle>
              </DrawerHeader>
              <div className="px-4 pb-8 overflow-y-auto max-h-[70vh]">
                <FilterContent
                  selectedType={selectedType}
                  onTypeSelect={handleTypeSelect}
                />
              </div>
            </DrawerContent>
          </Drawer>
        ) : (
          <Sheet open={isFilterOpen} onOpenChange={setIsFilterOpen}>
            <SheetTrigger asChild>
              {filterButton}
            </SheetTrigger>
            <SheetContent side="bottom" className="rounded-t-3xl max-w-2xl mx-auto px-4 overflow-hidden">
              <SheetHeader className="pb-4">
                <SheetTitle>Filter by Type</SheetTitle>
              </SheetHeader>
              <FilterContent
                selectedType={selectedType}
                onTypeSelect={handleTypeSelect}
              />
            </SheetContent>
          </Sheet>
        )}
      </div>
    </div>
  );
}
