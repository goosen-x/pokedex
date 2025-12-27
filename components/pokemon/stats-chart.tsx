'use client';

import type { PokemonStat } from '@/lib/types/pokemon';
import { cn } from '@/lib/utils';

interface StatsChartProps {
  stats: PokemonStat[];
}

// Максимальное значение стата для расчета процента
const MAX_STAT = 255;

// Названия статов для отображения
const STAT_NAMES: Record<string, string> = {
  hp: 'HP',
  attack: 'Attack',
  defense: 'Defense',
  'special-attack': 'Sp. Atk',
  'special-defense': 'Sp. Def',
  speed: 'Speed',
};

// Цвета для статов (соответствуют референсу)
const STAT_COLORS: Record<string, string> = {
  hp: 'bg-teal-400',
  attack: 'bg-teal-400',
  defense: 'bg-teal-400',
  'special-attack': 'bg-teal-400',
  'special-defense': 'bg-teal-400',
  speed: 'bg-teal-400',
};

export function StatsChart({ stats }: StatsChartProps) {
  const total = stats.reduce((sum, stat) => sum + stat.base_stat, 0);

  return (
    <div className="space-y-3">
      {stats.map((stat) => {
        const percentage = (stat.base_stat / MAX_STAT) * 100;
        const statName = stat.stat.name;

        return (
          <div key={statName} className="flex items-center gap-3">
            {/* Stat name */}
            <span className="w-16 text-sm text-muted-foreground">
              {STAT_NAMES[statName] || statName}
            </span>

            {/* Stat value */}
            <span className="w-8 text-right text-sm font-semibold">
              {stat.base_stat}
            </span>

            {/* Progress bar */}
            <div className="h-2 flex-1 overflow-hidden rounded-full bg-secondary">
              <div
                className={cn(
                  'h-full rounded-full transition-all duration-500',
                  stat.base_stat >= 100 ? 'bg-teal-500' :
                  stat.base_stat >= 50 ? 'bg-teal-400' : 'bg-red-400'
                )}
                style={{ width: `${percentage}%` }}
              />
            </div>
          </div>
        );
      })}

      {/* Total stats */}
      <div className="flex items-center gap-3 border-t pt-3">
        <span className="w-16 text-sm font-semibold">Total</span>
        <span className="w-8 text-right text-sm font-bold">{total}</span>
        <div className="h-2 flex-1 overflow-hidden rounded-full bg-secondary">
          <div
            className="h-full rounded-full bg-teal-500 transition-all duration-500"
            style={{ width: `${Math.min((total / 600) * 100, 100)}%` }}
          />
        </div>
      </div>
    </div>
  );
}
