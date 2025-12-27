export interface Generation {
  name: string;
  region: string;
  start: number;
  end: number;
}

export const GENERATIONS: Record<number, Generation> = {
  1: { name: 'Gen 1', region: 'Kanto', start: 1, end: 151 },
  2: { name: 'Gen 2', region: 'Johto', start: 152, end: 251 },
  3: { name: 'Gen 3', region: 'Hoenn', start: 252, end: 386 },
  4: { name: 'Gen 4', region: 'Sinnoh', start: 387, end: 493 },
  5: { name: 'Gen 5', region: 'Unova', start: 494, end: 649 },
  6: { name: 'Gen 6', region: 'Kalos', start: 650, end: 721 },
  7: { name: 'Gen 7', region: 'Alola', start: 722, end: 809 },
  8: { name: 'Gen 8', region: 'Galar', start: 810, end: 905 },
  9: { name: 'Gen 9', region: 'Paldea', start: 906, end: 1025 },
};

export const TOTAL_POKEMON = 1025;

export function getRandomPokemonId(generation: number | null): number {
  if (generation === null) {
    return Math.floor(Math.random() * TOTAL_POKEMON) + 1;
  }

  const gen = GENERATIONS[generation];
  if (!gen) {
    return Math.floor(Math.random() * TOTAL_POKEMON) + 1;
  }

  const range = gen.end - gen.start + 1;
  return Math.floor(Math.random() * range) + gen.start;
}

export function getGenerationOptions(): Array<{ value: string; label: string }> {
  const options = [{ value: 'all', label: 'All Generations' }];

  for (const [key, gen] of Object.entries(GENERATIONS)) {
    options.push({
      value: key,
      label: `${gen.name} (${gen.region})`,
    });
  }

  return options;
}
