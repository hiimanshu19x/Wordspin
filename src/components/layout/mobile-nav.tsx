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
      transition: { duration: 0.25 }
    },
    exit: { 
      opacity: 0,
      transition: { duration: 0.25 }
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
        duration: 0.25,
        when: 'afterChildren' as const,
        staggerChildren: 0.05,
        staggerDirection: -1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 20 }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="fixed inset-0 z-40 flex justify-end"
    >
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm" 
        onClick={onClose}
      />
      
      <motion.div
        variants={panelVariants}
        className="relative z-50 h-full w-full max-w-sm bg-background border-l border-border flex flex-col p-4 shadow-2xl will-change-transform"
      >
        <div className="flex justify-end pt-2">
          <button
            onClick={onClose}
            className="p-2 text-foreground"
            aria-label="Close menu"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <nav className="flex-1 flex flex-col items-center justify-center space-y-8">
          {NAV_LINKS.map((link) => (
            <motion.div key={link.href} variants={itemVariants}>
              <Link
                href={link.href}
                onClick={onClose}
                className="font-editorial font-serif text-3xl text-foreground hover:text-accent transition-colors"
              >
                {link.label}
              </Link>
            </motion.div>
          ))}
        </nav>

        <motion.div variants={itemVariants} className="w-full pb-8">
          <Button className="w-full" size="lg" asChild>
            <Link href="/spin" onClick={onClose}>
              Start Writing
            </Link>
          </Button>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
