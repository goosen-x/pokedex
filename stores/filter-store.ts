import { create } from 'zustand';
import type { PokemonTypeName } from '@/lib/types/pokemon';

interface FilterState {
  searchQuery: string;
  selectedType: PokemonTypeName | null;

  // Actions
  setSearchQuery: (query: string) => void;
  setSelectedType: (type: PokemonTypeName | null) => void;
  resetFilters: () => void;
}

export const useFilterStore = create<FilterState>((set) => ({
  searchQuery: '',
  selectedType: null,

  setSearchQuery: (query) => {
    set({ searchQuery: query.toLowerCase() });
  },

  setSelectedType: (type) => {
    set({ selectedType: type });
  },

  resetFilters: () => {
    set({ searchQuery: '', selectedType: null });
  },
}));
