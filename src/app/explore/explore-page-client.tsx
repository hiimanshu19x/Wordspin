'use client';

import { SectionWrapper } from '@/components/shared/section-wrapper';
import { AnimatedText } from '@/components/shared/animated-text';
import { SearchBar } from '@/components/explore/search-bar';
import { CategoryFilter } from '@/components/spin/category-filter';
import { getAllPrompts, useResponses } from '@/lib/store';
import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { ResponseCard } from '@/components/prompt/response-card';
import { PROMPT_CATEGORIES } from '@/lib/constants';

export default function ExplorePageClient() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  
  const allPrompts = getAllPrompts();
  const { responses } = useResponses();

  const filteredPrompts = allPrompts.filter(prompt => {
    const matchesSearch = prompt.text.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === null || prompt.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const recentResponses = [...responses]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 6);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <main className="flex-1 pt-20 pb-24">
        <SectionWrapper maxWidth="xl">
          <div className="mb-12">
            <AnimatedText 
              as="h1" 
              text="Explore" 
              className="font-serif text-4xl font-light mb-8 text-foreground"
            />
            
            <div className="space-y-6">
              <SearchBar 
                value={searchQuery} 
                onChange={setSearchQuery} 
                placeholder="Search prompts..." 
              />
              <CategoryFilter 
                categories={PROMPT_CATEGORIES}
                selected={selectedCategory}
                onSelect={setSelectedCategory}
              />
            </div>
          </div>

          <div className="space-y-16">
            <section>
              <h2 className="font-serif text-2xl mb-6 text-foreground">All Prompts</h2>
              {filteredPrompts.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredPrompts.map((prompt) => {
                    const promptResponses = responses.filter(r => r.promptId === prompt.id);
                    return (
                      <motion.div
                        key={prompt.id}
                        whileHover={{ y: -4 }}
                        onClick={() => router.push(`/prompt/${prompt.id}`)}
                        className="bg-card rounded-xl border border-border p-6 cursor-pointer hover:shadow-md transition-all flex flex-col h-full"
                      >
                        <Badge variant="muted" className="w-fit mb-4">
                          {prompt.category}
                        </Badge>
                        <p className="font-serif italic text-foreground mb-6 flex-1 line-clamp-4">
                          {prompt.text}
                        </p>
                        <p className="text-xs text-muted-foreground mt-auto">
                          {promptResponses.length} {promptResponses.length === 1 ? 'response' : 'responses'}
                        </p>
                      </motion.div>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-12 border border-border border-dashed rounded-xl">
                  <p className="text-muted-foreground">No prompts found matching your criteria.</p>
                </div>
              )}
            </section>

            <section>
              <h2 className="font-serif text-2xl mb-6 text-foreground">Recent Responses</h2>
              {recentResponses.length > 0 ? (
                <div className="flex flex-col gap-6">
                  {recentResponses.map((response) => (
                    <ResponseCard key={response.id} response={response} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 border border-border border-dashed rounded-xl">
                  <p className="text-muted-foreground">No responses have been written yet.</p>
                </div>
              )}
            </section>
          </div>
        </SectionWrapper>
      </main>
    </div>
  );
}
