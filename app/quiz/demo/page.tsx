'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Settings, ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';

// Mock data
const mockPokemon = {
  id: 720,
  name: 'Hoopa',
  image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/720.png',
};

const mockOptions = ['Drednaw', 'Pikachu', 'Hoopa', 'Gigalith'];

// Shared Option Button
function OptionButton({
  name,
  isCorrect,
  isWrong,
  small = false
}: {
  name: string;
  isCorrect?: boolean;
  isWrong?: boolean;
  small?: boolean;
}) {
  return (
    <Button
      variant={isCorrect ? 'default' : isWrong ? 'destructive' : 'outline'}
      className={cn(
        'w-full',
        small ? 'h-10 text-sm' : 'h-11 text-base',
        isCorrect && 'bg-green-500 hover:bg-green-500 text-white border-green-500'
      )}
      disabled
    >
      {name}
    </Button>
  );
}

// Result Badge
function ResultBadge() {
  return (
    <div className="rounded-xl border-2 px-4 py-2 text-center border-red-500 bg-red-500/10">
      <p className="text-base font-bold mb-0.5 text-red-500">Wrong!</p>
      <p className="text-sm text-muted-foreground">It's {mockPokemon.name} #{mockPokemon.id}</p>
    </div>
  );
}

// Floating Stats Button
function FloatingStats() {
  return (
    <Button
      variant="secondary"
      size="sm"
      className="fixed bottom-4 left-1/2 -translate-x-1/2 rounded-full shadow-lg gap-2 z-40"
    >
      <Settings className="h-4 w-4" />
      <span>Score: 30</span>
      <span className="text-muted-foreground">|</span>
      <span>Streak: 0</span>
      <ChevronUp className="h-4 w-4" />
    </Button>
  );
}

