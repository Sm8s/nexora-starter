'use client';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import Link from 'next/link';

export default function AuthMenu() {
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setEmail(data.user?.email ?? null));
    const { data: sub } = supabase.auth.onAuthStateChange(async (_e, session) => {
      setEmail(session?.user?.email ?? null);
    });
    return () => { sub.subscription.unsubscribe(); };
  }, []);

  const logout = async () => {
    await supabase.auth.signOut();
    location.href = '/';
  };

  if (!email) {
    return (
      <div className="flex gap-3 text-sm">
        <Link href="/login" className="underline">Login</Link>
        <Link href="/register" className="underline">Registrieren</Link>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-3 text-sm">
      <span className="opacity-75">{email}</span>
      <button onClick={logout} className="underline">Logout</button>
    </div>
  );
}
