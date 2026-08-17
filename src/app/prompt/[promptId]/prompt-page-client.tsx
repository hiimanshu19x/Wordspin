'use client';

import { useState } from 'react';
import { PromptHero } from '@/components/prompt/prompt-hero';
import { ResponseFeed } from '@/components/prompt/response-feed';
import { useResponses, getPromptById } from '@/lib/store';
import { SectionWrapper } from '@/components/shared/section-wrapper';

export default function PromptPageClient({ promptId }: { promptId: string }) {
  const prompt = getPromptById(promptId);
  const { responses } = useResponses(promptId);
  const [sortBy, setSortBy] = useState<'newest' | 'shortest' | 'longest' | 'liked'>('newest');

  if (!prompt) return null;

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
