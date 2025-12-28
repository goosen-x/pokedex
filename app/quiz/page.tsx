import { Header } from '@/components/shared/header';
import { QuizGame } from '@/components/quiz/quiz-game';

export const metadata = {
  title: "Who's That Pokemon? | Pokedex",
  description: 'Test your Pokemon knowledge with the silhouette quiz game',
};

export default function QuizPage() {
  return (
    <>
      <Header />
      <div className="container mx-auto px-3">
        <QuizGame />
      </div>
    </>
  );
}
