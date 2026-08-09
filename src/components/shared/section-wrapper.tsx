'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface SectionWrapperProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
}

const maxWidthClasses = {
  sm: 'max-w-[640px]',
  md: 'max-w-[768px]',
  lg: 'max-w-[1024px]',
  xl: 'max-w-[1200px]',
  full: 'max-w-full'
};

export function SectionWrapper({
  children,
  className,
  id,
  maxWidth = 'lg'
}: SectionWrapperProps) {
  return (
    <section id={id} className="py-16 md:py-24 px-4 md:px-6 w-full">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className={cn('mx-auto w-full', maxWidthClasses[maxWidth], className)}
      >
        {children}
      </motion.div>
    </section>
  );
}
