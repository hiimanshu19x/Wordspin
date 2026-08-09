'use client';

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { AnimatedText } from '@/components/shared/animated-text';
import { SectionWrapper } from '@/components/shared/section-wrapper';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export function CTASection() {
  return (
    <section className="w-full relative overflow-hidden">
      {/* Warm gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-accent/5 pointer-events-none" />

      <SectionWrapper
        maxWidth="md"
        className="relative z-10 text-center flex flex-col items-center"
      >
        <div className="space-y-6">
          <AnimatedText
            as="h2"
            text="Your story is 200 words away."
            className="font-serif text-3xl md:text-5xl font-light tracking-tight"
          />

          <AnimatedText
            as="p"
            text="No account needed. No rules. Just you, a prompt, and your perspective."
            delay={0.2}
            className="text-muted-foreground text-lg md:text-xl max-w-lg mx-auto leading-relaxed"
          />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          viewport={{ once: true }}
          className="mt-10 flex flex-col items-center gap-4"
        >
          <Button size="lg" className="group rounded-full px-8 text-base h-14" asChild>
            <Link href="/spin">
              Start Writing
              <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
          <p className="text-xs text-muted-foreground mt-2">
            Free. Anonymous. Always.
          </p>
        </motion.div>
      </SectionWrapper>
    </section>
  );
}
