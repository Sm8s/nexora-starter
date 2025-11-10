'use client';
import { useEffect, useState } from 'react';
import { getSupabase } from '@/lib/supabaseClient';

export default function AdminHome() {
  const supabase = getSupabase();
  const [stats, setStats] = useState({ pages: 0, posts: 0, tasks: 0, uploads: 0 });

  useEffect(() => {
    if (!supabase) return;
    (async () => {
      const { count: pages } = await supabase.from('pages').select('*', { count: 'exact', head: true });
      const { count: posts } = await supabase.from('posts').select('*', { count: 'exact', head: true });
      const { count: tasks } = await supabase.from('tasks').select('*', { count: 'exact', head: true });
      const { count: media } = await supabase.from('media').select('*', { count: 'exact', head: true });
      setStats({ pages: pages||0, posts: posts||0, tasks: tasks||0, uploads: media||0 });
    })();
  }, [supabase]);

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <div className="p-4 rounded-xl bg-white/5 ring-1 ring-white/10"><div className="text-sm opacity-75">Seiten</div><div className="text-3xl font-semibold">{stats.pages}</div></div>
      <div className="p-4 rounded-xl bg-white/5 ring-1 ring-white/10"><div className="text-sm opacity-75">Beiträge</div><div className="text-3xl font-semibold">{stats.posts}</div></div>
      <div className="p-4 rounded-xl bg-white/5 ring-1 ring-white/10"><div className="text-sm opacity-75">Aufgaben</div><div className="text-3xl font-semibold">{stats.tasks}</div></div>
      <div className="p-4 rounded-xl bg-white/5 ring-1 ring-white/10"><div className="text-sm opacity-75">Uploads</div><div className="text-3xl font-semibold">{stats.uploads}</div></div>
    </div>
  );
}
