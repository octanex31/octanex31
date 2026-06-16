'use client';

import { forwardRef, type HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

type SkeletonVariant = 'text' | 'card' | 'avatar' | 'image';

interface SkeletonProps extends HTMLAttributes<HTMLDivElement> {
  variant?: SkeletonVariant;
}

const variantStyles: Record<SkeletonVariant, string> = {
  text: 'h-4 w-full rounded-md',
  card: 'h-48 w-full rounded-2xl',
  avatar: 'h-12 w-12 rounded-full',
  image: 'aspect-video w-full rounded-xl',
};

const Skeleton = forwardRef<HTMLDivElement, SkeletonProps>(
  ({ variant = 'text', className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'animate-pulse bg-white/5',
          variantStyles[variant],
          className,
        )}
        {...props}
      />
    );
  },
);

Skeleton.displayName = 'Skeleton';

export { Skeleton, type SkeletonProps, type SkeletonVariant };
