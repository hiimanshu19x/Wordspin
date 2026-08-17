import { Metadata } from 'next';
import { SavedPageClient } from './saved-page-client';

export const metadata: Metadata = {
  title: 'Saved Prompts | Wordspin',
};

export default function SavedPage() {
  return <SavedPageClient />;
}
