'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { User, UserMinus } from 'lucide-react'
import { cn } from '@/lib/utils'

interface WritingToolbarProps {
  wordCount: number
  maxWords?: number
  isAnonymous: boolean
  onToggleAnonymous: () => void
  onSubmit: () => void
  canSubmit: boolean
  isSaved: boolean
}

export function WritingToolbar({
  wordCount,
  maxWords = 200,
  isAnonymous,
  onToggleAnonymous,
  onSubmit,
  canSubmit,
  isSaved
}: WritingToolbarProps) {
  const getWordCountColor = () => {
    if (wordCount > maxWords) return 'text-destructive'
    if (wordCount >= maxWords - 20) return 'text-accent'
    if (wordCount >= maxWords - 60) return 'text-amber-500'
    return 'text-muted-foreground'
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-background/80 backdrop-blur-lg border-t border-border px-4 py-3 z-30">
      <div className="max-w-3xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-0">
        <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-start">
          <div className={cn("text-sm font-medium transition-colors", getWordCountColor())}>
            {wordCount} / {maxWords} words
          </div>
          <AnimatePresence>
            {isSaved && (
              <motion.div
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="text-xs text-muted-foreground"
              >
                Saved ✓
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        
        <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggleAnonymous}
            className="flex items-center gap-2"
          >
            {isAnonymous ? (
              <>
                <UserMinus className="w-4 h-4" />
                <span>Anonymous</span>
              </>
            ) : (
              <>
                <User className="w-4 h-4" />
                <span>Named</span>
              </>
            )}
          </Button>
          
          <Button
            onClick={onSubmit}
            disabled={!canSubmit}
          >
            Submit
          </Button>
        </div>
      </div>
    </div>
  )
}
