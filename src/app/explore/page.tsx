import { Metadata } from 'next';
import ExplorePageClient from './explore-page-client';

export const metadata: Metadata = {
  title: 'Explore Prompts | Wordspin',
  description: 'Browse 70+ writing prompts across 10 categories',
};

export default function ExplorePage() {
  return <ExplorePageClient />;
}
