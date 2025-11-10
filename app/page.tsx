import Link from 'next/link';

export default function Landing() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none blur-3xl opacity-40"
           aria-hidden="true"
           style={{background: 'radial-gradient(600px 200px at 20% 10%, rgba(139,92,246,.35), transparent), radial-gradient(600px 200px at 80% 90%, rgba(244,63,94,.25), transparent)'}} />
      <div className="relative card">
        <p className="text-xs uppercase tracking-widest text-violet-300/80">NEXORA</p>
        <h2 className="mt-2 text-3xl sm:text-4xl font-semibold">Developer Portfolio & Learning Hub</h2>
        <p className="mt-3 max-w-2xl opacity-80">
          Baue dein Portfolio, blogge, lerne und verwalte Inhalte – alles in einem eleganten Dashboard.
        </p>
        <div className="mt-6 flex gap-3">
          <Link href="/register" className="inline-flex items-center justify-center rounded-2xl px-4 py-2 text-sm font-medium bg-violet-600 hover:bg-violet-500 ring-1 ring-violet-400/30">Kostenlos starten</Link>
          <Link href="/login" className="inline-flex items-center justify-center rounded-2xl px-4 py-2 text-sm font-medium bg-transparent hover:bg-white/5 ring-1 ring-white/10">Einloggen</Link>
        </div>
        <div className="mt-8 grid sm:grid-cols-3 gap-4 text-sm opacity-80">
          <div className="p-4 rounded-xl bg-white/5 ring-1 ring-white/10">
            <div className="font-medium">Supabase Auth</div>
            <div className="opacity-75">Email/Passwort & Magic Link</div>
          </div>
          <div className="p-4 rounded-xl bg-white/5 ring-1 ring-white/10">
            <div className="font-medium">CMS & Blog</div>
            <div className="opacity-75">Seiten, Beiträge, Review-Workflow</div>
          </div>
          <div className="p-4 rounded-xl bg-white/5 ring-1 ring-white/10">
            <div className="font-medium">Learning Hub</div>
            <div className="opacity-75">Aufgaben, Fortschritt, Achievements</div>
          </div>
        </div>
      </div>
    </section>
  )
}
