'use client';

import { use, useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useDraft, useResponses, getPromptById, usePreferences } from '@/lib/store';
import { Button } from '@/components/ui/button';
import { WritingEditor } from '@/components/write/writing-editor';
import { WritingToolbar } from '@/components/write/writing-toolbar';
import { SubmitDialog } from '@/components/write/submit-dialog';
import { SubmissionSuccess } from '@/components/write/submission-success';
import { MAX_WORDS } from '@/lib/constants';

export default function WritePage({ params }: { params: Promise<{ promptId: string }> }) {
  const { promptId } = use(params);
  const router = useRouter();
  const prompt = getPromptById(promptId);
  
  const { draft, saveDraft, clearDraft } = useDraft(promptId);
  const { addResponse } = useResponses(promptId);
  const { preferences, updatePreferences } = usePreferences();

  const [body, setBody] = useState(draft?.body ?? '');
  const [wordCount, setWordCount] = useState(() => {
    if (!draft?.body) return 0;
    return draft.body.trim() === '' ? 0 : draft.body.trim().split(/\s+/).filter((w: string) => w.length > 0).length;
  });
  const [isAnonymous, setIsAnonymous] = useState(preferences.preferAnonymous);
  const [showSubmitDialog, setShowSubmitDialog] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  // Autosave
  useEffect(() => {
    const timer = setTimeout(() => {
      if (body !== (draft?.body ?? '') && body !== '') {
        saveDraft(body);
        setIsSaved(true);
        setTimeout(() => setIsSaved(false), 2000);
      }
    }, 1500);
    
    return () => clearTimeout(timer);
  }, [body, draft?.body, saveDraft]);

  if (!prompt) {
    return (
      <div className="pt-32 px-4 max-w-md mx-auto text-center flex flex-col gap-6">
        <h1 className="font-serif text-2xl">Prompt not found</h1>
        <p className="text-muted-foreground">This prompt might have expired or doesn&apos;t exist.</p>
        <Button asChild>
          <Link href="/spin">Spin a new prompt</Link>
        </Button>
      </div>
    );
  }

  const handleBodyChange = (newBody: string) => {
    setBody(newBody);
  };

  const handleSubmitConfirm = (authorName: string | null) => {
    addResponse({
      promptId,
      prompt,
      body,
      author: authorName,
      wordCount,
    });
    
    if (authorName) {
      updatePreferences({ authorName });
    }
    
    clearDraft();
    setShowSubmitDialog(false);
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <SubmissionSuccess
        promptId={promptId}
        onViewResponses={() => router.push(`/prompt/${promptId}`)}
        onSpinAgain={() => router.push('/spin')}
      />
    );
  }

  const canSubmit = wordCount > 0 && wordCount <= MAX_WORDS;

  return (
    <div className="pt-20 pb-24 max-w-3xl mx-auto px-4 md:px-6 relative min-h-screen">
      <WritingEditor
        prompt={prompt}
        initialBody={body}
        onBodyChange={handleBodyChange}
        onWordCountChange={setWordCount}
      />
      
      <WritingToolbar
        wordCount={wordCount}
        maxWords={MAX_WORDS}
        isAnonymous={isAnonymous}
        onToggleAnonymous={() => setIsAnonymous(!isAnonymous)}
        onSubmit={() => setShowSubmitDialog(true)}
        canSubmit={canSubmit}
        isSaved={isSaved}
      />
      
      <SubmitDialog
        isOpen={showSubmitDialog}
        onClose={() => setShowSubmitDialog(false)}
        onSubmit={handleSubmitConfirm}
        prompt={prompt}
        body={body}
        wordCount={wordCount}
      />
    </div>
  );
}
