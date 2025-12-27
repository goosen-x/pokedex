"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Logo } from "./logo";
import { NavMenu } from "./nav-menu";
import { NavigationSheet } from "./navigation-sheet";

export function Navbar() {
  return (
    <nav className="fixed z-50 top-6 inset-x-4 h-16 bg-background/50 backdrop-blur-md border dark:border-slate-700/70 max-w-screen-xl mx-auto rounded-full">
      <div className="h-full flex items-center justify-between mx-auto px-4">
        <Logo />

        {/* Desktop Menu */}
        <NavMenu className="hidden md:block" />

        <div className="flex items-center gap-3">
          <Link href="/quiz" className="hidden sm:block">
            <Button variant="outline">Play Quiz</Button>
          </Link>
          <Link href="/pokemon">
            <Button className="hidden xs:inline-flex">Explore Pokedex</Button>
          </Link>

          {/* Mobile Menu */}
          <div className="md:hidden">
            <NavigationSheet />
          </div>
        </div>
      </div>
    </nav>
  );
}
