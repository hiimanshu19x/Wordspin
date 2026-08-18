import { getPromptById } from '@/lib/prompts-data';
import { notFound } from 'next/navigation';
import { SITE_URL, SITE_NAME } from '@/lib/constants';
import type { Metadata } from 'next';
import PromptPageClient from './prompt-page-client';

export async function generateMetadata({ params }: { params: Promise<{ promptId: string }> }): Promise<Metadata> {
  const { promptId } = await params;
  const prompt = getPromptById(promptId);

  if (!prompt) {
    return {
      title: 'Prompt Not Found',
    };
  }

  const title = `Prompt: ${prompt.text.slice(0, 50)}${prompt.text.length > 50 ? '...' : ''}`;
  const description = `Write your response to this ${prompt.category} prompt on ${SITE_NAME}.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'article',
      url: `${SITE_URL}/prompt/${promptId}`,
    },
    alternates: {
      canonical: `${SITE_URL}/prompt/${promptId}`,
    },
  };
}

export default async function PromptPage({ params }: { params: Promise<{ promptId: string }> }) {
  const { promptId } = await params;
  const prompt = getPromptById(promptId);

  if (!prompt) {
    notFound();
  }

  return <PromptPageClient promptId={promptId} />;
}
