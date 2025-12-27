// Типы для Pokemon API

export interface PokemonListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: PokemonListItem[];
}

export interface PokemonListItem {
  name: string;
  url: string;
}

export interface Pokemon {
  id: number;
  name: string;
  height: number;
  weight: number;
  base_experience: number;
  sprites: PokemonSprites;
  types: PokemonTypeSlot[];
  stats: PokemonStat[];
  abilities: PokemonAbility[];
  moves: PokemonMove[];
}

export interface PokemonSprites {
  front_default: string | null;
  front_shiny: string | null;
  back_default: string | null;
  back_shiny: string | null;
  other?: {
    'official-artwork'?: {
      front_default: string | null;
      front_shiny: string | null;
    };
    dream_world?: {
      front_default: string | null;
    };
    home?: {
      front_default: string | null;
      front_shiny: string | null;
    };
  };
}

export interface PokemonTypeSlot {
  slot: number;
  type: PokemonType;
}

export interface PokemonType {
  name: string;
  url: string;
}

export interface PokemonStat {
  base_stat: number;
  effort: number;
  stat: {
    name: string;
    url: string;
  };
}

export interface PokemonAbility {
  ability: {
    name: string;
    url: string;
  };
  is_hidden: boolean;
  slot: number;
}

export interface PokemonMove {
  move: {
    name: string;
    url: string;
  };
}

// Species и Evolution
export interface PokemonSpecies {
  id: number;
  name: string;
  evolution_chain: {
    url: string;
  };
  flavor_text_entries: FlavorTextEntry[];
  genera: Genus[];
  color: {
    name: string;
  };
  habitat: {
    name: string;
  } | null;
  generation: {
    name: string;
  };
  // Breeding data
  gender_rate: number; // -1 = genderless, 0-8 (female = rate/8 * 100%)
  egg_groups: {
    name: string;
    url: string;
  }[];
  hatch_counter: number;
  capture_rate: number;
}

export interface FlavorTextEntry {
  flavor_text: string;
  language: {
    name: string;
  };
  version: {
    name: string;
  };
}

export interface Genus {
  genus: string;
  language: {
    name: string;
  };
}

export interface EvolutionChain {
  id: number;
  chain: EvolutionChainLink;
}

export interface EvolutionChainLink {
  species: {
    name: string;
    url: string;
  };
  evolution_details: EvolutionDetail[];
  evolves_to: EvolutionChainLink[];
}

export interface EvolutionDetail {
  min_level: number | null;
  trigger: {
    name: string;
  };
  item: {
    name: string;
  } | null;
  held_item: {
    name: string;
  } | null;
  min_happiness: number | null;
  min_beauty: number | null;
  min_affection: number | null;
  time_of_day: string;
}

// Типы покемонов для цветов
export type PokemonTypeName =
  | 'normal'
  | 'fire'
  | 'water'
  | 'grass'
  | 'electric'
  | 'ice'
  | 'fighting'
  | 'poison'
  | 'ground'
  | 'flying'
  | 'psychic'
  | 'bug'
  | 'rock'
  | 'ghost'
  | 'dragon'
  | 'dark'
  | 'steel'
  | 'fairy';

// Цветовая схема для типов
export const TYPE_COLORS: Record<PokemonTypeName, string> = {
  normal: 'bg-gray-400',
  fire: 'bg-orange-500',
  water: 'bg-blue-500',
  grass: 'bg-green-500',
  electric: 'bg-yellow-400',
  ice: 'bg-cyan-400',
  fighting: 'bg-red-700',
  poison: 'bg-purple-500',
  ground: 'bg-amber-600',
  flying: 'bg-indigo-400',
  psychic: 'bg-pink-500',
  bug: 'bg-lime-500',
  rock: 'bg-stone-500',
  ghost: 'bg-violet-600',
  dragon: 'bg-indigo-600',
  dark: 'bg-gray-800',
  steel: 'bg-slate-400',
  fairy: 'bg-pink-300',
};

export const TYPE_COLORS_HEX: Record<PokemonTypeName, string> = {
  normal: '#9ca3af',
  fire: '#f97316',
  water: '#3b82f6',
  grass: '#22c55e',
  electric: '#facc15',
  ice: '#22d3ee',
  fighting: '#b91c1c',
  poison: '#a855f7',
  ground: '#d97706',
  flying: '#818cf8',
  psychic: '#ec4899',
  bug: '#84cc16',
  rock: '#78716c',
  ghost: '#7c3aed',
  dragon: '#4f46e5',
  dark: '#1f2937',
  steel: '#94a3b8',
  fairy: '#f9a8d4',
};

// Более яркие/насыщенные цвета для фона карточек (как на референсе)
export const TYPE_BG_COLORS: Record<PokemonTypeName, string> = {
  normal: 'bg-stone-400',
  fire: 'bg-orange-400',
  water: 'bg-sky-400',
  grass: 'bg-teal-400',
  electric: 'bg-amber-300',
  ice: 'bg-cyan-300',
  fighting: 'bg-red-400',
  poison: 'bg-purple-400',
  ground: 'bg-amber-500',
  flying: 'bg-indigo-300',
  psychic: 'bg-pink-400',
  bug: 'bg-lime-400',
  rock: 'bg-stone-500',
  ghost: 'bg-violet-500',
  dragon: 'bg-indigo-500',
  dark: 'bg-gray-600',
  steel: 'bg-slate-400',
  fairy: 'bg-pink-300',
};
