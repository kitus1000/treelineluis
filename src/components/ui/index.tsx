import React, { type ReactNode } from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const Button = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'primary' | 'outline' | 'ghost' }
>(({ className, variant = 'primary', style, ...props }, ref) => {
  const variants = {
    primary: 'bg-[var(--accent)] text-white hover:opacity-90 shadow-[0_0_20px_rgba(6,182,212,0.3)]',
    outline: 'border border-[var(--line-color)] bg-transparent hover:bg-[var(--line-color)]',
    ghost: 'bg-transparent opacity-60 hover:opacity-100 hover:bg-white/5',
  };

  return (
    <button
      ref={ref}
      className={cn(
        'inline-flex items-center justify-center rounded-2xl px-6 py-3 text-sm font-bold transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50',
        variants[variant],
        className
      )}
      style={style}
      {...props}
    />
  );
});

export const Card = ({ children, className = "" }: { children: ReactNode, className?: string }) => (
  <div className={cn('glass-card overflow-hidden rounded-[2rem]', className)}>
    {children}
  </div>
);

export const CardContent = ({ children, className = "" }: { children: ReactNode, className?: string }) => (
  <div className={cn('p-8', className)}>{children}</div>
);

export const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, ...props }, ref) => (
    <input
      ref={ref}
      className={cn(
        'w-full rounded-2xl border border-[var(--card-border)] bg-white/5 px-4 py-3 placeholder:opacity-40 focus:border-[var(--accent)] focus:outline-none focus:ring-1 focus:ring-[var(--accent)] transition-all duration-300',
        className
      )}
      {...props}
    />
  )
);

export const Textarea = React.forwardRef<HTMLTextAreaElement, React.TextareaHTMLAttributes<HTMLTextAreaElement>>(
  ({ className, ...props }, ref) => (
    <textarea
      ref={ref}
      className={cn(
        'w-full rounded-2xl border border-[var(--card-border)] bg-white/5 px-4 py-3 placeholder:opacity-40 focus:border-[var(--accent)] focus:outline-none focus:ring-1 focus:ring-[var(--accent)] transition-all duration-300 min-h-[120px]',
        className
      )}
      {...props}
    />
  )
);
