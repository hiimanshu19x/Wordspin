'use client';

import { useSavedPrompts } from '@/lib/store';
import { PromptCard } from '@/components/shared/prompt-card';
import { SectionWrapper } from '@/components/shared/section-wrapper';
import { AnimatedText } from '@/components/shared/animated-text';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export function SavedPageClient() {
  const { savedPrompts } = useSavedPrompts();
  const router = useRouter();

  return (
    <SectionWrapper maxWidth="xl" className="min-h-[80vh]">
      <div className="mb-12 text-center md:text-left">
        <AnimatedText
          text="Saved Prompts"
          as="h1"
          className="text-4xl md:text-5xl font-serif text-foreground mb-4"
        />
        <p className="text-muted-foreground">
          Your collection of prompts waiting to be explored.
        </p>
      </div>

      {savedPrompts.length === 0 ? (
        <div className="text-center py-20 bg-card rounded-2xl border border-border shadow-sm">
          <h2 className="text-2xl font-serif mb-2">No saved prompts yet.</h2>
          <p className="text-muted-foreground mb-8">Spin to discover prompts you love.</p>
          <Button asChild size="lg">
            <Link href="/spin">Go Spin</Link>
          </Button>
        </div>
      ) : (
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          initial="hidden"
          animate="show"
          variants={{
            hidden: { opacity: 0 },
            show: {
              opacity: 1,
              transition: {
                staggerChildren: 0.1
              }
            }
          }}
        >
          {savedPrompts.map((prompt: import('@/lib/types').Prompt) => (
            <motion.div 
              key={prompt.id}
              variants={{
                hidden: { opacity: 0, y: 20 },
                show: { opacity: 1, y: 0 }
              }}
            >
              <PromptCard
                prompt={prompt}
                onWrite={() => router.push(`/write/${prompt.id}`)}
                className="h-full justify-between"
              />
            </motion.div>
          ))}
        </motion.div>
      )}
    </SectionWrapper>
  );
}
