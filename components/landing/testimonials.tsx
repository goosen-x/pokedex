"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Marquee } from "@/components/ui/marquee";

const TRAINER_SPRITES_BASE = "https://play.pokemonshowdown.com/sprites/trainers";

const testimonials = [
  {
    name: "Ash Ketchum",
    designation: "Pokemon Trainer",
    location: "Pallet Town",
    testimonial:
      "This Pokedex helped me track all the Pokemon I've caught on my journey. The evolution chains are super helpful!",
    avatar: `${TRAINER_SPRITES_BASE}/ash.png`,
  },
  {
    name: "Misty",
    designation: "Gym Leader",
    location: "Cerulean City",
    testimonial:
      "As a Water-type specialist, I love how easy it is to filter Pokemon by type. Great for planning gym strategies!",
    avatar: `${TRAINER_SPRITES_BASE}/misty.png`,
  },
  {
    name: "Brock",
    designation: "Pokemon Breeder",
    location: "Pewter City",
    testimonial:
      "The breeding information and egg groups data is incredibly detailed. Perfect for any Pokemon breeder!",
    avatar: `${TRAINER_SPRITES_BASE}/brock.png`,
  },
  {
    name: "Gary Oak",
    designation: "Pokemon Researcher",
    location: "Pallet Town",
    testimonial:
      "The compare feature is genius! I use it all the time to analyze Pokemon stats for my research.",
    avatar: `${TRAINER_SPRITES_BASE}/blue.png`,
  },
  {
    name: "Professor Oak",
    designation: "Pokemon Professor",
    location: "Pallet Town",
    testimonial:
      "A comprehensive Pokedex that would make any researcher proud. The data accuracy is remarkable!",
    avatar: `${TRAINER_SPRITES_BASE}/oak.png`,
  },
  {
    name: "Cynthia",
    designation: "Champion",
    location: "Sinnoh Region",
    testimonial:
      "Understanding type matchups is crucial for any champion. This tool makes it easy to study Pokemon weaknesses.",
    avatar: `${TRAINER_SPRITES_BASE}/cynthia.png`,
  },
];

function TestimonialCard({
  testimonial,
}: {
  testimonial: (typeof testimonials)[0];
}) {
  return (
    <div className="flex flex-col w-80 bg-background border rounded-xl p-5 mx-2">
      <div className="flex items-center gap-3 mb-4">
        <Avatar>
          <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
          <AvatarFallback>{testimonial.name[0]}</AvatarFallback>
        </Avatar>
        <div>
          <p className="font-semibold text-sm">{testimonial.name}</p>
          <p className="text-xs text-muted-foreground">
            {testimonial.designation} • {testimonial.location}
          </p>
        </div>
      </div>
      <p className="text-sm text-muted-foreground italic">
        "{testimonial.testimonial}"
      </p>
    </div>
  );
}

export function Testimonials() {
  return (
    <section id="testimonials" className="w-full py-16 xs:py-24 overflow-hidden">
      <h2 className="text-3xl xs:text-4xl sm:text-5xl font-bold tracking-tight text-center px-6">
        Loved by Trainers
      </h2>
      <p className="mt-4 text-center text-muted-foreground max-w-2xl mx-auto px-6">
        See what Pokemon trainers around the world are saying
      </p>

      <div className="mt-12 relative">
        <Marquee pauseOnHover className="[--duration:80s]">
          {testimonials.map((testimonial) => (
            <TestimonialCard key={testimonial.name} testimonial={testimonial} />
          ))}
        </Marquee>
        <Marquee reverse pauseOnHover className="[--duration:80s] mt-4">
          {[...testimonials].reverse().map((testimonial) => (
            <TestimonialCard key={testimonial.name} testimonial={testimonial} />
          ))}
        </Marquee>

        {/* Gradient overlays */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-1/6 bg-gradient-to-r from-background to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-1/6 bg-gradient-to-l from-background to-transparent" />
      </div>
    </section>
  );
}
