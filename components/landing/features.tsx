import {
  Search,
  GitCompare,
  Sparkles,
  Gamepad2,
  Zap,
  Heart,
} from "lucide-react";

const features = [
  {
    icon: Search,
    title: "Complete Pokedex",
    description:
      "Browse through 1000+ Pokemon with detailed stats, abilities, and type information.",
  },
  {
    icon: GitCompare,
    title: "Compare Pokemon",
    description:
      "Compare two Pokemon side by side to see which one has better stats for your team.",
  },
  {
    icon: Sparkles,
    title: "Evolution Chains",
    description:
      "Discover evolution paths and learn what triggers each Pokemon's evolution.",
  },
  {
    icon: Gamepad2,
    title: "Quiz Game",
    description:
      'Test your Pokemon knowledge with "Who\'s That Pokemon?" silhouette quiz.',
  },
  {
    icon: Zap,
    title: "Type Matchups",
    description:
      "Understand type advantages and weaknesses to build the perfect team.",
  },
  {
    icon: Heart,
    title: "Favorites",
    description:
      "Save your favorite Pokemon and access them quickly anytime.",
  },
];

export function Features() {
  return (
    <section id="features" className="w-full py-16 xs:py-24 px-6">
      <h2 className="text-3xl xs:text-4xl sm:text-5xl font-bold tracking-tight text-center">
        Everything You Need
      </h2>
      <p className="mt-4 text-center text-muted-foreground max-w-2xl mx-auto">
        All the tools and information you need to become a Pokemon master
      </p>
      <div className="w-full max-w-screen-lg mx-auto mt-12 sm:mt-16 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feature) => (
          <div
            key={feature.title}
            className="flex flex-col bg-background border rounded-xl py-6 px-5 hover:shadow-lg transition-shadow"
          >
            <div className="mb-3 h-10 w-10 flex items-center justify-center bg-primary/10 rounded-full">
              <feature.icon className="h-5 w-5 text-primary" />
            </div>
            <span className="text-lg font-semibold">{feature.title}</span>
            <p className="mt-1 text-muted-foreground text-sm">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
