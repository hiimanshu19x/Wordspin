'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AnimatedText } from '@/components/shared/animated-text';
import { SectionWrapper } from '@/components/shared/section-wrapper';
import { PromptCard } from '@/components/shared/prompt-card';
import { SAMPLE_PROMPTS } from '@/lib/prompts';
import { useRouter } from 'next/navigation';

export function PromptPreviewSection() {
  const [index, setIndex] = useState(0);
  const router = useRouter();

  const currentPrompt = SAMPLE_PROMPTS[index];

  const handleSpin = () => {
    setIndex((prev) => (prev + 1) % SAMPLE_PROMPTS.length);
  };

  const handleWrite = () => {
    router.push('/write/' + currentPrompt.id);
  };

  return (
    <section className="w-full bg-card/50 relative overflow-hidden">
      <SectionWrapper maxWidth="md" className="flex flex-col items-center">
        <div className="text-center mb-10 space-y-3">
          <AnimatedText
            as="h2"
            text="Try spinning a prompt."
            className="font-serif text-3xl md:text-4xl font-light"
          />
          <p className="text-muted-foreground">
            See what kind of prompts you might receive.
          </p>
        </div>

        <div className="w-full relative min-h-[300px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentPrompt.id}
              initial={{ opacity: 0, scale: 0.96, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: -10 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="w-full"
            >
              <PromptCard
                prompt={currentPrompt}
                onSpin={handleSpin}
                onWrite={handleWrite}
              />
            </motion.div>
          </AnimatePresence>
        </div>
      </SectionWrapper>
    </section>
  );
}
