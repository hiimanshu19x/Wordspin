import type { Metadata } from 'next';
import Link from 'next/link';
import { SectionWrapper } from '@/components/shared/section-wrapper';
import { Button } from '@/components/ui/button';
import { Sparkles, Feather, Eye, Heart } from 'lucide-react';

export const metadata: Metadata = {
  title: 'About',
  description: 'Learn more about Wordspin — a minimalist social writing platform where one question opens thousands of human perspectives.',
};

export default function AboutPage() {
  return (
    <div className="pt-24 pb-20">
      <SectionWrapper maxWidth="md">
        {/* Header */}
        <div className="space-y-4 text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-accent/20 bg-accent/5 text-accent text-xs font-medium uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5" />
            Our Philosophy
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-light tracking-tight text-foreground">
            Writing is the product.
          </h1>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto leading-relaxed">
            Wordspin was built on a simple conviction: constraints breed creativity, and shared questions reveal our collective humanity.
          </p>
        </div>

        {/* Story / Mission */}
        <div className="prose prose-neutral dark:prose-invert max-w-none space-y-8 text-foreground/90 leading-relaxed">
          <div className="p-8 rounded-2xl bg-muted/30 border border-border space-y-4">
            <h2 className="font-serif text-2xl font-medium text-foreground">
              Why Wordspin exists
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              In an internet crowded with algorithmic noise, performative metrics, and AI-generated text, Wordspin is a quiet sanctuary for genuine human expression. Here, everyone responds to the exact same prompt with a disciplined constraint: <strong>200 words</strong>.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              When fifty people answer <em>&ldquo;Describe the smell of rain without using weather words,&rdquo;</em> you don&apos;t just get fifty descriptions — you get fifty unique windows into memory, grief, nostalgia, and joy.
            </p>
          </div>

          {/* Pillars */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
            <div className="p-6 rounded-xl border border-border bg-card/50 space-y-3">
              <div className="w-10 h-10 rounded-lg bg-accent/10 text-accent flex items-center justify-center">
                <Feather className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-lg font-medium text-foreground">200-Word Constraint</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Short enough to write in 3 minutes during your morning coffee; tight enough that every single word carries weight.
              </p>
            </div>

            <div className="p-6 rounded-xl border border-border bg-card/50 space-y-3">
              <div className="w-10 h-10 rounded-lg bg-accent/10 text-accent flex items-center justify-center">
                <Eye className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-lg font-medium text-foreground">Post-Submission Discovery</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                You only see how others answered after you contribute your own perspective. Your voice comes first, unswayed by the crowd.
              </p>
            </div>

            <div className="p-6 rounded-xl border border-border bg-card/50 space-y-3">
              <div className="w-10 h-10 rounded-lg bg-accent/10 text-accent flex items-center justify-center">
                <Heart className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-lg font-medium text-foreground">Calm &amp; Thoughtful</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                No endless doomscrolling, no follower counts, no toxic commentary. Just writing, reading, and resonant appreciation.
              </p>
            </div>

            <div className="p-6 rounded-xl border border-border bg-card/50 space-y-3">
              <div className="w-10 h-10 rounded-lg bg-accent/10 text-accent flex items-center justify-center">
                <Sparkles className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-lg font-medium text-foreground">Curated Prompts</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Dozens of rich, thought-provoking prompts across 10 categories — from memory and reflection to imagination and dreams.
              </p>
            </div>
          </div>

          {/* Creator Note */}
          <div className="border-t border-border pt-10 mt-12 space-y-4">
            <h2 className="font-serif text-2xl font-medium text-foreground">
              Created by Himanshu Singh
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Wordspin was crafted by <strong>Himanshu Singh</strong> as an exploration of minimalism, typographic beauty, and community storytelling.
            </p>
          </div>

          {/* CTA */}
          <div className="pt-8 flex flex-col sm:flex-row items-center justify-center gap-4 text-center">
            <Button size="lg" asChild>
              <Link href="/spin">Spin a Prompt</Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href="/explore">Explore Responses</Link>
            </Button>
          </div>
        </div>
      </SectionWrapper>
    </div>
  );
}
