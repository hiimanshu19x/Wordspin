'use client';

import { motion } from 'framer-motion';
import { User, Clock } from 'lucide-react';
import { AnimatedText } from '@/components/shared/animated-text';
import { SectionWrapper } from '@/components/shared/section-wrapper';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { FEATURED_RESPONSES } from '@/lib/prompts';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring' as const,
      stiffness: 100,
      damping: 20,
    },
  },
};

export function FeaturedResponsesSection() {
  return (
    <SectionWrapper maxWidth="lg">
      <div className="text-center mb-12 space-y-3">
        <AnimatedText
          as="h2"
          text="Voices from the community."
          className="font-serif text-3xl md:text-4xl font-light"
        />
        <p className="text-muted-foreground max-w-md mx-auto">
          Real perspectives on real prompts. Every response is 200 words or
          less.
        </p>
      </div>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
      >
        {FEATURED_RESPONSES.map((response) => (
          <motion.article
            key={response.id}
            variants={cardVariants}
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
            className="bg-card rounded-xl border border-border p-6 flex flex-col gap-4 cursor-pointer group"
          >
            <div className="space-y-2">
              <Badge
                variant="secondary"
                className="font-normal text-[11px] tracking-wider uppercase"
              >
                {response.prompt.category}
              </Badge>
              <p className="font-serif italic text-sm text-muted-foreground leading-relaxed line-clamp-2">
                &ldquo;{response.prompt.text}&rdquo;
              </p>
            </div>

            <div className="text-sm leading-relaxed text-foreground line-clamp-4 flex-grow">
              {response.body}
            </div>

            <div className="pt-4 border-t border-border/60 flex justify-between items-center text-xs text-muted-foreground">
              <div className="flex items-center gap-1.5">
                <User className="w-3.5 h-3.5" />
                <span>{response.author ?? 'Anonymous'}</span>
              </div>
              <div className="flex items-center gap-3">
                <span>{response.wordCount} words</span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />~{response.readingTimeSeconds}s
                </span>
              </div>
            </div>

            <Button
              variant="ghost"
              size="sm"
              className="w-full text-accent hover:text-accent/80 text-xs justify-center p-0 h-auto font-normal opacity-0 group-hover:opacity-100 transition-opacity"
            >
              Read full response →
            </Button>
          </motion.article>
        ))}
      </motion.div>
    </SectionWrapper>
  );
}
