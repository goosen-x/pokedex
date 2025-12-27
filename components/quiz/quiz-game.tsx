'use client';

import { useEffect, useCallback } from 'react';
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
    nextRound();
    loadNewRound();
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

          {/* Silhouette */}
          <div className="flex justify-center">
            <PokemonSilhouette
              pokemonId={currentPokemon?.id ?? null}
              isRevealed={isRevealed}
              isLoading={isLoading}
            />
          </div>

          {/* Result */}
          {isRevealed && currentPokemon && isCorrect !== null && (
            <QuizResult pokemon={currentPokemon} isCorrect={isCorrect} />
          )}

          <Separator />

          {/* Options */}
          <QuizOptions
            options={options}
            selectedAnswer={selectedAnswer}
            correctAnswer={correctName}
            isRevealed={isRevealed}
            onSelect={selectAnswer}
            disabled={isLoading || options.length === 0}
          />

          {/* Next Button */}
          {isRevealed && (
            <Button className="w-full" size="lg" onClick={handleNextRound}>
              Next Pokemon
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
