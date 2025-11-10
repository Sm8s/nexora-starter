'use client';
import { useEffect, useState } from 'react';
import { getSupabase } from '@/lib/supabaseClient';
import HomeGuest from '@/components/home/HomeGuest';
import HomeAuthed from '@/components/home/HomeAuthed';

type Profile = { id: string; email: string|null; name: string|null; role: string|null };

export default function Home() {
  const supabase = getSupabase();
  const [ready, setReady] = useState(false);
  const [profile, setProfile] = useState<Profile | null>(null);

  useEffect(() => {
    let unsub: any;
    async function load() {
      if (!supabase) { setReady(true); return; }
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) { setReady(true); setProfile(null); return; }
      const { data } = await supabase.from('profiles').select('id,email,name,role').eq('id', session.user.id).maybeSingle();
      setProfile({ id: session.user.id, email: session.user.email ?? null, name: data?.name ?? session.user.user_metadata?.name ?? null, role: data?.role ?? null });
      setReady(true);
      const sub = supabase.auth.onAuthStateChange((_e, s) => {
        if (!s) setProfile(null); else setProfile(prev => ({ id: s.user.id, email: s.user.email ?? null, name: s.user.user_metadata?.name ?? prev?.name ?? null, role: prev?.role ?? null }));
      });
      // @ts-ignore
      unsub = () => sub.data?.subscription?.unsubscribe?.();
    }
    load();
    return () => { if (unsub) unsub(); };
  }, [supabase]);

  if (!ready) return null;

  if (!profile) return <HomeGuest />;

  return <HomeAuthed email={profile.email || ''} role={profile.role} name={profile.name || undefined} />;
}
