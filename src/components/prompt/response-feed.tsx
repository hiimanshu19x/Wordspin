'use client';

import { WritingResponse } from '@/lib/types';
import { ResponseCard } from './response-card';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { PenLine } from 'lucide-react';
import Link from 'next/link';

interface ResponseFeedProps {
  responses: WritingResponse[];
  sortBy?: 'newest' | 'shortest' | 'longest' | 'liked';
  onSortChange?: (sort: 'newest' | 'shortest' | 'longest' | 'liked') => void;
  promptId?: string;
}

export function ResponseFeed({ responses, sortBy: controlledSortBy, onSortChange, promptId }: ResponseFeedProps) {
  const [localSortBy, setLocalSortBy] = useState<'newest' | 'shortest' | 'longest' | 'liked'>('newest');
  const sortBy = controlledSortBy || localSortBy;

  const handleSortChange = (sort: 'newest' | 'shortest' | 'longest' | 'liked') => {
    if (onSortChange) {
      onSortChange(sort);
    } else {
      setLocalSortBy(sort);
    }
  };

  const sortedResponses = [...responses].sort((a, b) => {
    if (sortBy === 'newest') {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    }
    if (sortBy === 'shortest') {
      return a.wordCount - b.wordCount;
    }
    if (sortBy === 'longest') {
      return b.wordCount - a.wordCount;
    }
    if (sortBy === 'liked') {
      return (b.reactions || 0) - (a.reactions || 0);
    }
    return 0;
  });

  if (responses.length === 0) {
    return (
      <div className="py-20 flex flex-col items-center justify-center text-center px-4">
        <div className="w-16 h-16 bg-muted/50 rounded-full flex items-center justify-center mb-6 text-muted-foreground">
          <PenLine className="w-8 h-8" />
        </div>
        <h3 className="font-serif text-xl md:text-2xl mb-2 text-foreground">No perspectives yet</h3>
        <p className="text-muted-foreground mb-8">Be the first to share your thoughts on this prompt.</p>
        {promptId && (
          <Button asChild>
            <Link href={`/write/${promptId}`}>Write Response</Link>
          </Button>
        )}
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="flex items-center justify-center gap-2 mb-8 flex-wrap">
        {(['newest', 'liked', 'shortest', 'longest'] as const).map((sort) => (
          <Button
            key={sort}
            variant={sortBy === sort ? 'secondary' : 'ghost'}
            size="sm"
            onClick={() => handleSortChange(sort)}
            className="capitalize"
          >
            {sort === 'liked' ? 'Most liked' : sort}
          </Button>
        ))}
      </div>

      <div className="flex flex-col gap-6">
        {sortedResponses.map((response, index) => (
          <motion.div
            key={response.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.4 }}
          >
            <ResponseCard response={response} />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
