'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { PromptCard } from '@/components/shared/prompt-card';
import { SAMPLE_PROMPTS } from '@/lib/prompts';

export function HeroSection() {
  const router = useRouter();
  const [currentPromptIndex, setCurrentPromptIndex] = useState(0);

  const handleSpin = () => {
    setCurrentPromptIndex((prev) => (prev + 1) % SAMPLE_PROMPTS.length);
  };

  const handleWrite = () => {
    router.push(`/write/${SAMPLE_PROMPTS[currentPromptIndex].id}`);
  };

  return (
    <section className="relative flex min-h-[calc(100vh-4rem)] flex-col justify-center overflow-hidden pt-16">
      {/* Ambient background orbs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <motion.div
          animate={{ scale: [1, 1.05, 1], opacity: [0.4, 0.55, 0.4] }}
          transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute right-[-100px] top-[-100px] h-[500px] w-[500px] rounded-full bg-accent/10 blur-[100px]"
        />
        <motion.div
          animate={{ scale: [1, 1.08, 1], opacity: [0.3, 0.45, 0.3] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          className="absolute bottom-[-100px] left-[-100px] h-[400px] w-[400px] rounded-full bg-primary/8 blur-[80px]"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto w-full max-w-5xl px-6 md:px-10 lg:px-12">

        {/* Eyebrow — "— ONE QUESTION." */}
        <motion.div
          initial={{ opacity: 0, x: -12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="mb-5 flex items-center gap-3"
        >
          <div className="h-px w-8 bg-accent" />
          <span className="font-sans text-[11px] font-semibold uppercase tracking-[0.22em] text-accent">
            One question.
          </span>
        </motion.div>

        {/* Main headline */}
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="font-serif font-semibold tracking-tight leading-[1.0]
                     text-5xl sm:text-6xl md:text-7xl lg:text-8xl"
        >
          {/* "Thousands of" — dark, upright */}
          <span className="text-foreground">Thousands of </span>
          {/* "perspectives." — italic, accent, inline continuation */}
          <span className="italic text-accent font-light">perspectives.</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="mt-6 max-w-lg text-base sm:text-lg leading-relaxed text-muted-foreground"
        >
          Spin a writing prompt. Answer in 200 words. Discover how others saw the same world.
        </motion.p>

        {/* Prompt Card */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55, duration: 0.7 }}
          className="mt-10 w-full max-w-2xl"
        >
          <PromptCard
            prompt={SAMPLE_PROMPTS[currentPromptIndex]}
            onSpin={handleSpin}
            onWrite={handleWrite}
          />
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-muted-foreground/40"
      >
        <ChevronDown className="h-6 w-6" />
      </motion.div>
    </section>
  );
}
