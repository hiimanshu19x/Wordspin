'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { MAX_WORDS } from '@/lib/constants';

interface WordCounterProps {
  count: number;
  max?: number;
  className?: string;
}

export function WordCounter({
  count,
  max = MAX_WORDS,
  className
}: WordCounterProps) {
  const percentage = Math.min((count / max) * 100, 100);
  
  // Determine color states based on progress
  let colorState = 'text-muted-foreground';
  if (percentage >= 100 && count > max) {
    colorState = 'text-red-500';
  } else if (percentage >= 90) {
    colorState = 'text-accent';
  } else if (percentage >= 70) {
    colorState = 'text-amber-500';
  }

  const radius = 20;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className={cn('flex flex-col items-center justify-center', className)}>
      <div className="relative w-12 h-12 flex items-center justify-center">
        {/* Background circle */}
        <svg className="absolute inset-0 w-full h-full -rotate-90">
          <circle
            cx="24"
            cy="24"
            r={radius}
            fill="transparent"
            stroke="currentColor"
            strokeWidth="3"
            className="text-border"
          />
          {/* Progress circle */}
          <circle
            cx="24"
            cy="24"
            r={radius}
            fill="transparent"
            stroke="currentColor"
            strokeWidth="3"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            className={cn("transition-all duration-500 ease-out", colorState)}
            strokeLinecap="round"
          />
        </svg>
        
        {/* Count text inside */}
        <span className={cn("text-xs font-medium transition-colors duration-300", colorState)}>
          {count}
        </span>
      </div>
      <span className="text-muted-foreground text-[10px] uppercase tracking-wider mt-1 font-medium">
        Words
      </span>
    </div>
  );
}
