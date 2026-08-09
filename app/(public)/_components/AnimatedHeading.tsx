'use client';

import { motion, type Variants } from 'framer-motion';

type AnimatedHeadingProps = {
  text: string;
  highlightText?: string;
  className?: string;
  as?: 'h1' | 'h2' | 'h3';
  align?: 'center' | 'left' | 'responsive';
};

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const wordVariants: Variants = {
  hidden: { opacity: 0, y: 18, filter: 'blur(4px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.5,
      ease: 'easeOut',
    },
  },
};

export function AnimatedHeading({
  text,
  highlightText,
  className = '',
  as: Component = 'h2',
  align = 'center',
}: AnimatedHeadingProps) {
  const words = text.split(' ');

  const alignStyle = {
    center: 'justify-center text-center',
    left: 'justify-start text-left',
    responsive: 'justify-center lg:justify-start text-center lg:text-left',
  }[align];

  return (
    <Component className={className}>
      <motion.span
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-50px' }}
        variants={containerVariants}
        className={`inline-flex flex-wrap gap-x-2 gap-y-1 ${alignStyle}`}
      >
        {words.map((word, index) => {
          const isHighlight =
            highlightText && word.toLowerCase().includes(highlightText.toLowerCase());

          return (
            <motion.span
              key={index}
              variants={wordVariants}
              className={`inline-block ${
                isHighlight
                  ? 'text-[#CFA190] font-black'
                  : 'text-[#222222] dark:text-white font-black'
              }`}
            >
              {word}
            </motion.span>
          );
        })}
      </motion.span>
    </Component>
  );
}
