'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { useResponses } from '@/lib/store'

interface SubmissionSuccessProps {
  promptId: string
  onViewResponses: () => void
  onSpinAgain: () => void
}

export function SubmissionSuccess({
  promptId,
  onViewResponses,
  onSpinAgain
}: SubmissionSuccessProps) {

  const { responses } = useResponses();
  const promptResponses = responses.filter(r => r.promptId === promptId);
  const otherResponses = promptResponses.slice(0, 3);

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background p-4 overflow-y-auto">
      <div className="max-w-xl w-full flex flex-col items-center text-center gap-6 py-12">
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="w-20 h-20 rounded-full border-2 border-accent flex items-center justify-center text-accent mb-2 shrink-0"
        >
          <svg className="w-10 h-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
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

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="w-full text-left mt-8 mb-4"
        >
          <h3 className="text-lg font-medium mb-4 text-center">See other perspectives:</h3>
          
          {otherResponses.length > 0 ? (
            <div className="flex flex-col gap-4">
              {otherResponses.map((res, i) => (
                <div key={res.id || i} className="bg-card p-5 rounded-lg border border-border text-sm font-serif text-muted-foreground">
                  {res.body.length > 150 ? res.body.slice(0, 150) + '...' : res.body}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center text-muted-foreground italic bg-muted/30 p-6 rounded-lg">
              You're the first to respond to this prompt!
            </div>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1.2 }}
          className="flex flex-col gap-3 w-full mt-2"
        >
          <Button onClick={onViewResponses} className="w-full" size="lg">
            Read All Responses
          </Button>
          <Button variant="ghost" onClick={onSpinAgain} className="w-full" size="lg">
            Spin Another Prompt
          </Button>
        </motion.div>
      </div>
    </div>
  )
}
