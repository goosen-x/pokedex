'use client';

import { useEffect, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Settings, ChevronUp } from 'lucide-react';
import { useQuizStore } from '@/stores/quiz-store';
import { useRandomPokemon } from '@/hooks/use-random-pokemon';
import { formatPokemonName } from '@/lib/api/pokeapi';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import { PokemonSilhouette } from './pokemon-silhouette';
import { QuizOptions } from './quiz-options';
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
    loadNewRound();
  };

  const handleGenerationChange = (gen: number | null) => {
    setGeneration(gen);
    nextRound();
  };

  const correctName = currentPokemon ? formatPokemonName(currentPokemon.name) : null;
  const accuracy = totalRounds > 0 ? Math.round((correctAnswers / totalRounds) * 100) : 0;

  return (
    <div className="mx-auto max-w-lg">
      <Card className="py-0">
        <CardContent className="p-4 space-y-4">
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
                  compact
                />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Result - fixed height to prevent layout shift */}
          <div className="h-[48px] flex items-center justify-center">
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
                compact
              />
            </motion.div>
          </AnimatePresence>

          {/* Next Button */}
          <Button
            className={cn(
              'w-full h-12 transition-opacity duration-200',
              isRevealed ? 'opacity-100' : 'opacity-0 pointer-events-none'
            )}
            onClick={handleNextRound}
          >
            Next Pokemon
          </Button>
        </CardContent>
      </Card>

      {/* Floating Stats Button with Drawer */}
      <Drawer>
        <DrawerTrigger asChild>
          <Button
            variant="secondary"
            size="sm"
            className="fixed bottom-4 left-1/2 -translate-x-1/2 rounded-full shadow-lg gap-2 z-40"
          >
            <Settings className="h-4 w-4" />
            <span>Score: {score}</span>
            <span className="text-muted-foreground">|</span>
            <span>Streak: {streak}</span>
            <ChevronUp className="h-4 w-4" />
          </Button>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Quiz Stats & Settings</DrawerTitle>
          </DrawerHeader>
          <div className="p-4 pb-8 space-y-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-4 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold">{score}</div>
                <div className="text-xs text-muted-foreground">Score</div>
              </div>
              <div>
                <div className="text-2xl font-bold">{streak}</div>
                <div className="text-xs text-muted-foreground">Streak</div>
              </div>
              <div>
                <div className="text-2xl font-bold">{bestStreak}</div>
                <div className="text-xs text-muted-foreground">Best</div>
              </div>
              <div>
                <div className="text-2xl font-bold">{accuracy}%</div>
                <div className="text-xs text-muted-foreground">Accuracy</div>
              </div>
            </div>

            {/* Progress */}
            {totalRounds > 0 && (
              <div className="text-center text-sm text-muted-foreground">
                {correctAnswers} correct out of {totalRounds} rounds
              </div>
            )}

            {/* Generation Select */}
            <div className="flex items-center gap-3">
              <GenerationSelect
                value={generation}
                onChange={handleGenerationChange}
                disabled={isLoading}
              />
              <Button variant="outline" onClick={resetGame} className="flex-shrink-0">
                Reset Game
              </Button>
            </div>
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  );
}
