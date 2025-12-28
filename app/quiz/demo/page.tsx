'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Settings, ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import { cn } from '@/lib/utils';

// Mock data
const mockPokemon = {
  id: 50,
  name: 'Diglett',
  image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/50.png',
};

const mockOptions = ['Diglett', 'Geodude', 'Sandshrew', 'Cubone'];
const mockStats = { score: 0, streak: 0, best: 2, rounds: 3, correct: 0 };

// Shared Option Button
function OptionButton({
  name,
  isCorrect,
  isWrong,
  isRevealed,
  small = false
}: {
  name: string;
  isCorrect?: boolean;
  isWrong?: boolean;
  isRevealed?: boolean;
  small?: boolean;
}) {
  return (
    <Button
      variant={isCorrect ? 'default' : isWrong ? 'destructive' : 'outline'}
      className={cn(
        small ? 'h-10 text-sm' : 'h-12 text-base',
        isCorrect && 'bg-green-500 hover:bg-green-500 text-white border-green-500'
      )}
      disabled={isRevealed}
    >
      {name}
    </Button>
  );
}

// ============ VARIANT 1: Compact ============
function Variant1Compact() {
  return (
    <div className="space-y-3">
      {/* Inline Stats Row */}
      <div className="flex items-center justify-between text-xs px-1">
        <div className="flex gap-2">
          <span className="text-muted-foreground">Score: <strong>0</strong></span>
          <span className="text-muted-foreground">Streak: <strong>0</strong></span>
        </div>
        <span className="text-muted-foreground">Gen 1</span>
      </div>

      <Card>
        <CardContent className="p-4 space-y-3">
          {/* Smaller Image */}
          <div className="flex justify-center">
            <div className="relative h-40 w-40">
              <Image
                src={mockPokemon.image}
                alt="Pokemon"
                fill
                className="object-contain"
              />
            </div>
          </div>

          {/* Result */}
          <div className="text-center py-2">
            <Badge variant="destructive" className="text-sm px-4 py-1">
              Wrong! It was {mockPokemon.name}
            </Badge>
          </div>

          {/* Compact Options 2x2 */}
          <div className="grid grid-cols-2 gap-2">
            {mockOptions.map((opt) => (
              <OptionButton
                key={opt}
                name={opt}
                isCorrect={opt === 'Diglett'}
                isWrong={opt === 'Geodude'}
                isRevealed
                small
              />
            ))}
          </div>

          <Button className="w-full" size="sm">Next Pokemon</Button>
        </CardContent>
      </Card>
    </div>
  );
}

// ============ VARIANT 2: Bottom Sheet Stats ============
function Variant2BottomSheet() {
  return (
    <div className="space-y-3">
      <Card>
        <CardContent className="p-4 space-y-3">
          {/* Image */}
          <div className="flex justify-center">
            <div className="relative h-44 w-44">
              <Image
                src={mockPokemon.image}
                alt="Pokemon"
                fill
                className="object-contain"
              />
            </div>
          </div>

          {/* Result */}
          <div className="text-center py-1">
            <Badge variant="destructive" className="text-sm px-4 py-1">
              Wrong! It was {mockPokemon.name}
            </Badge>
          </div>

          {/* Options */}
          <div className="grid grid-cols-2 gap-2">
            {mockOptions.map((opt) => (
              <OptionButton
                key={opt}
                name={opt}
                isCorrect={opt === 'Diglett'}
                isWrong={opt === 'Geodude'}
                isRevealed
                small
              />
            ))}
          </div>

          <Button className="w-full" size="sm">Next Pokemon</Button>
        </CardContent>
      </Card>

      {/* Floating Stats Button */}
      <Drawer>
        <DrawerTrigger asChild>
          <Button
            variant="secondary"
            size="sm"
            className="fixed bottom-4 left-1/2 -translate-x-1/2 rounded-full shadow-lg gap-2"
          >
            <Settings className="h-4 w-4" />
            Score: 0 | Streak: 0
            <ChevronUp className="h-4 w-4" />
          </Button>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Quiz Settings</DrawerTitle>
          </DrawerHeader>
          <div className="p-4 space-y-4">
            <div className="flex justify-around">
              <div className="text-center">
                <div className="text-2xl font-bold">0</div>
                <div className="text-xs text-muted-foreground">Score</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">0</div>
                <div className="text-xs text-muted-foreground">Streak</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">2</div>
                <div className="text-xs text-muted-foreground">Best</div>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" className="flex-1">Gen 1</Button>
              <Button variant="ghost">Reset</Button>
            </div>
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  );
}

// ============ VARIANT 3: Side by Side ============
function Variant3Horizontal() {
  return (
    <div className="space-y-2">
      {/* Mini Stats */}
      <div className="flex justify-between text-xs px-1">
        <span>Score: 0 | Streak: 0</span>
        <span>Gen 1</span>
      </div>

      <Card>
        <CardContent className="p-3">
          {/* Horizontal Layout */}
          <div className="flex gap-3">
            {/* Left: Image */}
            <div className="flex-shrink-0">
              <div className="relative h-32 w-32">
                <Image
                  src={mockPokemon.image}
                  alt="Pokemon"
                  fill
                  className="object-contain"
                />
              </div>
              {/* Result under image */}
              <div className="text-center mt-1">
                <Badge variant="destructive" className="text-xs">
                  Wrong!
                </Badge>
              </div>
            </div>

            {/* Right: Options vertical */}
            <div className="flex-1 flex flex-col gap-2">
              {mockOptions.map((opt) => (
                <Button
                  key={opt}
                  variant={opt === 'Diglett' ? 'default' : opt === 'Geodude' ? 'destructive' : 'outline'}
                  className={cn(
                    'h-9 text-sm justify-start',
                    opt === 'Diglett' && 'bg-green-500 hover:bg-green-500'
                  )}
                  disabled
                >
                  {opt}
                </Button>
              ))}
            </div>
          </div>

          <Button className="w-full mt-3" size="sm">Next Pokemon</Button>
        </CardContent>
      </Card>
    </div>
  );
}

