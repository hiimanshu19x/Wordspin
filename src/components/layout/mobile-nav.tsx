'use client';

import { useEffect } from 'react';
import { X } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { NAV_LINKS } from '@/lib/constants';
import { Button } from '@/components/ui/button';

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileNav({ isOpen, onClose }: MobileNavProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!isOpen) return null;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { duration: 0.2 }
    },
    exit: { 
      opacity: 0,
      transition: { duration: 0.2 }
    }
  };

  const panelVariants = {
    hidden: { x: '100%' },
    visible: { 
      x: 0,
      transition: { 
        type: 'tween' as const,
        duration: 0.25,
        when: 'beforeChildren' as const,
        staggerChildren: 0.05 
      }
    },
    exit: { 
      x: '100%',
      transition: {
        type: 'tween' as const,
        duration: 0.2,
        when: 'afterChildren' as const,
        staggerChildren: 0.04,
        staggerDirection: -1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 15 }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="fixed inset-0 z-[100] flex justify-end"
    >
      {/* Dark backdrop overlay */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm" 
        onClick={onClose}
        aria-hidden="true"
      />
      
      {/* Mobile drawer panel: full width on mobile devices, max-w-sm on tablets/desktop */}
      <motion.div
        variants={panelVariants}
        className="relative z-[101] h-full w-full sm:max-w-sm bg-background border-l border-border flex flex-col shadow-2xl will-change-transform"
      >
        {/* Top bar inside drawer: Wordspin brand on left, Close (X) on right */}
        <div className="flex h-16 items-center justify-between px-4 md:px-6 border-b border-border/40 shrink-0">
          <Link
            href="/"
            onClick={onClose}
            className="font-celesse text-2xl font-medium tracking-tight text-foreground hover:text-accent transition-colors"
          >
            Wordspin
          </Link>
          <button
            onClick={onClose}
            className="p-2 -mr-2 text-foreground hover:text-accent transition-colors rounded-lg focus:outline-none"
            aria-label="Close menu"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 flex flex-col items-center justify-center space-y-7 px-6">
          {NAV_LINKS.map((link) => (
            <motion.div key={link.href} variants={itemVariants}>
              <Link
                href={link.href}
                onClick={onClose}
                className="font-editorial font-serif text-3xl sm:text-4xl text-foreground hover:text-accent transition-colors text-center"
              >
                {link.label}
              </Link>
            </motion.div>
          ))}
        </nav>

        {/* Bottom CTA */}
        <motion.div variants={itemVariants} className="w-full p-6 pb-8 border-t border-border/40 shrink-0">
          <Button className="w-full shadow-md" size="lg" asChild>
            <Link href="/spin" onClick={onClose}>
              Start Writing
            </Link>
          </Button>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
