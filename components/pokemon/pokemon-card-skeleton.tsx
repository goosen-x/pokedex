import { Skeleton } from '@/components/ui/skeleton';

export function PokemonCardSkeleton() {
  return (
    <div className="flex items-center justify-between overflow-hidden rounded-2xl bg-muted p-4">
      {/* Left side: Name and Types */}
      <div className="flex flex-col gap-2">
        {/* Name skeleton */}
        <Skeleton className="h-5 w-24" />

        {/* Types skeleton */}
        <div className="flex gap-1">
          <Skeleton className="h-5 w-14 rounded-full" />
          <Skeleton className="h-5 w-14 rounded-full" />
        </div>
      </div>

      {/* Right side: Image skeleton */}
      <Skeleton className="h-20 w-20 rounded-full" />
    </div>
  );
}
