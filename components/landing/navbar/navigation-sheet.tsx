"use client";

import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Logo } from "./logo";
import { NavMenu } from "./nav-menu";
import Link from "next/link";

export function NavigationSheet() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon">
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left">
        <Logo />
        <NavMenu orientation="vertical" className="mt-12" />
        <div className="mt-8 flex flex-col gap-3">
          <Link href="/pokemon">
            <Button className="w-full">Explore Pokedex</Button>
          </Link>
          <Link href="/quiz">
            <Button variant="outline" className="w-full">Play Quiz</Button>
          </Link>
        </div>
      </SheetContent>
    </Sheet>
  );
}
