'use client';

import { SectionWrapper } from '@/components/shared/section-wrapper';
import { AnimatedText } from '@/components/shared/animated-text';
import { motion } from 'framer-motion';
import { Shuffle, PenLine, BookOpen } from 'lucide-react';

const steps = [
  {
    number: '1',
    title: 'Spin',
    description: 'Tap the button and receive a random writing prompt from our curated collection.',
    icon: Shuffle,
  },
  {
    number: '2',
    title: 'Write',
    description: 'Write your response in 200 words or less. No pressure, no rules — just your perspective.',
    icon: PenLine,
  },
  {
    number: '3',
    title: 'Discover',
    description: 'After submitting, read how other people responded to the exact same prompt.',
    icon: BookOpen,
  },
];

export function HowItWorksSection() {
  return (
    <SectionWrapper id="how-it-works" maxWidth="lg">
      <div className="flex flex-col items-center">
        <AnimatedText
          as="h2"
          text="Three steps. Infinite perspectives."
          className="text-center font-serif text-3xl font-light tracking-tight md:text-4xl"
        />
        <div className="mt-4 flex justify-center">
          <AnimatedText
            text="Writing on Wordspin takes less than five minutes. Here's how it works."
            className="mx-auto max-w-md text-center text-muted-foreground"
            delay={0.2}
          />
        </div>
      </div>

      <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-12 relative">
        {/* Optional connector line for desktop */}
        <div className="hidden md:block absolute top-6 left-[15%] right-[15%] h-[1px] border-t border-dashed border-border" />
        
        {steps.map((step, index) => (
          <motion.div
            key={step.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ delay: index * 0.15, duration: 0.5 }}
            className="flex flex-col items-center gap-4 text-center relative bg-background"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent/10 font-serif text-lg text-accent">
              {step.number}
            </div>
            <step.icon className="h-6 w-6 text-muted-foreground" />
            <h3 className="text-lg font-medium text-foreground">{step.title}</h3>
            <p className="max-w-xs text-sm leading-relaxed text-muted-foreground">
              {step.description}
            </p>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  );
}
