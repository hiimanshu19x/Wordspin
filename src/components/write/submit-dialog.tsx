'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Prompt } from '@/lib/types'

interface SubmitDialogProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (authorName: string | null) => void
  prompt: Prompt
  body: string
  wordCount: number
}

export function SubmitDialog({
  isOpen,
  onClose,
  onSubmit,
  prompt,
  body,
  wordCount
}: SubmitDialogProps) {
  const [isAnonymous, setIsAnonymous] = useState(true)
  const [authorName, setAuthorName] = useState('')

  const handleSubmit = () => {
    onSubmit(isAnonymous ? null : authorName)
  }

  const previewText = body.length > 100 ? `${body.substring(0, 100)}...` : body

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-xl">
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="bg-card rounded-2xl border border-border p-6 md:p-8 max-w-lg w-full shadow-lg flex flex-col gap-6"
          >
            <h2 className="font-serif text-2xl">Ready to share?</h2>
            
            <div className="flex flex-col gap-2">
              <p className="italic text-sm text-muted-foreground">&quot;{prompt.text}&quot;</p>
              <div className="p-4 bg-muted/50 rounded-lg border border-border">
                <p className="text-sm font-serif">{previewText}</p>
              </div>
              <div className="text-xs text-muted-foreground mt-1">
                {wordCount} words
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <label className="flex items-center gap-2 cursor-pointer w-fit">
                <input
                  type="checkbox"
                  checked={isAnonymous}
                  onChange={(e) => setIsAnonymous(e.target.checked)}
                  className="rounded border-border accent-primary w-4 h-4"
                />
                <span className="text-sm">Post anonymously</span>
              </label>

              {!isAnonymous && (
                <input
                  type="text"
                  placeholder="Your name (optional)"
                  value={authorName}
                  onChange={(e) => setAuthorName(e.target.value)}
                  className="w-full px-3 py-2 bg-transparent border border-border rounded-md text-sm outline-none focus:border-primary"
                />
              )}
            </div>

            <div className="flex justify-end gap-3 mt-4">
              <Button variant="ghost" onClick={onClose}>
                Keep Writing
              </Button>
              <Button onClick={handleSubmit}>
                Share Response
              </Button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
