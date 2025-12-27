'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useCompareStore } from '@/stores/compare-store';
import { CompareDialog } from '@/components/pokemon/compare-dialog';

export function Header() {
  const { pokemon1, pokemon2, setIsOpen } = useCompareStore();
  const compareCount = [pokemon1, pokemon2].filter(Boolean).length;

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/pokeball.svg"
            alt="Pokedex"
            width={40}
            height={40}
            className="rounded-lg"
          />
          <span className="text-xl font-bold">Pokedex</span>
        </Link>

        {/* Navigation */}
        <nav className="flex items-center gap-4">
          <Link href="/" className="text-sm font-medium hover:text-primary">
            Home
          </Link>
          <Link href="/quiz" className="text-sm font-medium hover:text-primary">
            Quiz
          </Link>

          {/* Compare Button */}
          <Button
            variant="outline"
            onClick={() => setIsOpen(true)}
            disabled={compareCount === 0}
            className="relative"
          >
            Compare
            {compareCount > 0 && (
              <Badge
                variant="destructive"
                className="absolute -right-2 -top-2 h-5 w-5 rounded-full p-0 text-xs"
              >
                {compareCount}
              </Badge>
            )}
          </Button>
        </nav>
      </div>

      {/* Compare Dialog */}
      <CompareDialog />
    </header>
  );
}
