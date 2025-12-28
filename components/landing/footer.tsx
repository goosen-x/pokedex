import Link from "next/link";
import Image from "next/image";
import { Github, Twitter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const footerLinks = [
  { href: "#features", label: "Features" },
  { href: "#pokemon", label: "Pokemon" },
  { href: "#faq", label: "FAQ" },
  { href: "/pokemon", label: "Pokedex" },
  { href: "/quiz", label: "Quiz" },
];

const socialLinks = [
  { href: "https://twitter.com", icon: Twitter, label: "Twitter" },
  { href: "https://github.com/goosen-x/pokedex", icon: Github, label: "GitHub" },
];

export function Footer() {
  return (
    <footer className="w-full border-t">
      <div className="max-w-screen-xl mx-auto px-6 py-12">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
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

          {/* Links */}
          <nav className="flex flex-wrap items-center justify-center gap-6">
            {footerLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <Separator className="my-8" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground text-center sm:text-left">
            © {new Date().getFullYear()} Pokedex. Pokemon is a trademark of Nintendo/Game Freak.
            <br className="sm:hidden" />
            <span className="hidden sm:inline"> • </span>
            Data provided by{" "}
            <a
              href="https://pokeapi.co"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              PokeAPI
            </a>
          </p>

          <div className="flex items-center gap-2">
            {socialLinks.map((social) => (
              <Button
                key={social.label}
                variant="ghost"
                size="icon"
                asChild
              >
                <a
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                >
                  <social.icon className="h-4 w-4" />
                </a>
              </Button>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
