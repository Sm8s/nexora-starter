'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

const items = [
  { href: '/admin', label: 'Übersicht' },
  { href: '/admin/pages', label: 'Seiten' },
  { href: '/admin/posts', label: 'Beiträge' },
  { href: '/admin/tasks', label: 'Aufgaben' },
  { href: '/admin/media', label: 'Medien' },
  { href: '/admin/audit', label: 'Audit' },
  { href: '/admin/menu', label: 'Menü' },
];

export default function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-4">
      <aside className="rounded-2xl bg-neutral-900/60 ring-1 ring-white/10 p-4">
        <div className="font-semibold mb-3">Admin</div>
        <nav className="grid gap-1 text-sm">
          {items.map(i => {
            const active = pathname === i.href;
            return (
              <Link key={i.href} href={i.href}
                className={`px-3 py-2 rounded-lg hover:bg-white/5 ring-1 ring-white/5 ${active?'bg-white/10':''}`}>
                {i.label}
              </Link>
            );
          })}
        </nav>
      </aside>
      <section className="min-h-[60vh] rounded-2xl bg-neutral-900/60 ring-1 ring-white/10 p-5 overflow-hidden">
        {children}
      </section>
    </div>
  );
}
