'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { POKEMON_TYPES, TYPE_COLORS, TYPE_BG_COLORS, type PokemonTypeName } from '@/lib/types/pokemon';
import { staggerContainer, staggerItem, cardHover } from '@/lib/animations';
import { cn } from '@/lib/utils';

const TYPE_ICONS: Record<PokemonTypeName, string> = {
  normal: '⚪',
  fire: '🔥',
  water: '💧',
  grass: '🌿',
  electric: '⚡',
  ice: '❄️',
  fighting: '🥊',
  poison: '☠️',
  ground: '🌍',
  flying: '🕊️',
  psychic: '🔮',
  bug: '🐛',
  rock: '🪨',
  ghost: '👻',
  dragon: '🐉',
  dark: '🌑',
  steel: '⚙️',
  fairy: '✨',
};

export function TypeExplorer() {
  return (
    <section className="py-20 px-4 bg-white">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gradient">
            Explore by Type
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Discover Pokemon based on their elemental types.
            Each type has unique strengths and weaknesses.
          </p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-9 gap-3"
        >
          {POKEMON_TYPES.map((type) => (
            <motion.div key={type} variants={staggerItem}>
              <Link href={`/pokemon?type=${type}`}>
                <motion.div
                  variants={cardHover}
                  initial="initial"
                  whileHover="hover"
                  whileTap="tap"
                  className={cn(
                    'flex flex-col items-center justify-center p-4 rounded-xl cursor-pointer transition-shadow',
                    TYPE_BG_COLORS[type],
                    `hover:glow-md glow-${type}`
                  )}
                >
                  <span className="text-2xl mb-1">{TYPE_ICONS[type]}</span>
                  <span className="text-white text-xs font-semibold capitalize">
                    {type}
                  </span>
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
