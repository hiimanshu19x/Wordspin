'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Send, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function ContactForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [topic, setTopic] = useState<'prompt' | 'feedback' | 'hello'>('feedback');
  const [message, setMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    setIsSubmitting(true);
    // Simulate brief processing
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 600);
  };

  const handleReset = () => {
    setName('');
    setEmail('');
    setMessage('');
    setIsSubmitted(false);
  };

  return (
    <AnimatePresence mode="wait">
      {isSubmitted ? (
        <motion.div
          key="success"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="text-center py-10 space-y-4"
        >
          <div className="w-12 h-12 rounded-full bg-accent/15 text-accent mx-auto flex items-center justify-center">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <h3 className="font-serif text-2xl font-medium text-foreground">Message received</h3>
          <p className="text-sm text-muted-foreground max-w-sm mx-auto leading-relaxed">
            Thank you for reaching out! Himanshu Singh has received your feedback and will review it shortly.
          </p>
          <div className="pt-4">
            <Button variant="outline" size="sm" onClick={handleReset}>
              Send another note
            </Button>
          </div>
        </motion.div>
      ) : (
        <motion.form
          key="form"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onSubmit={handleSubmit}
          className="space-y-6"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="name" className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Your Name
              </label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Maya Lin"
                className="w-full px-4 py-2.5 rounded-lg bg-background border border-border focus:border-accent focus:outline-none text-sm transition-colors text-foreground"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="email" className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="maya@example.com"
                className="w-full px-4 py-2.5 rounded-lg bg-background border border-border focus:border-accent focus:outline-none text-sm transition-colors text-foreground"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              What is this regarding?
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'feedback', label: 'App Feedback' },
                { id: 'prompt', label: 'Prompt Suggestion' },
                { id: 'hello', label: 'General / Hello' },
              ].map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setTopic(item.id as typeof topic)}
                  className={`py-2 px-3 rounded-lg text-xs font-medium transition-all border ${
                    topic === item.id
                      ? 'border-accent bg-accent/10 text-accent font-semibold'
                      : 'border-border bg-background text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="message" className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Message <span className="text-accent">*</span>
            </label>
            <textarea
              id="message"
              required
              rows={5}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Share your thoughts, suggestions, or prompt idea..."
              className="w-full px-4 py-3 rounded-lg bg-background border border-border focus:border-accent focus:outline-none text-sm transition-colors text-foreground resize-none leading-relaxed"
            />
          </div>

          <Button type="submit" size="lg" disabled={isSubmitting || !message.trim()} className="w-full gap-2">
            <Send className="w-4 h-4" />
            {isSubmitting ? 'Sending...' : 'Send Message'}
          </Button>
        </motion.form>
      )}
    </AnimatePresence>
  );
}
