'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useCompareStore } from '@/stores/compare-store';
import { CompareDialog } from '@/components/pokemon/compare-dialog';
import { cn } from '@/lib/utils';

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const isLanding = pathname === '/';

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

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/pokemon', label: 'All Pokemon' },
    { href: '/quiz', label: 'Quiz' },
  ];

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          scrolled || !isLanding
            ? 'bg-background/80 backdrop-blur-md shadow-sm border-b'
            : 'bg-transparent'
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
            <span
              className={cn(
                'text-xl font-bold transition-colors',
                isLanding && !scrolled ? 'text-white' : 'text-foreground'
              )}
            >
              Pokedex
            </span>
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
                    : isLanding && !scrolled
                    ? 'text-white/80 hover:text-white'
                    : 'text-muted-foreground hover:text-foreground'
                )}
              >
                {link.label}
              </Link>
            ))}

            {/* Compare Button */}
            <Button
              variant={isLanding && !scrolled ? 'secondary' : 'outline'}
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

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className={cn(
              'md:hidden z-10',
              isLanding && !scrolled && !mobileMenuOpen
                ? 'text-white hover:bg-white/10'
                : ''
            )}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </Button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-background/95 backdrop-blur-md border-b">
            <nav className="container mx-auto px-4 py-4 flex flex-col gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'py-2 px-4 rounded-lg text-sm font-medium transition-colors',
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
                className="mt-2 relative justify-center"
              >
                Compare
                {compareCount > 0 && (
                  <Badge
                    variant="destructive"
                    className="ml-2"
                  >
                    {compareCount}
                  </Badge>
                )}
              </Button>
            </nav>
          </div>
        )}
      </header>

      {/* Spacer for non-landing pages */}
      {!isLanding && <div className="h-16" />}

      {/* Compare Dialog */}
      <CompareDialog />
    </>
  );
}
