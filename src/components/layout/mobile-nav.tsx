'use client';

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
  if (!isOpen) return null;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        when: "beforeChildren",
        staggerChildren: 0.1 
      }
    },
    exit: { 
      opacity: 0,
      transition: {
        when: "afterChildren",
        staggerChildren: 0.05,
        staggerDirection: -1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="fixed inset-0 z-40 bg-background/95 backdrop-blur-xl flex flex-col p-4"
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
              className="font-editorial font-serif text-2xl text-foreground hover:text-accent transition-colors"
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
  );
}
