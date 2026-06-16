'use client';

import { type ReactNode, type ElementType } from 'react';
import { cn } from '@/lib/utils';

type GradientVariant = 'violet-cyan' | 'violet-orange' | 'cyan-violet';

type HeadingLevel = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

interface GradientTextProps {
  as?: HeadingLevel | 'span' | 'p';
  variant?: GradientVariant;
  className?: string;
  children: ReactNode;
}

const variantStyles: Record<GradientVariant, string> = {
  'violet-cyan': 'from-electric-violet to-cyan',
  'violet-orange': 'from-electric-violet to-orange',
  'cyan-violet': 'from-cyan to-electric-violet',
};

const tagStyles: Record<string, string> = {
  h1: 'text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight',
  h2: 'text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight',
  h3: 'text-2xl sm:text-3xl lg:text-4xl font-semibold',
  h4: 'text-xl sm:text-2xl lg:text-3xl font-semibold',
  h5: 'text-lg sm:text-xl lg:text-2xl font-medium',
  h6: 'text-base sm:text-lg lg:text-xl font-medium',
  span: 'inline',
  p: 'text-base',
};

function GradientText({
  as: Component = 'span',
  variant = 'violet-cyan',
  className,
  children,
}: GradientTextProps) {
  return (
    <Component
      className={cn(
        'bg-gradient-to-r bg-clip-text text-transparent',
        variantStyles[variant],
        tagStyles[Component],
        className,
      )}
    >
      {children}
    </Component>
  );
}

export { GradientText, type GradientTextProps, type GradientVariant, type HeadingLevel };
