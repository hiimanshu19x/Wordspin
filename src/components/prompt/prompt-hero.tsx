'use client';

import { Prompt } from '@/lib/types';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { AnimatedText } from '@/components/shared/animated-text';
import Link from 'next/link';

interface PromptHeroProps {
  prompt: Prompt;
  responseCount: number;
  hasUserResponse?: boolean;
}

export function PromptHero({ prompt, responseCount, hasUserResponse }: PromptHeroProps) {
  return (
    <div className="py-16 md:py-20 px-4 flex flex-col items-center justify-center space-y-6 text-center">
      <Badge variant="muted" className="mb-2">
        {prompt.category}
      </Badge>
      
      <AnimatedText
        text={prompt.text}
        className="font-serif italic text-2xl md:text-3xl lg:text-4xl max-w-2xl mx-auto leading-relaxed text-foreground"
        animation="fade-up"
      />
      
      <p className="text-sm text-muted-foreground">
        {responseCount} {responseCount === 1 ? 'perspective shared' : 'perspectives shared'}
      </p>

      {!hasUserResponse && (
        <Button asChild variant="default" className="mt-4">
          <Link href={`/write/${prompt.id}`}>Write Your Response</Link>
        </Button>
      )}
    </div>
  );
}
