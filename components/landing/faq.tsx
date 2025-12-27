import {
  HelpCircle,
  Zap,
  Shield,
  Smartphone,
  Globe,
  RefreshCw,
} from "lucide-react";

const faqs = [
  {
    icon: HelpCircle,
    question: "How many Pokemon are included?",
    answer:
      "Our Pokedex includes all 1000+ Pokemon from Generation 1 through Generation 9, including all forms and variants.",
  },
  {
    icon: Zap,
    question: "Is the data real-time?",
    answer:
      "Yes! We use the official PokeAPI to fetch accurate and up-to-date Pokemon data including stats, abilities, and evolution chains.",
  },
  {
    icon: Shield,
    question: "Is this site official?",
    answer:
      "This is a fan-made project for educational purposes. Pokemon is a trademark of Nintendo/Game Freak.",
  },
  {
    icon: Smartphone,
    question: "Does it work on mobile?",
    answer:
      "Absolutely! The Pokedex is fully responsive and works great on phones, tablets, and desktops.",
  },
  {
    icon: Globe,
    question: "Is it free to use?",
    answer:
      "Yes, completely free! No sign-up required. Just start exploring Pokemon right away.",
  },
  {
    icon: RefreshCw,
    question: "How often is it updated?",
    answer:
      "The Pokemon data is fetched from PokeAPI which is regularly updated with new Pokemon and game information.",
  },
];

export function FAQ() {
  return (
    <section id="faq" className="w-full py-16 xs:py-24 px-6">
      <h2 className="text-3xl xs:text-4xl sm:text-5xl font-bold tracking-tight text-center">
        Frequently Asked Questions
      </h2>
      <p className="mt-4 text-center text-muted-foreground max-w-2xl mx-auto">
        Everything you need to know about the Pokedex
      </p>

      <div className="w-full max-w-screen-lg mx-auto mt-12 grid md:grid-cols-2 gap-6">
        {faqs.map((faq) => (
          <div
            key={faq.question}
            className="flex flex-col bg-background border rounded-xl py-6 px-5"
          >
            <div className="mb-3 h-10 w-10 flex items-center justify-center bg-primary/10 rounded-full">
              <faq.icon className="h-5 w-5 text-primary" />
            </div>
            <span className="text-lg font-semibold">{faq.question}</span>
            <p className="mt-2 text-muted-foreground text-sm">{faq.answer}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
