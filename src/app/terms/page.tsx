import type { Metadata } from 'next';
import { SectionWrapper } from '@/components/shared/section-wrapper';
import { FileText } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'Terms of service and community guidelines for writing and reading on Wordspin.',
};

export default function TermsPage() {
  return (
    <div className="pt-24 pb-20">
      <SectionWrapper maxWidth="md">
        {/* Header */}
        <div className="space-y-4 mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-accent/20 bg-accent/5 text-accent text-xs font-medium uppercase tracking-widest">
            <FileText className="w-3.5 h-3.5" />
            Guidelines
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl font-light tracking-tight text-foreground">
            Terms of Service
          </h1>
          <p className="text-sm text-muted-foreground">
            Last updated: August 2026
          </p>
        </div>

        {/* Content */}
        <div className="space-y-10 text-foreground/90 leading-relaxed">
          <section className="space-y-3">
            <h2 className="font-serif text-2xl font-medium text-foreground">1. Acceptance of Terms</h2>
            <p className="text-muted-foreground leading-relaxed">
              By accessing or using Wordspin (&ldquo;the platform&rdquo;), you agree to be bound by these Terms of Service. If you do not agree with any part of these terms, you should discontinue use of the platform.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-2xl font-medium text-foreground">2. Community Standards &amp; Conduct</h2>
            <p className="text-muted-foreground leading-relaxed">
              Wordspin is dedicated to thoughtful reflection and diverse human expression. To maintain this environment, you agree not to post content that:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground pl-2">
              <li>Contains hate speech, harassment, defamation, or threats of violence.</li>
              <li>Infringes on copyrights, trademarks, or proprietary rights of others.</li>
              <li>Includes spam, promotional advertising, or automated bot-generated text.</li>
              <li>Disseminates private personally identifiable information of third parties without consent.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-2xl font-medium text-foreground">3. Content Ownership &amp; License</h2>
            <p className="text-muted-foreground leading-relaxed">
              <strong>You own your words.</strong> When you write and publish a response on Wordspin, you retain full copyright in your original content. By submitting, you grant Wordspin a non-exclusive, worldwide, royalty-free license to display and format your response on the platform and its related community showcases.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-2xl font-medium text-foreground">4. Disclaimers &amp; Limitation of Liability</h2>
            <p className="text-muted-foreground leading-relaxed">
              Wordspin is provided &ldquo;as is&rdquo; without warranties of any kind, whether express or implied. We do not guarantee uninterrupted uptime, error-free operation, or permanent retention of client-side data.
            </p>
          </section>

          <section className="space-y-3 border-t border-border pt-8">
            <h2 className="font-serif text-xl font-medium text-foreground">Questions?</h2>
            <p className="text-muted-foreground text-sm">
              If you have questions about these terms, please visit our <a href="/contact" className="text-accent underline underline-offset-4 hover:text-accent/80">Contact Page</a>.
            </p>
          </section>
        </div>
      </SectionWrapper>
    </div>
  );
}
