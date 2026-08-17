'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { RotateCw, ArrowRight, Bookmark, BookmarkCheck } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Prompt } from '@/lib/types';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useSavedPrompts } from '@/lib/store';

interface PromptCardProps {
  prompt: Prompt;
  onWrite?: () => void;
  onSpin?: () => void;
  isActive?: boolean;
  className?: string;
}

export function PromptCard({
  prompt,
  onWrite,
  onSpin,
  isActive = true,
  className
}: PromptCardProps) {
  const { isSaved, toggleSave } = useSavedPrompts();
  const saved = isSaved(prompt.id);

  return (
    <motion.div
      whileHover={isActive ? { scale: 1.01, y: -2 } : undefined}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className={cn(
        'bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm transition-shadow hover:shadow-md flex flex-col items-center text-center gap-6 md:gap-8 max-w-2xl mx-auto w-full relative',
        !isActive && 'opacity-50 pointer-events-none',
        className
      )}
    >
      <button 
        onClick={(e) => {
          e.stopPropagation();
          toggleSave(prompt.id);
        }}
        className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors p-2"
        aria-label={saved ? "Remove bookmark" : "Bookmark prompt"}
      >
        {saved ? <BookmarkCheck className="w-5 h-5 fill-current" /> : <Bookmark className="w-5 h-5" />}
      </button>

      <Badge variant="secondary" className="uppercase tracking-wider text-[10px] md:text-xs font-medium text-muted-foreground bg-muted/50 px-3 py-1">
        {prompt.category}
      </Badge>
      
      <p className="font-serif text-xl md:text-2xl italic leading-relaxed text-foreground">
        &quot;{prompt.text}&quot;
      </p>

      <div className="flex flex-row items-center justify-center gap-3 md:gap-4 mt-2">
        {onSpin && (
          <Button variant="ghost" size="lg" onClick={onSpin} className="gap-2 text-muted-foreground hover:text-foreground">
            <RotateCw className="w-4 h-4" />
            <span>Spin Again</span>
          </Button>
        )}
        
        {onWrite && (
          <Button variant="default" size="lg" onClick={onWrite} className="gap-2">
            <span>Start Writing</span>
            <ArrowRight className="w-4 h-4" />
          </Button>
        )}
      </div>
    </motion.div>
  );
}
