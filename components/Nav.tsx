'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const links = [
  { href: '/', label: 'Home' },
  { href: '/blog', label: 'Blog' },
  { href: '/learn', label: 'Lernen' },
  { href: '/about', label: 'Über mich' },
];

export default function Nav() {
  const pathname = usePathname();
  return (
    <nav className="flex items-center gap-4 text-sm">
      {links.map(l => {
        const active = pathname === l.href || (l.href !== '/' && pathname.startsWith(l.href));
        return (
          <Link
            key={l.href}
            href={l.href}
            className={`px-2 py-1 rounded-lg ring-1 ring-white/10 hover:bg-white/5 ${active ? 'bg-white/10' : ''}`}
          >
            {l.label}
          </Link>
        );
      })}
    </nav>
  );
}
