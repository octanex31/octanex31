'use client';

import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface GlassCardProps extends HTMLAttributes<HTMLDivElement> {
  gradientBorder?: boolean;
  icon?: ReactNode;
  hoverGlow?: boolean;
}

const GlassCard = forwardRef<HTMLDivElement, GlassCardProps>(
  (
    {
      gradientBorder = false,
      icon,
      hoverGlow = true,
      className,
      children,
      ...props
    },
    ref,
  ) => {
    return (
      <div
        ref={ref}
        className={cn(
          'group relative overflow-hidden rounded-2xl bg-glass-bg backdrop-blur-xl transition-all duration-500',
          hoverGlow && 'hover:shadow-[0_0_40px_rgba(212,175,55,0.15)]',
          gradientBorder
            ? 'border border-transparent [background-clip:padding-box]'
            : 'border border-glass-border',
          className,
        )}
        {...props}
      >
        {gradientBorder && (
          <div
            className="pointer-events-none absolute inset-0 rounded-2xl p-[1px]"
            style={{
              background:
                'linear-gradient(135deg, rgba(212,175,55,0.5), rgba(201,168,76,0.3), rgba(212,175,55,0.1))',
              WebkitMask:
                'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
              WebkitMaskComposite: 'xor',
              maskComposite: 'exclude',
            }}
          />
        )}
        {icon && (
          <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-electric-violet/10 text-electric-violet">
            {icon}
          </div>
        )}
        <div className="relative z-10">{children}</div>
        <div
          className={cn(
            'pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-500',
            hoverGlow &&
              'bg-gradient-to-br from-electric-violet/5 via-transparent to-cyan/5 group-hover:opacity-100',
          )}
        />
      </div>
    );
  },
);

GlassCard.displayName = 'GlassCard';

export { GlassCard, type GlassCardProps };
