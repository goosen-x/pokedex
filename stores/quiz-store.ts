import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Pokemon } from '@/lib/types/pokemon';
import { formatPokemonName } from '@/lib/api/pokeapi';

interface QuizState {
  // Current round
  currentPokemon: Pokemon | null;
  options: string[];
  isRevealed: boolean;
  selectedAnswer: string | null;
  isCorrect: boolean | null;
  isLoading: boolean;

  // Statistics (persisted)
  score: number;
  streak: number;
  bestStreak: number;
  totalRounds: number;
  correctAnswers: number;

  // Settings
  generation: number | null;

  // Actions
  setGeneration: (gen: number | null) => void;
  startNewRound: (pokemon: Pokemon, options: string[]) => void;
  selectAnswer: (answer: string) => void;
  nextRound: () => void;
  resetGame: () => void;
  setLoading: (loading: boolean) => void;
}

export const useQuizStore = create<QuizState>()(
  persist(
    (set, get) => ({
      // Initial state
      currentPokemon: null,
      options: [],
      isRevealed: false,
      selectedAnswer: null,
      isCorrect: null,
      isLoading: false,

      score: 0,
      streak: 0,
      bestStreak: 0,
      totalRounds: 0,
      correctAnswers: 0,

      generation: null,

      // Actions
      setGeneration: (gen) => set({ generation: gen }),

      setLoading: (loading) => set({
        isLoading: loading,
        // Hide result immediately when starting to load next round
        ...(loading && { isRevealed: false })
      }),

      startNewRound: (pokemon, options) =>
        set({
          currentPokemon: pokemon,
          options,
          isRevealed: false,
          selectedAnswer: null,
          isCorrect: null,
          isLoading: false,
        }),

      selectAnswer: (answer) => {
        const { currentPokemon, streak, bestStreak, score, totalRounds, correctAnswers } = get();

        if (!currentPokemon) return;

        const correctName = formatPokemonName(currentPokemon.name);
        const isCorrect = answer === correctName;

        const newStreak = isCorrect ? streak + 1 : 0;
        const newBestStreak = Math.max(bestStreak, newStreak);
        const newScore = isCorrect ? score + 10 : score;

        set({
          selectedAnswer: answer,
          isRevealed: true,
          isCorrect,
          streak: newStreak,
          bestStreak: newBestStreak,
          score: newScore,
          totalRounds: totalRounds + 1,
          correctAnswers: isCorrect ? correctAnswers + 1 : correctAnswers,
        });
      },

      nextRound: () =>
        set({
          currentPokemon: null,
          options: [],
          isRevealed: false,
          selectedAnswer: null,
          isCorrect: null,
        }),

      resetGame: () =>
        set({
          currentPokemon: null,
          options: [],
          isRevealed: false,
          selectedAnswer: null,
          isCorrect: null,
          score: 0,
          streak: 0,
          totalRounds: 0,
          correctAnswers: 0,
        }),
    }),
    {
      name: 'quiz-storage',
      partialize: (state) => ({
        score: state.score,
        bestStreak: state.bestStreak,
        totalRounds: state.totalRounds,
        correctAnswers: state.correctAnswers,
        generation: state.generation,
      }),
    }
  )
);
