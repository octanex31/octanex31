'use client';

import { forwardRef, type HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

type CardVariant = 'glass' | 'elevated' | 'outline';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: CardVariant;
}

const variantStyles: Record<CardVariant, string> = {
  glass:
    'bg-glass-bg backdrop-blur-xl border border-glass-border shadow-lg',
  elevated:
    'bg-bg-secondary border border-white/5 shadow-xl shadow-black/20',
  outline:
    'bg-transparent border border-glass-border',
};

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ variant = 'glass', className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'rounded-2xl transition-all duration-300',
          variantStyles[variant],
          className,
        )}
        {...props}
      >
        {children}
      </div>
    );
  },
);

Card.displayName = 'Card';

interface CardHeaderProps extends HTMLAttributes<HTMLDivElement> {
  padded?: boolean;
}

const CardHeader = forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ padded = true, className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'flex flex-col gap-1.5',
          padded && 'px-6 pt-6 pb-3',
          className,
        )}
        {...props}
      >
        {children}
      </div>
    );
  },
);

CardHeader.displayName = 'CardHeader';

interface CardContentProps extends HTMLAttributes<HTMLDivElement> {
  padded?: boolean;
}

const CardContent = forwardRef<HTMLDivElement, CardContentProps>(
  ({ padded = true, className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(padded && 'px-6 py-4', className)}
        {...props}
      >
        {children}
      </div>
    );
  },
);

CardContent.displayName = 'CardContent';

interface CardFooterProps extends HTMLAttributes<HTMLDivElement> {
  padded?: boolean;
}

const CardFooter = forwardRef<HTMLDivElement, CardFooterProps>(
  ({ padded = true, className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'flex items-center gap-4',
          padded && 'px-6 pb-6 pt-3',
          className,
        )}
        {...props}
      >
        {children}
      </div>
    );
  },
);

CardFooter.displayName = 'CardFooter';

export {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
  type CardProps,
  type CardVariant,
};
