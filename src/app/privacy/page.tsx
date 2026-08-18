import type { Metadata } from 'next';
import { SectionWrapper } from '@/components/shared/section-wrapper';
import { ShieldCheck } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Understand how Wordspin protects your privacy, handles your writing drafts, and manages your personal preferences.',
};

export default function PrivacyPage() {
  return (
    <div className="pt-24 pb-20">
      <SectionWrapper maxWidth="md">
        {/* Header */}
        <div className="space-y-4 mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-accent/20 bg-accent/5 text-accent text-xs font-medium uppercase tracking-widest">
            <ShieldCheck className="w-3.5 h-3.5" />
            Transparency
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl font-light tracking-tight text-foreground">
            Privacy Policy
          </h1>
          <p className="text-sm text-muted-foreground">
            Last updated: August 2026
          </p>
        </div>

        {/* Content */}
        <div className="space-y-10 text-foreground/90 leading-relaxed">
          <section className="space-y-3">
            <h2 className="font-serif text-2xl font-medium text-foreground">1. Our Core Privacy Philosophy</h2>
            <p className="text-muted-foreground leading-relaxed">
              At Wordspin, we believe writing should be safe, intentional, and private until you choose to publish. We do not sell your personal information, monetize your text data, or use your writing to train generative AI models.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-2xl font-medium text-foreground">2. Information Stored on Your Device</h2>
            <p className="text-muted-foreground leading-relaxed">
              Wordspin prioritizes local-first privacy. The following data is saved directly in your browser&apos;s local storage:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground pl-2">
              <li><strong>Drafts:</strong> Unfinished responses are autosaved locally on your machine so you never lose work.</li>
              <li><strong>Saved Prompts &amp; Preferences:</strong> Your bookmarked prompts, streak counts, and custom author pen-name.</li>
              <li><strong>Reactions:</strong> Your liked responses and interaction state.</li>
            </ul>
            <p className="text-muted-foreground text-sm">
              You can clear this data at any time simply by clearing your browser cache and local storage.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-2xl font-medium text-foreground">3. Anonymous Writing</h2>
            <p className="text-muted-foreground leading-relaxed">
              When submitting a response on Wordspin, you have full control over authorship. You may submit under your chosen name or write completely anonymously. We do not attach tracking identifiers to anonymous submissions.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-2xl font-medium text-foreground">4. Analytics &amp; Performance</h2>
            <p className="text-muted-foreground leading-relaxed">
              We utilize privacy-preserving analytics (Vercel Web Analytics) to understand aggregated traffic trends (e.g., page views, general geographic region, and device types). This tracking is completely cookieless and does not record personally identifiable information (PII).
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-2xl font-medium text-foreground">5. Changes to This Policy</h2>
            <p className="text-muted-foreground leading-relaxed">
              Any updates to this policy will be posted on this page. We encourage you to review it periodically to stay informed about our data practices.
            </p>
          </section>

          <section className="space-y-3 border-t border-border pt-8">
            <h2 className="font-serif text-xl font-medium text-foreground">Questions or Concerns?</h2>
            <p className="text-muted-foreground text-sm">
              If you have any questions regarding privacy on Wordspin, reach out through our <a href="/contact" className="text-accent underline underline-offset-4 hover:text-accent/80">Contact Page</a>.
            </p>
          </section>
        </div>
      </SectionWrapper>
    </div>
  );
}
