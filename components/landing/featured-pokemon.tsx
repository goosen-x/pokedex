'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import { getPokemon, getPokemonImageUrl, formatPokemonName } from '@/lib/api/pokeapi';
import { TYPE_BG_COLORS, type PokemonTypeName } from '@/lib/types/pokemon';
import { Skeleton } from '@/components/ui/skeleton';
import { staggerContainer, staggerItem, cardHover } from '@/lib/animations';
import { cn } from '@/lib/utils';

// Featured Pokemon IDs (popular/iconic Pokemon)
const FEATURED_IDS = [25, 1, 4, 7, 150, 133];

export function FeaturedPokemon() {
  const { data: pokemonList, isLoading } = useQuery({
    queryKey: ['featured-pokemon'],
    queryFn: async () => {
      const promises = FEATURED_IDS.map((id) => getPokemon(id));
      return Promise.all(promises);
    },
    staleTime: 1000 * 60 * 10,
  });

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gradient">
            Featured Pokemon
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Meet some of the most beloved Pokemon from across all generations
          </p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4"
        >
          {isLoading
            ? Array.from({ length: 6 }).map((_, i) => (
                <FeaturedCardSkeleton key={i} />
              ))
            : pokemonList?.map((pokemon) => {
                const primaryType = pokemon.types[0]?.type.name as PokemonTypeName;
                return (
                  <motion.div key={pokemon.id} variants={staggerItem}>
                    <Link href={`/pokemon/${pokemon.id}`}>
                      <motion.div
                        variants={cardHover}
                        initial="initial"
                        whileHover="hover"
                        whileTap="tap"
                        className={cn(
                          'relative rounded-2xl p-4 text-white overflow-hidden cursor-pointer',
                          TYPE_BG_COLORS[primaryType]
                        )}
                      >
                        {/* Decorative circle */}
                        <div className="absolute -right-4 -bottom-4 w-24 h-24 rounded-full bg-white/10" />

                        {/* Pokemon image */}
                        <div className="relative z-10 flex justify-center mb-2">
                          <Image
                            src={getPokemonImageUrl(pokemon.id)}
                            alt={pokemon.name}
                            width={80}
                            height={80}
                            className="drop-shadow-lg"
                          />
                        </div>

                        {/* Name */}
                        <p className="relative z-10 text-center font-semibold text-sm truncate">
                          {formatPokemonName(pokemon.name)}
                        </p>
                      </motion.div>
                    </Link>
                  </motion.div>
                );
              })}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center mt-8"
        >
          <Link
            href="/pokemon"
            className="text-primary hover:underline font-medium"
          >
            View all Pokemon →
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

function FeaturedCardSkeleton() {
  return (
    <div className="rounded-2xl p-4 bg-muted">
      <div className="flex justify-center mb-2">
        <Skeleton className="w-20 h-20 rounded-full" />
      </div>
      <Skeleton className="h-4 w-16 mx-auto" />
    </div>
  );
}
