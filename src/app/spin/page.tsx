import { Metadata } from 'next';
import { PromptSpinner } from '@/components/spin/prompt-spinner';

export const metadata: Metadata = {
  title: 'Spin a Prompt | Wordspin',
  description: 'Find inspiration with a random writing prompt.',
};

export default function SpinPage() {
  return (
    <div className="min-h-[calc(100vh-4rem)] pt-20 pb-10 flex flex-col items-center justify-center relative overflow-hidden px-4">
      <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-secondary/5 rounded-full blur-[80px]" />
      </div>
      
      <div className="w-full max-w-4xl mx-auto flex flex-col items-center">
        <PromptSpinner />
      </div>
    </div>
  );
}
