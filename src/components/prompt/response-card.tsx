'use client';

import { WritingResponse } from '@/lib/types';
import { motion } from 'framer-motion';
import { User, Clock } from 'lucide-react';
import { useState } from 'react';

interface ResponseCardProps {
  response: WritingResponse;
  isExpanded?: boolean;
  onToggleExpand?: () => void;
}

export function ResponseCard({ response, isExpanded: controlledIsExpanded, onToggleExpand }: ResponseCardProps) {
  const [localIsExpanded, setLocalIsExpanded] = useState(false);
  
  const isExpanded = controlledIsExpanded !== undefined ? controlledIsExpanded : localIsExpanded;
  const toggleExpand = onToggleExpand || (() => setLocalIsExpanded(!localIsExpanded));

  const shouldTruncate = !isExpanded && response.body.length > 150;
  const displayText = shouldTruncate 
    ? response.body.slice(0, 150).trim() + '...'
    : response.body;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      whileHover={{ y: -2 }}
      transition={{ duration: 0.3 }}
      className="bg-card rounded-xl border border-border p-6 md:p-8"
    >
      <div className="font-serif text-base md:text-lg leading-relaxed text-foreground whitespace-pre-wrap mb-6">
        {displayText}
        {shouldTruncate && (
          <button 
            onClick={toggleExpand}
            className="ml-2 text-primary hover:underline text-sm font-sans font-medium"
          >
            Read more
          </button>
        )}
        {!shouldTruncate && response.body.length > 150 && (
           <button 
           onClick={toggleExpand}
           className="ml-2 text-primary hover:underline text-sm font-sans font-medium block mt-2"
         >
           Show less
         </button>
        )}
      </div>

      <div className="flex justify-between items-center text-xs text-muted-foreground pt-4 border-t border-border/50">
        <div className="flex items-center gap-1.5">
          <User className="w-3.5 h-3.5" />
          <span>{response.author ?? 'Anonymous'}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Clock className="w-3.5 h-3.5" />
          <span>{response.wordCount} words &middot; ~{response.readingTimeSeconds}s read</span>
        </div>
      </div>
    </motion.div>
  );
}
