'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { fadeInUp, staggerContainer, rotate } from '@/lib/animations';

export function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Gradient background */}
      <div className="absolute inset-0 gradient-primary" />

      {/* Animated background circles */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute -top-20 -left-20 w-96 h-96 rounded-full bg-white/5"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute top-1/3 -right-32 w-[500px] h-[500px] rounded-full bg-white/5"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute -bottom-32 left-1/4 w-80 h-80 rounded-full bg-white/5"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </div>

      {/* Content */}
      <motion.div
        className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto"
        variants={staggerContainer}
        initial="initial"
        animate="animate"
      >
        {/* Floating Pokeball */}
        <motion.div
          className="mx-auto mb-8 w-24 h-24 md:w-32 md:h-32"
          animate={{
            y: [-10, 10, -10],
            rotate: [0, 5, -5, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <Image
            src="/pokeball.svg"
            alt="Pokeball"
            width={128}
            height={128}
            className="w-full h-full drop-shadow-2xl"
            priority
          />
        </motion.div>

        <motion.h1
          variants={fadeInUp}
          className="text-4xl sm:text-5xl md:text-7xl font-bold mb-6 tracking-tight"
        >
          Discover the World of
          <span className="block mt-2 text-yellow-300">Pokemon</span>
        </motion.h1>

        <motion.p
          variants={fadeInUp}
          className="text-lg sm:text-xl md:text-2xl mb-10 text-white/80 max-w-2xl mx-auto"
        >
          Explore 1000+ Pokemon, compare stats, learn about evolutions,
          and test your knowledge with our quiz game
        </motion.p>

        <motion.div
          variants={fadeInUp}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link href="/pokemon">
            <Button
              size="lg"
              className="w-full sm:w-auto bg-white text-purple-600 hover:bg-white/90 font-semibold px-8 py-6 text-lg rounded-full shadow-lg hover:shadow-xl transition-all"
            >
              Explore Pokedex
            </Button>
          </Link>
          <Link href="/quiz">
            <Button
              size="lg"
              variant="outline"
              className="w-full sm:w-auto border-2 border-white text-white hover:bg-white/10 font-semibold px-8 py-6 text-lg rounded-full"
            >
              Play Quiz Game
            </Button>
          </Link>
        </motion.div>
      </motion.div>

      {/* Large rotating pokeball in corner */}
      <motion.div
        variants={rotate}
        initial="initial"
        animate="animate"
        className="absolute -bottom-32 -right-32 w-96 h-96 opacity-10 pointer-events-none"
      >
        <Image
          src="/pokeball.svg"
          alt=""
          width={384}
          height={384}
          className="w-full h-full"
        />
      </motion.div>

      {/* Running Pikachu */}
      <motion.img
        src="/pikachu-run.gif"
        alt="Running Pikachu"
        className="fixed bottom-20 left-0 z-50 pointer-events-none w-16 h-auto pixelated"
        animate={{
          x: ['-80px', 'calc(100vw + 80px)'],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: 'linear',
          repeatDelay: 2,
        }}
      />

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{
          y: [0, 10, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        <div className="w-6 h-10 rounded-full border-2 border-white/50 flex justify-center pt-2">
          <div className="w-1.5 h-3 bg-white/50 rounded-full" />
        </div>
      </motion.div>
    </section>
  );
}
