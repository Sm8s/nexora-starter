import { ReactNode } from 'react';

export default function NxCard({ children, className='' }: { children: ReactNode, className?: string }) {
  return (
    <div className={`rounded-2xl bg-neutral-900/60 ring-1 ring-white/10 shadow-lg p-5 ${className}`}>
      {children}
    </div>
  );
}
