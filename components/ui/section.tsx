'use client';

import { type ReactNode, forwardRef } from 'react';
import { cn } from '@/lib/utils';
import { GradientText } from '@/components/ui/gradient-text';

interface SectionProps {
  id?: string;
  title?: string;
  subtitle?: string;
  gradientBg?: boolean;
  className?: string;
  children: ReactNode;
  containerClass?: string;
}

const Section = forwardRef<HTMLElement, SectionProps>(
  (
    {
      id,
      title,
      subtitle,
      gradientBg = false,
      className,
      children,
      containerClass,
    },
    ref,
  ) => {
    return (
      <section
        ref={ref}
        id={id}
        className={cn(
          'relative px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24',
          gradientBg && 'bg-gradient-radial from-electric-violet/5 via-transparent to-transparent',
          className,
        )}
      >
        {(title || subtitle) && (
          <div className="container mx-auto mb-12 max-w-3xl text-center lg:mb-16">
            {title && (
              <GradientText as="h2" variant="violet-cyan" className="mb-4">
                {title}
              </GradientText>
            )}
            {subtitle && (
              <p className="mx-auto max-w-2xl text-base text-text-secondary sm:text-lg">
                {subtitle}
              </p>
            )}
          </div>
        )}
        <div className={cn('container mx-auto', containerClass)}>
          {children}
        </div>
      </section>
    );
  },
);

Section.displayName = 'Section';

export { Section, type SectionProps };