// ============ VARIANT 1: Flex Grow ============
// Использует flexbox с flex-grow для заполнения пространства
function Variant1FlexGrow() {
  return (
    <div className="h-[calc(100dvh-140px)] flex flex-col">
      <Card className="flex-1 flex flex-col py-0">
        <CardContent className="flex-1 flex flex-col p-4">
          {/* Image - grows to fill available space */}
          <div className="flex-1 flex items-center justify-center min-h-0">
            <div className="relative w-full max-w-[200px] aspect-square">
              <Image
                src={mockPokemon.image}
                alt="Pokemon"
                fill
                className="object-contain"
              />
            </div>
          </div>

          {/* Result */}
          <div className="py-3">
            <ResultBadge />
          </div>

          {/* Options - fixed at bottom */}
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-2">
              {mockOptions.map((opt) => (
                <OptionButton
                  key={opt}
                  name={opt}
                  isCorrect={opt === 'Hoopa'}
                  isWrong={opt === 'Drednaw'}
                  small
                />
              ))}
            </div>
            <Button className="w-full h-11">Next Pokemon</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// ============ VARIANT 2: CSS Grid ============
// Использует grid с fr units для пропорционального распределения
function Variant2Grid() {
  return (
    <div className="h-[calc(100dvh-140px)] pb-14">
      <Card className="h-full py-0">
        <CardContent className="h-full p-4 grid grid-rows-[1fr_auto_auto] gap-3">
          {/* Image area - takes remaining space */}
          <div className="flex items-center justify-center min-h-0">
            <div className="relative h-full max-h-[220px] aspect-square">
              <Image
                src={mockPokemon.image}
                alt="Pokemon"
                fill
                className="object-contain"
              />
            </div>
          </div>

          {/* Result */}
          <ResultBadge />

          {/* Options */}
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-2">
              {mockOptions.map((opt) => (
                <OptionButton
                  key={opt}
                  name={opt}
                  isCorrect={opt === 'Hoopa'}
                  isWrong={opt === 'Drednaw'}
                  small
                />
              ))}
            </div>
            <Button className="w-full h-11">Next Pokemon</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// ============ VARIANT 3: Dynamic Sizing ============
// Размеры элементов зависят от высоты viewport
function Variant3Dynamic() {
  return (
    <div className="h-[calc(100dvh-140px)] flex flex-col">
      <Card className="flex-1 py-0 overflow-hidden">
        <CardContent className="h-full p-4 flex flex-col justify-between">
          {/* Image - размер зависит от vh */}
          <div className="flex-1 flex items-center justify-center">
            <div className="relative" style={{ width: 'min(50vw, 25vh)', height: 'min(50vw, 25vh)' }}>
              <Image
                src={mockPokemon.image}
                alt="Pokemon"
                fill
                className="object-contain"
              />
            </div>
          </div>

          {/* Result */}
          <div className="py-2">
            <ResultBadge />
          </div>

          {/* Options */}
          <div className="space-y-2">
            <div className="grid grid-cols-2 gap-2">
              {mockOptions.map((opt) => (
                <OptionButton
                  key={opt}
                  name={opt}
                  isCorrect={opt === 'Hoopa'}
                  isWrong={opt === 'Drednaw'}
                  small
                />
              ))}
            </div>
            <Button className="w-full h-11">Next Pokemon</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// ============ VARIANT 4: No Card (Fullscreen) ============
// Без карточки, элементы на всю высоту экрана
function Variant4Fullscreen() {
  return (
    <div className="h-[calc(100dvh-140px)] flex flex-col px-1">
      {/* Image area - flexible */}
      <div className="flex-1 flex items-center justify-center min-h-0 py-2">
        <div className="relative w-full max-w-[240px] aspect-square">
          <Image
            src={mockPokemon.image}
            alt="Pokemon"
            fill
            className="object-contain drop-shadow-xl"
          />
        </div>
      </div>

      {/* Result */}
      <div className="py-3">
        <ResultBadge />
      </div>

      {/* Options - always at bottom */}
      <div className="space-y-3 pb-2">
        <div className="grid grid-cols-2 gap-2">
          {mockOptions.map((opt) => (
            <OptionButton
              key={opt}
              name={opt}
              isCorrect={opt === 'Hoopa'}
              isWrong={opt === 'Drednaw'}
            />
          ))}
        </div>
        <Button className="w-full h-12">Next Pokemon</Button>
      </div>
    </div>
  );
}

// ============ DEMO PAGE ============
export default function QuizDemoPage() {
  const [activeTab, setActiveTab] = useState('v1');

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-background/95 backdrop-blur border-b">
        <div className="container py-2">
          <h1 className="text-sm font-bold mb-2">Full Height Variants</h1>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="w-full grid grid-cols-4 h-auto">
              <TabsTrigger value="v1" className="text-xs py-1.5">Flex</TabsTrigger>
              <TabsTrigger value="v2" className="text-xs py-1.5">Grid</TabsTrigger>
              <TabsTrigger value="v3" className="text-xs py-1.5">Dynamic</TabsTrigger>
              <TabsTrigger value="v4" className="text-xs py-1.5">Full</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>

      {/* Content */}
      <div className="container py-3 max-w-lg mx-auto">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsContent value="v1" className="mt-0">
            <div className="mb-3 p-2 bg-muted rounded-lg">
              <h3 className="font-semibold text-xs">1. Flex Grow</h3>
              <p className="text-xs text-muted-foreground">
                Flexbox + flex-grow. Изображение растягивается, кнопки внизу.
              </p>
            </div>
            <Variant1FlexGrow />
          </TabsContent>

          <TabsContent value="v2" className="mt-0">
            <div className="mb-3 p-2 bg-muted rounded-lg">
              <h3 className="font-semibold text-xs">2. CSS Grid</h3>
              <p className="text-xs text-muted-foreground">
                Grid с grid-rows [1fr_auto_auto]. Верхняя часть занимает оставшееся место.
              </p>
            </div>
            <Variant2Grid />
          </TabsContent>

          <TabsContent value="v3" className="mt-0">
            <div className="mb-3 p-2 bg-muted rounded-lg">
              <h3 className="font-semibold text-xs">3. Dynamic Sizing</h3>
              <p className="text-xs text-muted-foreground">
                Размер изображения: min(50vw, 25vh). Адаптируется к ширине и высоте.
              </p>
            </div>
            <Variant3Dynamic />
          </TabsContent>

          <TabsContent value="v4" className="mt-0">
            <div className="mb-3 p-2 bg-muted rounded-lg">
              <h3 className="font-semibold text-xs">4. Fullscreen (No Card)</h3>
              <p className="text-xs text-muted-foreground">
                Без карточки. Максимальное использование пространства.
              </p>
            </div>
            <Variant4Fullscreen />
          </TabsContent>
        </Tabs>
      </div>

      <FloatingStats />
    </div>
  );
}
