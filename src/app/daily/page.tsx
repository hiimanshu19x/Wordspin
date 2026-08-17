import { Metadata } from 'next';
import DailyPageClient from './daily-page-client';

export const metadata: Metadata = {
  title: 'Daily Prompt | Wordspin',
  description: "Today's writing prompt — share your perspective",
};

export default function DailyPage() {
  return <DailyPageClient />;
}
