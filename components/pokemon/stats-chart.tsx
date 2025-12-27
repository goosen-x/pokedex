'use client';

import { PolarAngleAxis, PolarGrid, Radar, RadarChart } from 'recharts';
import type { PokemonStat, PokemonTypeName } from '@/lib/types/pokemon';
import { TYPE_COLORS_HEX } from '@/lib/types/pokemon';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from '@/components/ui/chart';

interface StatsChartProps {
  stats: PokemonStat[];
  type?: PokemonTypeName;
  compact?: boolean; // Hide stats table, only show chart
}

// Названия статов для отображения
const STAT_NAMES: Record<string, string> = {
  hp: 'HP',
  attack: 'Attack',
  defense: 'Defense',
  'special-attack': 'Sp. Atk',
  'special-defense': 'Sp. Def',
  speed: 'Speed',
};

export function StatsChart({ stats, type, compact = false }: StatsChartProps) {
  const total = stats.reduce((sum, stat) => sum + stat.base_stat, 0);
  const typeColor = type ? TYPE_COLORS_HEX[type] : '#3b82f6';

  const chartConfig = {
    stat: {
      label: 'Base Stat',
      color: typeColor,
    },
  } satisfies ChartConfig;

  const chartData = stats.map((stat) => ({
    stat: STAT_NAMES[stat.stat.name] || stat.stat.name,
    value: stat.base_stat,
  }));

  if (compact) {
    return (
      <ChartContainer
        config={chartConfig}
        className="aspect-square w-full max-w-[200px] mx-auto [&_.recharts-surface]:overflow-visible"
      >
        <RadarChart data={chartData}>
          <PolarAngleAxis
            dataKey="stat"
            tick={{ fontSize: 10, fill: '#e5e5e5' }}
          />
          <PolarGrid gridType="polygon" />
          <Radar
            dataKey="value"
            fill={typeColor}
            fillOpacity={0.5}
            stroke={typeColor}
            strokeWidth={2}
            dot={{
              r: 3,
              fillOpacity: 1,
              fill: typeColor,
            }}
          />
        </RadarChart>
      </ChartContainer>
    );
  }

  return (
    <div className="flex flex-col sm:flex-row gap-16 sm:justify-between items-center sm:items-start">
      <ChartContainer
        config={chartConfig}
        className="aspect-square w-full max-w-[260px] flex-shrink-0 [&_.recharts-surface]:overflow-visible"
      >
        <RadarChart data={chartData}>
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent hideLabel />}
          />
          <PolarAngleAxis
            dataKey="stat"
            tick={{ fontSize: 12, fill: '#e5e5e5' }}
          />
          <PolarGrid gridType="polygon" />
          <Radar
            dataKey="value"
            fill={typeColor}
            fillOpacity={0.5}
            stroke={typeColor}
            strokeWidth={2}
            dot={{
              r: 4,
              fillOpacity: 1,
              fill: typeColor,
            }}
          />
        </RadarChart>
      </ChartContainer>

      {/* Stats Table */}
      <div className="flex-1 space-y-2 text-sm w-full">
        {stats.map((stat) => (
          <div key={stat.stat.name} className="flex justify-between">
            <span className="text-muted-foreground">
              {STAT_NAMES[stat.stat.name] || stat.stat.name}
            </span>
            <span className="font-semibold">{stat.base_stat}</span>
          </div>
        ))}
        <div className="flex justify-between border-t pt-2 mt-2">
          <span className="font-semibold">Total</span>
          <span className="font-bold">{total}</span>
        </div>
      </div>
    </div>
  );
}
