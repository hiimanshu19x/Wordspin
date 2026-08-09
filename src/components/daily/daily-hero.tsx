'use client';

import { Prompt } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { AnimatedText } from '@/components/shared/animated-text';
import Link from 'next/link';

interface DailyHeroProps {
  prompt: Prompt;
  date: string;
  responseCount: number;
}

export function DailyHero({ prompt, date, responseCount }: DailyHeroProps) {
  return (
    <section className="w-full py-12 md:py-20 px-4 flex flex-col items-center justify-center text-center">
      <div className="text-sm uppercase tracking-widest text-muted-foreground font-medium mb-4">
        {date}
      </div>
      <h2 className="font-serif text-lg text-muted-foreground mb-6">
        Daily Prompt
      </h2>
      
      <div className="w-full max-w-2xl mx-auto relative">
        {/* Subtle decorative top line */}
        <div className="h-px w-24 bg-border/80 mx-auto mb-8" />
        
        <AnimatedText
          text={prompt.text}
          animation="blur"
          className="font-serif italic text-2xl md:text-3xl lg:text-4xl leading-relaxed text-foreground"
        />
        
        {/* Subtle decorative bottom line */}
        <div className="h-px w-24 bg-border/80 mx-auto mt-8 mb-6" />
      </div>

      <div className="flex flex-col items-center mt-2 space-y-4">
        <Badge variant="secondary" className="px-3 py-1 bg-secondary/50 hover:bg-secondary/70">
          {prompt.category}
        </Badge>
        <p className="text-sm text-muted-foreground">
          {responseCount} {responseCount === 1 ? 'perspective' : 'perspectives'} shared today
        </p>
        
        <div className="pt-6">
          <Button size="lg" asChild>
            <Link href={`/write/${prompt.id}`}>Write Your Response</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
