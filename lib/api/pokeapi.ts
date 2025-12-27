import type {
  Pokemon,
  PokemonListResponse,
  PokemonSpecies,
  EvolutionChain,
} from '@/lib/types/pokemon';

const BASE_URL = 'https://pokeapi.co/api/v2';

/**
 * Получить список покемонов с пагинацией
 */
export async function getPokemonList(
  limit: number = 20,
  offset: number = 0
): Promise<PokemonListResponse> {
  const response = await fetch(
    `${BASE_URL}/pokemon?limit=${limit}&offset=${offset}`
  );

  if (!response.ok) {
    throw new Error('Failed to fetch pokemon list');
  }

  return response.json();
}

/**
 * Получить данные покемона по ID или имени
 */
export async function getPokemon(idOrName: string | number): Promise<Pokemon> {
  const response = await fetch(`${BASE_URL}/pokemon/${idOrName}`);

  if (!response.ok) {
    throw new Error(`Failed to fetch pokemon: ${idOrName}`);
  }

  return response.json();
}

/**
 * Получить данные о виде покемона (для эволюции и описания)
 */
export async function getPokemonSpecies(
  idOrName: string | number
): Promise<PokemonSpecies> {
  const response = await fetch(`${BASE_URL}/pokemon-species/${idOrName}`);

  if (!response.ok) {
    throw new Error(`Failed to fetch pokemon species: ${idOrName}`);
  }

  return response.json();
}

/**
 * Получить цепочку эволюции по ID
 */
export async function getEvolutionChain(id: number): Promise<EvolutionChain> {
  const response = await fetch(`${BASE_URL}/evolution-chain/${id}`);

  if (!response.ok) {
    throw new Error(`Failed to fetch evolution chain: ${id}`);
  }

  return response.json();
}

/**
 * Извлечь ID из URL цепочки эволюции
 */
export function extractEvolutionChainId(url: string): number {
  const match = url.match(/evolution-chain\/(\d+)/);
  return match ? parseInt(match[1], 10) : 0;
}

/**
 * Извлечь ID покемона из URL
 */
export function extractPokemonId(url: string): number {
  const match = url.match(/pokemon-species\/(\d+)/);
  return match ? parseInt(match[1], 10) : 0;
}

/**
 * Получить URL изображения покемона
 */
export function getPokemonImageUrl(id: number, variant: 'default' | 'artwork' | 'dream' | 'home' = 'artwork'): string {
  switch (variant) {
    case 'artwork':
      return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
    case 'dream':
      return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${id}.svg`;
    case 'home':
      return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${id}.png`;
    default:
      return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
  }
}

/**
 * Форматировать имя покемона (первая буква заглавная)
 */
export function formatPokemonName(name: string): string {
  return name.charAt(0).toUpperCase() + name.slice(1).replace(/-/g, ' ');
}

/**
 * Форматировать номер покемона (#001, #025, #150)
 */
export function formatPokemonId(id: number): string {
  return `#${id.toString().padStart(3, '0')}`;
}

/**
 * Конвертировать дециметры в метры
 */
export function formatHeight(decimeters: number): string {
  return `${(decimeters / 10).toFixed(1)} m`;
}

/**
 * Конвертировать гектограммы в килограммы
 */
export function formatWeight(hectograms: number): string {
  return `${(hectograms / 10).toFixed(1)} kg`;
}

/**
 * Получить описание покемона на английском
 */
export function getEnglishFlavorText(species: PokemonSpecies): string {
  const entry = species.flavor_text_entries.find(
    (e) => e.language.name === 'en'
  );
  return entry?.flavor_text.replace(/\f|\n/g, ' ') || 'No description available.';
}

/**
 * Получить категорию покемона на английском
 */
export function getEnglishGenus(species: PokemonSpecies): string {
  const genus = species.genera.find((g) => g.language.name === 'en');
  return genus?.genus || 'Unknown';
}

/**
 * Форматировать соотношение полов
 * gender_rate: -1 = genderless, 0 = 100% male, 8 = 100% female
 */
export function formatGenderRate(genderRate: number): { male: number; female: number } | null {
  if (genderRate === -1) return null; // genderless
  const female = (genderRate / 8) * 100;
  return { male: 100 - female, female };
}

/**
 * Форматировать группы яиц
 */
export function formatEggGroups(eggGroups: { name: string }[]): string {
  return eggGroups.map((g) => formatPokemonName(g.name)).join(', ');
}

/**
 * Конвертировать высоту в футы и дюймы (американский формат)
 */
export function formatHeightImperial(decimeters: number): string {
  const inches = decimeters * 3.937;
  const feet = Math.floor(inches / 12);
  const remainingInches = (inches % 12).toFixed(1);
  return `${feet}'${remainingInches}"`;
}

/**
 * Конвертировать вес в фунты (американский формат)
 */
export function formatWeightImperial(hectograms: number): string {
  const lbs = hectograms * 0.220462;
  return `${lbs.toFixed(1)} lbs`;
}
