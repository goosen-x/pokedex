import { create } from 'zustand';
import type { Pokemon } from '@/lib/types/pokemon';

interface CompareState {
  pokemon1: Pokemon | null;
  pokemon2: Pokemon | null;
  isOpen: boolean;

  // Actions
  addToCompare: (pokemon: Pokemon) => void;
  removeFromCompare: (slot: 1 | 2) => void;
  clearCompare: () => void;
  setIsOpen: (isOpen: boolean) => void;
  isInCompare: (pokemonId: number) => boolean;
}

export const useCompareStore = create<CompareState>((set, get) => ({
  pokemon1: null,
  pokemon2: null,
  isOpen: false,

  addToCompare: (pokemon) => {
    const { pokemon1, pokemon2 } = get();

    // Проверяем, не добавлен ли уже
    if (pokemon1?.id === pokemon.id || pokemon2?.id === pokemon.id) {
      return;
    }

    if (!pokemon1) {
      set({ pokemon1: pokemon });
    } else if (!pokemon2) {
      set({ pokemon2: pokemon, isOpen: true });
    } else {
      // Если оба слота заняты, заменяем второй
      set({ pokemon2: pokemon });
    }
  },

  removeFromCompare: (slot) => {
    if (slot === 1) {
      set({ pokemon1: null });
    } else {
      set({ pokemon2: null });
    }
  },

  clearCompare: () => {
    set({ pokemon1: null, pokemon2: null, isOpen: false });
  },

  setIsOpen: (isOpen) => {
    set({ isOpen });
  },

  isInCompare: (pokemonId) => {
    const { pokemon1, pokemon2 } = get();
    return pokemon1?.id === pokemonId || pokemon2?.id === pokemonId;
  },
}));
