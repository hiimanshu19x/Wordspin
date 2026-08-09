'use client';

import { use, useState } from 'react';
import { PromptHero } from '@/components/prompt/prompt-hero';
import { ResponseFeed } from '@/components/prompt/response-feed';
import { useResponses, getPromptById } from '@/lib/store';
import { SectionWrapper } from '@/components/shared/section-wrapper';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function PromptPage({ params }: { params: Promise<{ promptId: string }> }) {
  const { promptId } = use(params);
  const prompt = getPromptById(promptId);
  const { responses } = useResponses(promptId);
  const [sortBy, setSortBy] = useState<'newest' | 'shortest' | 'longest'>('newest');

  if (!prompt) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center pt-20">
        <div className="text-center space-y-4">
          <h1 className="font-serif text-3xl">Prompt not found</h1>
          <p className="text-muted-foreground">The prompt you are looking for does not exist.</p>
          <Button asChild>
            <Link href="/spin">Spin a Prompt</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-20 pb-24">
      <PromptHero 
        prompt={prompt} 
        responseCount={responses.length} 
      />
      
      <SectionWrapper maxWidth="md" className="pt-8">
        <ResponseFeed 
          responses={responses} 
          sortBy={sortBy} 
          onSortChange={setSortBy} 
          promptId={prompt.id}
        />
      </SectionWrapper>
    </div>
  );
}
