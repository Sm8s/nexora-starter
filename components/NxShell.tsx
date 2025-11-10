'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ReactNode } from 'react';

const tabs = [
  { href: '/learn', label: 'Übersicht' },
  { href: '/learn?tab=courses', label: 'Kurse' },
  { href: '/learn?tab=achievements', label: 'Erfolge' },
];

export default function NxShell({ title='Learn', children }: { title?: string, children: ReactNode }) {
  const pathname = usePathname();
  return (
    <section className="neon-bg">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold">{title}</h2>
        <p className="opacity-75">Lerne, löse Aufgaben und verfolge deinen Fortschritt.</p>
      </div>
      <div className="flex items-center gap-2 mb-4">
        {tabs.map(t => {
          const active = pathname === t.href || (t.href === '/learn' && pathname === '/learn');
          return (
            <Link key={t.href} href={t.href}
              className={`px-3 py-1.5 rounded-xl ring-1 ring-white/10 hover:bg-white/5 text-sm ${active?'bg-white/10':''}`}>
              {t.label}
            </Link>
          )
        })}
      </div>
      {children}
    </section>
  );
}
