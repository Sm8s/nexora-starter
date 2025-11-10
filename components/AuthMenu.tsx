'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { getSupabase } from '@/lib/supabaseClient';

export default function AuthMenu() {
  const supabase = getSupabase();
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    if (!supabase) return;
    supabase.auth.getUser().then(({ data }) => setEmail(data.user?.email ?? null));
    const { data: sub } = supabase.auth.onAuthStateChange((_e, session) => {
      setEmail(session?.user?.email ?? null);
    });
    return () => { sub?.subscription?.unsubscribe?.(); };
  }, [supabase]);

  if (!supabase) {
    // Wenn ENV fehlt: simple Links anzeigen, ohne Crash
    return (
      <div className="flex gap-3 text-sm opacity-75">
        <Link href="/login" className="underline">Login</Link>
        <Link href="/register" className="underline">Registrieren</Link>
      </div>
    );
  }

  if (!email) {
    return (
      <div className="flex gap-3 text-sm">
        <Link href="/login" className="underline">Login</Link>
        <Link href="/register" className="underline">Registrieren</Link>
      </div>
    );
  }

  const logout = async () => {
    await supabase!.auth.signOut();
    location.href = '/';
  };

  return (
    <div className="flex items-center gap-3 text-sm">
      <span className="opacity-75">{email}</span>
      <button onClick={logout} className="underline">Logout</button>
    </div>
  );
}
