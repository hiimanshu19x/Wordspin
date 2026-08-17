'use client';

import { WritingResponse } from '@/lib/types';
import { RESPONSE_TRUNCATION_CHARS } from '@/lib/constants';
import { motion } from 'framer-motion';
import { User, Clock, Heart, Share2 } from 'lucide-react';
import { useState } from 'react';
import { useReactions } from '@/lib/store';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

interface ResponseCardProps {
  response: WritingResponse;
  isExpanded?: boolean;
  onToggleExpand?: () => void;
}

export function ResponseCard({ response, isExpanded: controlledIsExpanded, onToggleExpand }: ResponseCardProps) {
  const [localIsExpanded, setLocalIsExpanded] = useState(false);
  const [copied, setCopied] = useState(false);
  
  const { isLiked, toggleReaction } = useReactions();
  const liked = isLiked(response.id);
  
  const isExpanded = controlledIsExpanded !== undefined ? controlledIsExpanded : localIsExpanded;
  const toggleExpand = onToggleExpand || (() => setLocalIsExpanded(!localIsExpanded));

  const shouldTruncate = !isExpanded && response.body.length > RESPONSE_TRUNCATION_CHARS;
  const displayText = shouldTruncate 
    ? response.body.slice(0, RESPONSE_TRUNCATION_CHARS).trim() + '...'
    : response.body;

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.origin + '/prompt/' + response.promptId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

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
        {!shouldTruncate && response.body.length > RESPONSE_TRUNCATION_CHARS && (
           <button 
           onClick={toggleExpand}
           className="ml-2 text-primary hover:underline text-sm font-sans font-medium block mt-2"
         >
           Show less
         </button>
        )}
      </div>

      <div className="flex justify-between items-center text-xs text-muted-foreground pt-4 border-t border-border/50">
        <div className="flex items-center gap-1.5 flex-wrap">
          <User className="w-3.5 h-3.5" />
          <span>{response.author ?? 'Anonymous'}</span>
          <span className="mx-1">&middot;</span>
          <Clock className="w-3.5 h-3.5" />
          <span>{response.wordCount} words &middot; ~{response.readingTimeSeconds}s read</span>
          {response.isSeeded && (
            <Badge variant="outline" className="text-xs ml-2">Example</Badge>
          )}
        </div>
        <div className="flex items-center gap-4">
          <button onClick={handleShare} className="flex items-center gap-1.5 hover:text-foreground transition-colors" title="Share prompt">
            <Share2 className="w-4 h-4" />
            {copied && <span className="text-[10px]">Copied!</span>}
          </button>
          <button 
            onClick={() => toggleReaction(response.id)} 
            className="flex items-center gap-1.5 hover:text-red-500 transition-colors"
          >
            <Heart className={cn("w-4 h-4", liked && "fill-current text-red-500")} />
            <span>{(response.reactions || 0) + (liked ? 1 : 0)}</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
}
