'use client';
import React from 'react';

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'primary' | 'ghost' };
export default function Button({ className = '', variant = 'primary', ...props }: Props) {
  const base = 'inline-flex items-center justify-center rounded-2xl px-4 py-2 text-sm font-medium transition ring-1';
  const styles = variant === 'primary'
    ? 'bg-violet-600 hover:bg-violet-500 ring-violet-400/30'
    : 'bg-transparent hover:bg-white/5 ring-white/10';
  return <button className={`${base} ${styles} ${className}`} {...props} />;
}
