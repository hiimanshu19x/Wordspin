import Link from 'next/link';
import { SITE_NAME } from '@/lib/constants';

export function Footer() {
  return (
    <footer className="w-full border-t border-border mt-auto">
      <div className="max-w-5xl mx-auto py-16 px-4">
        <div className="flex flex-col items-center text-center space-y-8">
          
          <div className="space-y-2">
            <h2 className="font-editorial font-serif text-2xl font-medium tracking-tight text-foreground">
              {SITE_NAME}
            </h2>
            <p className="text-muted-foreground text-sm">
              One question. Thousands of perspectives.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-6 text-sm font-medium text-muted-foreground">
            <Link href="/about" className="hover:text-foreground transition-colors">
              About
            </Link>
            <Link href="/privacy" className="hover:text-foreground transition-colors">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-foreground transition-colors">
              Terms
            </Link>
            <Link href="/contact" className="hover:text-foreground transition-colors">
              Contact
            </Link>
          </div>

          <div className="text-sm text-muted-foreground/70 pt-8 w-full border-t border-border/50">
            made by Himanshu Singh
          </div>

        </div>
      </div>
    </footer>
  );
}
