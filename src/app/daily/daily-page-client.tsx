'use client';

import { DailyHero } from '@/components/daily/daily-hero';
import { ResponseFeed } from '@/components/prompt/response-feed';
import { SectionWrapper } from '@/components/shared/section-wrapper';
import { useDailyPrompt, useResponseCount, useResponses } from '@/lib/store';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function DailyPageClient() {
  const { todayPrompt, pastPrompts } = useDailyPrompt();
  
  const todayResponseCount = useResponseCount(todayPrompt?.id || '');
  const { responses: todayResponses } = useResponses(todayPrompt?.id || '');

  // Format date helper
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric'
    }).toUpperCase();
  };

  const todayStr = formatDate(new Date());

  return (
    <main className="min-h-screen pt-20 pb-24">
      {todayPrompt && (
        <>
          <DailyHero
            prompt={todayPrompt}
            date={todayStr}
            responseCount={todayResponseCount}
          />
          <div className="max-w-3xl mx-auto px-4 mt-12 mb-20">
            <ResponseFeed responses={todayResponses} promptId={todayPrompt.id} />
          </div>
        </>
      )}

      <SectionWrapper maxWidth="md" className="mt-16">
        <h3 className="font-serif text-xl mb-6">Previous Days</h3>
        <div className="flex flex-col">
          {pastPrompts.slice(0, 7).map(({ date, prompt }, index) => (
            <motion.div
              key={prompt.id + date}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.4 }}
            >
              <Link
                href={`/prompt/${prompt.id}`}
                className="flex items-center justify-between py-4 px-2 border-b border-border/50 hover:bg-muted/30 transition-colors group"
              >
                <div className="text-xs text-muted-foreground w-28 shrink-0">
                  {date}
                </div>
                <div className="font-serif italic text-sm text-foreground/80 line-clamp-1 flex-1 mx-4 group-hover:text-foreground transition-colors text-center">
                  {prompt.text}
                </div>
                <div className="text-xs text-muted-foreground w-20 text-right shrink-0">
                  <ResponseCountWrapper promptId={prompt.id} />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </SectionWrapper>
    </main>
  );
}

function ResponseCountWrapper({ promptId }: { promptId: string }) {
  const count = useResponseCount(promptId);
  return <>{count} {count === 1 ? 'response' : 'responses'}</>;
}
