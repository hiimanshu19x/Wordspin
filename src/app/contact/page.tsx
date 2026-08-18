import type { Metadata } from 'next';
import { SectionWrapper } from '@/components/shared/section-wrapper';
import { ContactForm } from '@/components/contact/contact-form';
import { Mail, MessageSquare, Sparkles } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch with the creator of Wordspin, suggest new writing prompts, or report an issue.',
};

export default function ContactPage() {
  return (
    <div className="pt-24 pb-20">
      <SectionWrapper maxWidth="md">
        {/* Header */}
        <div className="space-y-4 text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-accent/20 bg-accent/5 text-accent text-xs font-medium uppercase tracking-widest">
            <Mail className="w-3.5 h-3.5" />
            Get In Touch
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-light tracking-tight text-foreground">
            We&apos;d love to hear from you.
          </h1>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto leading-relaxed">
            Have a prompt idea, feedback on the writing experience, or just want to say hello? Send a message below.
          </p>
        </div>

        {/* Quick Contact Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
          <div className="p-6 rounded-2xl border border-border bg-card/60 space-y-2">
            <div className="w-9 h-9 rounded-lg bg-accent/10 text-accent flex items-center justify-center mb-3">
              <Sparkles className="w-4 h-4" />
            </div>
            <h3 className="font-serif text-lg font-medium text-foreground">Suggest a Prompt</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Think of a question that would unlock unforgettable perspectives? We regularly add community suggestions to the spin pool.
            </p>
          </div>

          <div className="p-6 rounded-2xl border border-border bg-card/60 space-y-2">
            <div className="w-9 h-9 rounded-lg bg-accent/10 text-accent flex items-center justify-center mb-3">
              <MessageSquare className="w-4 h-4" />
            </div>
            <h3 className="font-serif text-lg font-medium text-foreground">Direct Creator Contact</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Built and maintained by Himanshu Singh. Reach out for collaboration, bug reports, or feature requests.
            </p>
          </div>
        </div>

        {/* Contact Form */}
        <div className="p-8 rounded-2xl border border-border bg-card/40 shadow-sm">
          <ContactForm />
        </div>
      </SectionWrapper>
    </div>
  );
}
