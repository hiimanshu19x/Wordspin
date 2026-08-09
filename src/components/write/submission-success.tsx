'use client'

import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'

interface SubmissionSuccessProps {
  promptId: string
  onViewResponses: () => void
  onSpinAgain: () => void
}

export function SubmissionSuccess({
  onViewResponses,
  onSpinAgain
}: SubmissionSuccessProps) {

  useEffect(() => {
    const timer = setTimeout(() => {
      onViewResponses()
    }, 4000)
    
    return () => clearTimeout(timer)
  }, [onViewResponses])

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background p-4">
      <div className="max-w-md w-full flex flex-col items-center text-center gap-6">
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="w-24 h-24 rounded-full border-2 border-accent flex items-center justify-center text-accent mb-4"
        >
          <svg className="w-12 h-12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <motion.path
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="font-serif text-2xl md:text-3xl"
        >
          Your perspective has been shared.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="text-muted-foreground"
        >
          See how others responded to the same prompt.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1.2 }}
          className="flex flex-col gap-3 w-full mt-6"
        >
          <Button onClick={onViewResponses} className="w-full">
            Read Other Responses
          </Button>
          <Button variant="ghost" onClick={onSpinAgain} className="w-full">
            Spin Another Prompt
          </Button>
        </motion.div>
      </div>

      <motion.div
        className="absolute bottom-0 left-0 h-1 bg-accent"
        initial={{ width: "0%" }}
        animate={{ width: "100%" }}
        transition={{ duration: 4, ease: "linear" }}
      />
    </div>
  )
}
