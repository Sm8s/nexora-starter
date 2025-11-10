'use client';
import Link from 'next/link';

export default function HomeAuthed({ email, role, name }:{ email:string, role?:string|null, name?:string|null }){
  const first = (name || email || '').split('@')[0];
  return (
    <section className="neon-bg">
      <div className="card">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-xs uppercase tracking-widest text-violet-300/80">Willkommen zurück</p>
            <h2 className="mt-2 text-2xl sm:text-3xl font-semibold">{first}</h2>
            <p className="mt-2 text-sm opacity-75">Weiter geht’s mit deinen Inhalten und Kursen.</p>
          </div>
          {role === 'admin' && (
            <span className="px-2 py-1 rounded-lg text-xs ring-1 ring-violet-400/30 bg-violet-500/20">Admin</span>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <Link href="/learn" className="p-4 rounded-xl bg-white/5 ring-1 ring-white/10 hover:bg-white/10 transition">
            <div className="font-medium">Weiter lernen</div>
            <p className="text-sm opacity-75">Zu deinen Bereichen & Aufgaben</p>
          </Link>

          <Link href="/blog" className="p-4 rounded-xl bg-white/5 ring-1 ring-white/10 hover:bg-white/10 transition">
            <div className="font-medium">Blog & Portfolio</div>
            <p className="text-sm opacity-75">Beiträge & Seiten verwalten</p>
          </Link>

          {role === 'admin' ? (
            <Link href="/admin" className="p-4 rounded-xl bg-white/5 ring-1 ring-white/10 hover:bg-white/10 transition">
              <div className="font-medium">Dashboard</div>
              <p className="text-sm opacity-75">Admin-Module öffnen</p>
            </Link>
          ) : (
            <Link href="/about" className="p-4 rounded-xl bg-white/5 ring-1 ring-white/10 hover:bg-white/10 transition">
              <div className="font-medium">Profil</div>
              <p className="text-sm opacity-75">Deine Daten & Einstellungen</p>
            </Link>
          )}
        </div>
      </div>
    </section>
  )
}
