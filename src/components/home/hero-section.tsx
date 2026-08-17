'use client';

import { useState } from 'react';
import { AnimatedText } from '@/components/shared/animated-text';
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
    <section className="relative flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center overflow-hidden pt-16">
      {/* Ambient background decoration */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden">
        <motion.div
          animate={{
            scale: [1, 1.05, 1],
            opacity: [0.5, 0.6, 0.5],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute h-[400px] w-[400px] rounded-full bg-accent/10 blur-[80px]"
        />
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.4, 0.5, 0.4],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 1,
          }}
          className="absolute ml-[-200px] mt-[100px] h-[300px] w-[300px] rounded-full bg-primary/10 blur-[60px]"
        />
      </div>

      <div className="relative z-10 flex w-full max-w-4xl flex-col items-center px-4 text-center">
        <div className="flex flex-col gap-2">
          <AnimatedText
            as="h1"
            text="One question."
            className="font-serif text-4xl font-light tracking-tight text-balance sm:text-5xl md:text-6xl lg:text-7xl"
            animation="fade-up"
          />
          <AnimatedText
            as="h1"
            text="Thousands of perspectives."
            className="font-serif text-4xl font-light tracking-tight text-balance sm:text-5xl md:text-6xl lg:text-7xl"
            animation="fade-up"
            delay={0.1}
          />
        </div>
        
        <div className="mt-6 flex justify-center">
          <AnimatedText
            text="Spin a writing prompt. Answer in 200 words. Discover how others saw the same world."
            className="max-w-xl text-center text-lg leading-relaxed text-muted-foreground md:text-xl"
            delay={0.3}
          />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="mt-12 w-full max-w-2xl"
        >
          <PromptCard 
            prompt={SAMPLE_PROMPTS[currentPromptIndex]}
            onSpin={handleSpin}
            onWrite={handleWrite}
          />
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute bottom-8 text-muted-foreground/50"
      >
        <ChevronDown className="h-6 w-6" />
      </motion.div>
    </section>
  );
}
