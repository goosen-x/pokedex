'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { useCompareStore } from '@/stores/compare-store';
import { CompareDialog } from '@/components/pokemon/compare-dialog';
import { cn } from '@/lib/utils';

interface HeaderProps {
  variant?: 'default' | 'landing';
}

// Navigation links for app pages
const appNavLinks = [
  { href: '/', label: 'Home' },
  { href: '/pokemon', label: 'All Pokemon' },
  { href: '/quiz', label: 'Quiz' },
];

// Navigation links for landing page (anchor links)
const landingNavLinks = [
  { href: '#features', label: 'Features' },
  { href: '#pokemon', label: 'Pokemon' },
  { href: '#faq', label: 'FAQ' },
  { href: '#testimonials', label: 'Trainers' },
];

export function Header({ variant = 'default' }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const isLanding = variant === 'landing';

  const { pokemon1, pokemon2, setIsOpen } = useCompareStore();
  const compareCount = [pokemon1, pokemon2].filter(Boolean).length;

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const navLinks = isLanding ? landingNavLinks : appNavLinks;

  // Landing variant: floating rounded navbar
  if (isLanding) {
    return (
      <>
        <header className="fixed z-50 top-4 sm:top-6 inset-x-2 sm:inset-x-4 h-14 sm:h-16 bg-background/50 backdrop-blur-md border dark:border-slate-700/70 max-w-screen-xl mx-auto rounded-full">
          <div className="h-full flex items-center justify-between mx-auto px-3 sm:px-4">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2">
              <Image
                src="/pokeball.svg"
                alt="Pokedex"
                width={32}
                height={32}
                className="rounded-full"
              />
              <span className="text-xl font-bold">Pokedex</span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-6">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            <div className="flex items-center gap-2 sm:gap-3">
              <Link href="/quiz" className="hidden sm:block">
                <Button variant="outline" size="sm">Play Quiz</Button>
              </Link>
              <Link href="/pokemon" className="hidden sm:block">
                <Button size="sm">Explore</Button>
              </Link>

              {/* Mobile Menu */}
              <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
                <SheetTrigger asChild>
                  <Button variant="outline" size="icon" className="md:hidden">
                    <Menu className="h-5 w-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-72 px-6">
                  <SheetHeader>
                    <SheetTitle className="flex items-center gap-2">
                      <Image
                        src="/pokeball.svg"
                        alt="Pokedex"
                        width={24}
                        height={24}
                        className="rounded-full"
                      />
                      Pokedex
                    </SheetTitle>
                  </SheetHeader>
                  <nav className="flex flex-col gap-2 mt-6">
                    {navLinks.map((link) => (
                      <a
                        key={link.href}
                        href={link.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className="py-3 px-4 rounded-lg text-sm font-medium text-muted-foreground hover:bg-muted transition-colors"
                      >
                        {link.label}
                      </a>
                    ))}
                    <div className="border-t my-4" />
                    <Link href="/pokemon" onClick={() => setMobileMenuOpen(false)}>
                      <Button className="w-full">Explore Pokedex</Button>
                    </Link>
                    <Link href="/quiz" onClick={() => setMobileMenuOpen(false)}>
                      <Button variant="outline" className="w-full">Play Quiz</Button>
                    </Link>
                  </nav>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </header>

        {/* Compare Dialog */}
        <CompareDialog />
      </>
    );
  }

  // Default variant: full-width fixed header
  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          'bg-background/80 backdrop-blur-md shadow-sm border-b'
        )}
      >
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 z-10">
            <Image
              src="/pokeball.svg"
              alt="Pokedex"
              width={40}
              height={40}
              className="rounded-lg"
            />
            <span className="text-xl font-bold">Pokedex</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'text-sm font-medium transition-colors',
                  pathname === link.href
                    ? 'text-primary'
                    : 'text-muted-foreground hover:text-foreground'
                )}
              >
                {link.label}
              </Link>
            ))}

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
                  className="absolute -right-2 -top-2 h-5 w-5 rounded-full p-0 text-xs flex items-center justify-center"
                >
                  {compareCount}
                </Badge>
              )}
            </Button>
          </nav>

          {/* Mobile Menu */}
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden z-10">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-72 px-6">
              <SheetHeader>
                <SheetTitle>Menu</SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col gap-2 mt-6">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={cn(
                      'py-3 px-4 rounded-lg text-sm font-medium transition-colors',
                      pathname === link.href
                        ? 'bg-primary/10 text-primary'
                        : 'text-muted-foreground hover:bg-muted'
                    )}
                  >
                    {link.label}
                  </Link>
                ))}
                <Button
                  variant="outline"
                  onClick={() => {
                    setIsOpen(true);
                    setMobileMenuOpen(false);
                  }}
                  disabled={compareCount === 0}
                  className="mt-4 relative justify-center"
                >
                  Compare
                  {compareCount > 0 && (
                    <Badge variant="destructive" className="ml-2">
                      {compareCount}
                    </Badge>
                  )}
                </Button>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </header>

      {/* Spacer */}
      <div className="h-16" />

      {/* Compare Dialog */}
      <CompareDialog />
    </>
  );
}
