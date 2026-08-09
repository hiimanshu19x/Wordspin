'use client';

import { AnimatedText } from '@/components/shared/animated-text';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { Sparkles, ChevronDown } from 'lucide-react';
import Link from 'next/link';

export function HeroSection() {
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
        <AnimatedText
          as="h1"
          text="Spin a prompt. Write your truth."
          className="font-serif text-4xl font-light tracking-tight text-balance sm:text-5xl md:text-6xl lg:text-7xl"
          animation="fade-up"
        />
        
        <div className="mt-6 flex justify-center">
          <AnimatedText
            text="Receive a random writing prompt. Respond in 200 words or less. Then discover how others saw the same world."
            className="max-w-xl text-center text-lg leading-relaxed text-muted-foreground md:text-xl"
            delay={0.3}
          />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <Button size="lg" className="gap-2" asChild>
            <Link href="/spin">
              <Sparkles className="h-5 w-5" />
              Spin a Prompt
            </Link>
          </Button>
          <Button size="lg" variant="ghost" asChild>
            <a href="#how-it-works">See How It Works</a>
          </Button>
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
