import { Header } from "@/components/shared/header";
import { Hero } from "@/components/landing/hero";
import { Features } from "@/components/landing/features";
import { PokemonShowcase } from "@/components/landing/pokemon-showcase";
import { FAQ } from "@/components/landing/faq";
import { Testimonials } from "@/components/landing/testimonials";
import { CTABanner } from "@/components/landing/cta-banner";
import { Footer } from "@/components/landing/footer";

export const metadata = {
  title: "Pokedex | Your Ultimate Pokemon Companion",
  description:
    "Explore 1000+ Pokemon, compare stats, learn about evolutions, and test your knowledge with our interactive quiz game.",
};

export default function LandingPage() {
  return (
    <>
      <Header variant="landing" />
      <main className="pt-20">
        <Hero />
        <Features />
        <PokemonShowcase />
        <FAQ />
        <Testimonials />
        <CTABanner />
        <Footer />
      </main>
    </>
  );
}
