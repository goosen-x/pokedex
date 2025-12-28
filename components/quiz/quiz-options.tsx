'use client';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface QuizOptionsProps {
  options: string[];
  selectedAnswer: string | null;
  correctAnswer: string | null;
  isRevealed: boolean;
  onSelect: (answer: string) => void;
  disabled?: boolean;
  compact?: boolean;
}

export function QuizOptions({
  options,
  selectedAnswer,
  correctAnswer,
  isRevealed,
  onSelect,
  disabled,
  compact = false,
}: QuizOptionsProps) {
  const getButtonVariant = (option: string) => {
    if (!isRevealed) return 'outline';

    if (option === correctAnswer) return 'default';
    if (option === selectedAnswer && option !== correctAnswer) return 'destructive';

    return 'outline';
  };

  const getButtonClassName = (option: string) => {
    if (!isRevealed) return '';

    if (option === correctAnswer) {
      return 'bg-green-500 hover:bg-green-500 text-white border-green-500';
    }

    return '';
  };

  return (
    <div className={cn('grid grid-cols-2', compact ? 'gap-2' : 'gap-3')}>
      {options.map((option) => (
        <Button
          key={option}
          variant={getButtonVariant(option)}
          className={cn(
            compact ? 'h-10 text-sm' : 'h-12 text-base',
            getButtonClassName(option)
          )}
          onClick={() => onSelect(option)}
          disabled={disabled || isRevealed}
        >
          {option}
        </Button>
      ))}
    </div>
  );
}
