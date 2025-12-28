'use client';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { getGenerationOptions } from '@/lib/constants/generations';
import { cn } from '@/lib/utils';

interface GenerationSelectProps {
  value: number | null;
  onChange: (value: number | null) => void;
  disabled?: boolean;
  className?: string;
}

export function GenerationSelect({ value, onChange, disabled, className }: GenerationSelectProps) {
  const options = getGenerationOptions();

  const handleChange = (val: string) => {
    onChange(val === 'all' ? null : parseInt(val, 10));
  };

  return (
    <Select
      value={value === null ? 'all' : String(value)}
      onValueChange={handleChange}
      disabled={disabled}
    >
      <SelectTrigger className={cn('w-48', className)}>
        <SelectValue placeholder="Select generation" />
      </SelectTrigger>
      <SelectContent>
        {options.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
