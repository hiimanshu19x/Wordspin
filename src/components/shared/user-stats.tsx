'use client';

import { useUserStats } from '@/lib/store';
import { motion } from 'framer-motion';
import { PenLine, Flame } from 'lucide-react';

export function UserStats() {
  const { totalResponses, currentStreak } = useUserStats();

  if (totalResponses === 0 && currentStreak === 0) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex items-center justify-center gap-4 text-sm text-muted-foreground mt-4 mb-2"
    >
      <div className="flex items-center gap-1.5">
        <PenLine className="w-4 h-4" />
        <span>{totalResponses} responses written</span>
      </div>
      <span>&middot;</span>
      <div className="flex items-center gap-1.5">
        <Flame className="w-4 h-4 text-orange-500" />
        <span>{currentStreak} day streak</span>
      </div>
    </motion.div>
  );
}
