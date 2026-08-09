'use client';

import React from 'react';
import { motion, Variants } from 'framer-motion';
import { cn } from '@/lib/utils';

type AnimationType = 'fade-up' | 'fade' | 'blur';

interface AnimatedTextProps {
  text: string;
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span';
  className?: string;
  delay?: number;
  staggerChildren?: number;
  animation?: AnimationType;
}

const MotionComponents = {
  h1: motion.h1,
  h2: motion.h2,
  h3: motion.h3,
  p: motion.p,
  span: motion.span,
};

export function AnimatedText({
  text,
  as: Component = 'p',
  className,
  delay = 0,
  staggerChildren = 0.03,
  animation = 'fade-up'
}: AnimatedTextProps) {
  const words = text.split(' ');

  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren,
        delayChildren: delay,
      }
    }
  };

  const getChildVariants = (type: AnimationType): Variants => {
    switch (type) {
      case 'fade':
        return {
          hidden: { opacity: 0 },
          visible: { opacity: 1, transition: { duration: 0.5, ease: 'easeOut' } }
        };
      case 'blur':
        return {
          hidden: { opacity: 0, filter: 'blur(4px)' },
          visible: { opacity: 1, filter: 'blur(0px)', transition: { duration: 0.5, ease: 'easeOut' } }
        };
      case 'fade-up':
      default:
        return {
          hidden: { opacity: 0, y: 10 },
          visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } }
        };
    }
  };

  const childVariants = getChildVariants(animation);
  const MotionComponent = MotionComponents[Component] || motion.p;

  return (
    <MotionComponent
      className={cn(animation === 'fade-up' ? 'overflow-hidden' : '', className)}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
    >
      {words.map((word, index) => (
        <motion.span
          key={index}
          variants={childVariants}
          style={{ display: 'inline-block', marginRight: '0.25em' }}
        >
          {word}
        </motion.span>
      ))}
    </MotionComponent>
  );
}