// ============ VARIANT 4: Overlay Stats ============
function Variant4Overlay() {
  return (
    <div className="space-y-3">
      <Card className="overflow-hidden">
        <CardContent className="p-0">
          {/* Image with overlay stats */}
          <div className="relative">
            <div className="flex justify-center bg-muted/30 py-4">
              <div className="relative h-44 w-44">
                <Image
                  src={mockPokemon.image}
                  alt="Pokemon"
                  fill
                  className="object-contain"
                />
              </div>
            </div>

            {/* Overlay stats */}
            <div className="absolute top-2 left-2 right-2 flex justify-between">
              <Badge variant="secondary" className="text-xs">Score: 0</Badge>
              <Badge variant="secondary" className="text-xs">Streak: 0</Badge>
            </div>

            {/* Result overlay */}
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2">
              <Badge variant="destructive" className="text-sm px-4">
                Wrong! It was {mockPokemon.name}
              </Badge>
            </div>
          </div>

          {/* Options */}
          <div className="p-4 space-y-3">
            <div className="grid grid-cols-2 gap-2">
              {mockOptions.map((opt) => (
                <OptionButton
                  key={opt}
                  name={opt}
                  isCorrect={opt === 'Diglett'}
                  isWrong={opt === 'Geodude'}
                  isRevealed
                  small
                />
              ))}
            </div>
            <Button className="w-full" size="sm">Next Pokemon</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// ============ VARIANT 5: Minimal ============
function Variant5Minimal() {
  return (
    <div className="flex flex-col h-[calc(100vh-120px)]">
      {/* Ultra minimal top bar */}
      <div className="flex justify-between items-center py-2 px-1 text-xs text-muted-foreground">
        <span>0 pts</span>
        <span>Gen 1</span>
        <span>0/3</span>
      </div>

      {/* Main content - fills available space */}
      <div className="flex-1 flex flex-col justify-center">
        {/* Image - auto-sized */}
        <div className="flex justify-center mb-4">
          <div className="relative h-48 w-48">
            <Image
              src={mockPokemon.image}
              alt="Pokemon"
              fill
              className="object-contain"
            />
          </div>
        </div>

        {/* Result */}
        <div className="text-center mb-4">
          <span className="text-red-500 font-medium">Wrong! It was {mockPokemon.name}</span>
        </div>

        {/* Options */}
        <div className="grid grid-cols-2 gap-2 px-2">
          {mockOptions.map((opt) => (
            <OptionButton
              key={opt}
              name={opt}
              isCorrect={opt === 'Diglett'}
              isWrong={opt === 'Geodude'}
              isRevealed
              small
            />
          ))}
        </div>

        <Button className="mx-2 mt-4">Next Pokemon</Button>
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
        <div className="container py-3">
          <h1 className="text-lg font-bold mb-2">Quiz Mobile Variants (375px)</h1>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="w-full grid grid-cols-5 h-auto">
              <TabsTrigger value="v1" className="text-xs py-1.5">Compact</TabsTrigger>
              <TabsTrigger value="v2" className="text-xs py-1.5">Sheet</TabsTrigger>
              <TabsTrigger value="v3" className="text-xs py-1.5">Horiz</TabsTrigger>
              <TabsTrigger value="v4" className="text-xs py-1.5">Overlay</TabsTrigger>
              <TabsTrigger value="v5" className="text-xs py-1.5">Minimal</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>

      {/* Content */}
      <div className="container py-4 max-w-[375px] mx-auto">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsContent value="v1" className="mt-0">
            <div className="mb-4 p-3 bg-muted rounded-lg">
              <h3 className="font-semibold text-sm">1. Compact</h3>
              <p className="text-xs text-muted-foreground">
                Уменьшенное изображение (160px), инлайн-статистика, компактные отступы
              </p>
            </div>
            <Variant1Compact />
          </TabsContent>

          <TabsContent value="v2" className="mt-0">
            <div className="mb-4 p-3 bg-muted rounded-lg">
              <h3 className="font-semibold text-sm">2. Bottom Sheet</h3>
              <p className="text-xs text-muted-foreground">
                Статистика и настройки скрыты в drawer, кнопка внизу экрана
              </p>
            </div>
            <Variant2BottomSheet />
          </TabsContent>

          <TabsContent value="v3" className="mt-0">
            <div className="mb-4 p-3 bg-muted rounded-lg">
              <h3 className="font-semibold text-sm">3. Horizontal</h3>
              <p className="text-xs text-muted-foreground">
                Изображение слева, варианты вертикально справа
              </p>
            </div>
            <Variant3Horizontal />
          </TabsContent>

          <TabsContent value="v4" className="mt-0">
            <div className="mb-4 p-3 bg-muted rounded-lg">
              <h3 className="font-semibold text-sm">4. Overlay</h3>
              <p className="text-xs text-muted-foreground">
                Статистика поверх изображения, без Card wrapper
              </p>
            </div>
            <Variant4Overlay />
          </TabsContent>

          <TabsContent value="v5" className="mt-0">
            <div className="mb-4 p-3 bg-muted rounded-lg">
              <h3 className="font-semibold text-sm">5. Minimal</h3>
              <p className="text-xs text-muted-foreground">
                Только изображение и опции, минимум UI элементов
              </p>
            </div>
            <Variant5Minimal />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
