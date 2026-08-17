import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center space-y-4">
        <h1 className="font-serif text-3xl">This page wandered off.</h1>
        <p className="text-muted-foreground">The page you were looking for doesn't exist.</p>
        <Button asChild>
          <Link href="/spin">Spin a Prompt</Link>
        </Button>
      </div>
    </div>
  );
}
