'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { usePrompts } from '@/lib/store';
import { PromptCard } from '@/components/shared/prompt-card';
import { CategoryFilter } from './category-filter';
import type { Prompt } from '@/lib/types';
import type { PromptCategory } from '@/lib/constants';
import { Card, CardContent } from '@/components/ui/card';

type SpinPhase = 'idle' | 'spinning' | 'revealing';

export function PromptSpinner() {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const { prompts, getRandomPrompt, categories } = usePrompts((selectedCategory as PromptCategory) || undefined);
  
  const [currentPrompt, setCurrentPrompt] = useState<Prompt | null>(null);
  const [seenPromptIds, setSeenPromptIds] = useState<Set<string>>(new Set());
  const [phase, setPhase] = useState<SpinPhase>('idle');

  useEffect(() => {
    if (!currentPrompt && prompts.length > 0) {
      const timer = setTimeout(() => {
        const initial = getRandomPrompt();
        setCurrentPrompt(initial);
        if (initial) {
          setSeenPromptIds((prev) => new Set(prev).add(initial.id));
        }
      }, 0);
      return () => clearTimeout(timer);
    }
  }, [prompts, currentPrompt, getRandomPrompt]);

  const handleSpin = useCallback(() => {
    if (phase !== 'idle') return;

    setPhase('spinning');

    setTimeout(() => {
      let newPrompt = getRandomPrompt();
      
      if (seenPromptIds.size >= prompts.length && prompts.length > 0) {
        setSeenPromptIds(new Set([newPrompt?.id].filter(Boolean) as string[]));
      } else {
        for (let i = 0; i < 5; i++) {
          if (newPrompt && !seenPromptIds.has(newPrompt.id)) {
            break;
          }
          newPrompt = getRandomPrompt();
        }
        if (newPrompt) {
          setSeenPromptIds((prev) => new Set(prev).add(newPrompt!.id));
        }
      }

      setCurrentPrompt(newPrompt);
      setPhase('revealing');
      
      setTimeout(() => {
        setPhase('idle');
      }, 400);
    }, 400);
  }, [phase, getRandomPrompt, seenPromptIds, prompts.length]);

  const handleCategorySelect = (category: string | null) => {
    setSelectedCategory(category);
    setCurrentPrompt(null);
    setSeenPromptIds(new Set());
  };

  const remainingText = selectedCategory 
    ? `Showing ${selectedCategory} prompts` 
    : `${prompts.length} prompts available`;

  return (
    <div className="flex flex-col items-center w-full max-w-xl mx-auto gap-8">
      <CategoryFilter 
        categories={categories} 
        selected={selectedCategory} 
        onSelect={handleCategorySelect} 
      />

      <div className="relative w-full min-h-[300px] flex items-center justify-center">
        <AnimatePresence mode="wait">
          {phase === 'idle' && currentPrompt && (
            <motion.div
              key={currentPrompt.id}
              initial={{ scale: 1.05, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0, filter: 'blur(4px)' }}
              transition={{ type: 'spring' as const, stiffness: 300, damping: 25 }}
              className="w-full"
            >
              <PromptCard 
                prompt={currentPrompt} 
                onSpin={handleSpin}
                onWrite={() => router.push(`/write/${currentPrompt.id}`)}
              />
            </motion.div>
          )}

          {(phase === 'spinning' || phase === 'revealing' || !currentPrompt) && (
            <motion.div
              key="spinning-placeholder"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ 
                opacity: 0.5, 
                scale: [0.95, 0.98, 0.95],
                filter: ['blur(4px)', 'blur(2px)', 'blur(4px)']
              }}
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{ 
                duration: 0.4, 
                repeat: phase === 'spinning' ? Infinity : 0 
              }}
              className="w-full absolute inset-0 flex items-center justify-center"
            >
              <Card className="w-full h-full border-dashed bg-muted/20 flex flex-col items-center justify-center min-h-[250px]">
                <CardContent className="flex flex-col items-center gap-4">
                  <div className="w-8 h-8 rounded-full border-2 border-primary border-t-transparent animate-spin" />
                  <p className="text-sm text-muted-foreground font-medium animate-pulse">
                    Finding inspiration...
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <p className="text-sm text-muted-foreground transition-opacity">
        {remainingText}
      </p>
    </div>
  );
}
