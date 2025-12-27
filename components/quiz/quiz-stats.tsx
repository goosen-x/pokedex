'use client';

import { Badge } from '@/components/ui/badge';

interface QuizStatsProps {
  score: number;
  streak: number;
  bestStreak: number;
  totalRounds: number;
  correctAnswers: number;
}

export function QuizStats({
  score,
  streak,
  bestStreak,
  totalRounds,
  correctAnswers,
}: QuizStatsProps) {
  const accuracy = totalRounds > 0 ? Math.round((correctAnswers / totalRounds) * 100) : 0;

  return (
    <div className="flex flex-wrap items-center justify-center gap-3">
      <Badge variant="secondary" className="px-3 py-1 text-sm">
        Score: {score}
      </Badge>
      <Badge
        variant={streak > 0 ? 'default' : 'outline'}
        className="px-3 py-1 text-sm"
      >
        Streak: {streak}
      </Badge>
      <Badge variant="outline" className="px-3 py-1 text-sm">
        Best: {bestStreak}
      </Badge>
      {totalRounds > 0 && (
        <Badge variant="outline" className="px-3 py-1 text-sm">
          {correctAnswers}/{totalRounds} ({accuracy}%)
        </Badge>
      )}
    </div>
  );
}
