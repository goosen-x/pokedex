'use client';

import { useEffect, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useQuizStore } from '@/stores/quiz-store';
import { useRandomPokemon } from '@/hooks/use-random-pokemon';
import { formatPokemonName } from '@/lib/api/pokeapi';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { PokemonSilhouette } from './pokemon-silhouette';
import { QuizOptions } from './quiz-options';
import { QuizStats } from './quiz-stats';
import { QuizResult } from './quiz-result';
import { GenerationSelect } from './generation-select';
import { cn } from '@/lib/utils';

export function QuizGame() {
  const {
    currentPokemon,
    options,
    isRevealed,
    selectedAnswer,
    isCorrect,
    isLoading,
    score,
    streak,
    bestStreak,
    totalRounds,
    correctAnswers,
    generation,
    setGeneration,
    startNewRound,
    selectAnswer,
    nextRound,
    resetGame,
    setLoading,
  } = useQuizStore();

  const { loadRandomPokemon } = useRandomPokemon();

  const loadNewRound = useCallback(async () => {
    setLoading(true);
    try {
      const { pokemon, options } = await loadRandomPokemon(generation);
      startNewRound(pokemon, options);
    } catch (error) {
      console.error('Failed to load pokemon:', error);
      setLoading(false);
    }
  }, [generation, loadRandomPokemon, setLoading, startNewRound]);

  useEffect(() => {
    if (!currentPokemon && !isLoading) {
      loadNewRound();
    }
  }, [currentPokemon, isLoading, loadNewRound]);

  const handleNextRound = () => {
    loadNewRound(); // startNewRound will reset state when new pokemon is ready
  };

  const handleGenerationChange = (gen: number | null) => {
    setGeneration(gen);
    nextRound();
  };

  const correctName = currentPokemon ? formatPokemonName(currentPokemon.name) : null;

  return (
    <div className="mx-auto max-w-lg space-y-6">
      {/* Stats */}
      <QuizStats
        score={score}
        streak={streak}
        bestStreak={bestStreak}
        totalRounds={totalRounds}
        correctAnswers={correctAnswers}
      />

      {/* Generation Select */}
      <div className="flex items-center justify-between">
        <GenerationSelect
          value={generation}
          onChange={handleGenerationChange}
          disabled={isLoading}
        />
        <Button variant="ghost" size="sm" onClick={resetGame}>
          Reset
        </Button>
      </div>

      <Card>
        <CardContent className="space-y-6 p-6">
          {/* Title */}
          <h2 className="text-center text-2xl font-bold">Who&apos;s That Pokemon?</h2>

          {/* Silhouette with crossfade */}
          <div className="flex justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentPokemon?.id ?? 'loading'}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
              >
                <PokemonSilhouette
                  pokemonId={currentPokemon?.id ?? null}
                  isRevealed={isRevealed}
                />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Result - fixed height to prevent layout shift */}
          <div className="h-[72px] flex items-center">
            <AnimatePresence mode="wait">
              {isRevealed && currentPokemon && isCorrect !== null && (
                <motion.div
                  key="result"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="w-full"
                >
                  <QuizResult pokemon={currentPokemon} isCorrect={isCorrect} />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <Separator />

          {/* Options with crossfade */}
          <AnimatePresence mode="wait">
            <motion.div
              key={options.join(',')}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
            >
              <QuizOptions
                options={options}
                selectedAnswer={selectedAnswer}
                correctAnswer={correctName}
                isRevealed={isRevealed}
                onSelect={selectAnswer}
                disabled={isLoading || options.length === 0}
              />
            </motion.div>
          </AnimatePresence>

          {/* Next Button - always in DOM to prevent layout shift */}
          <Button
            className={cn(
              'w-full transition-opacity duration-200',
              isRevealed ? 'opacity-100' : 'opacity-0 pointer-events-none'
            )}
            size="lg"
            onClick={handleNextRound}
          >
            Next Pokemon
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
