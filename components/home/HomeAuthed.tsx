'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { getSupabase } from '@/lib/supabaseClient';
import NxCard from '@/components/NxCard';
import NxProgress from '@/components/NxProgress';

type Summary = {
  tasksTotal: number;
  tasksDone: number;
  myDrafts: number;
  unreadNotifications: number;
}

export default function HomeAuthed({ email, role, name }:{ email:string, role?:string|null, name?:string|null }){
  const supabase = getSupabase();
  const [sum, setSum] = useState<Summary>({ tasksTotal: 0, tasksDone: 0, myDrafts: 0, unreadNotifications: 0 });

  useEffect(() => {
    if (!supabase) return;
    (async () => {
      // tasks total
      const { count: tasksTotal } = await supabase.from('tasks').select('*', { count: 'exact', head: true });
      // tasks done for me
      const { data: me } = await supabase.auth.getUser();
      let tasksDone = 0;
      if (me.user) {
        const { count } = await supabase.from('progress')
          .select('*', { count: 'exact', head: true })
          .eq('user_id', me.user.id)
          .eq('state', 'done');
        tasksDone = count || 0;
      }
      // my drafts
      const { count: myDrafts } = await supabase.from('posts')
        .select('*', { count: 'exact', head: true })
        .eq('author_id', me.user?.id || '00000000-0000-0000-0000-000000000000')
        .in('status', ['draft','review']);
      // unread notifications
      const { count: unreadNotifications } = await supabase.from('notifications')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', me.user?.id || '00000000-0000-0000-0000-000000000000')
        .is('read_at', null);

      setSum({
        tasksTotal: tasksTotal || 0,
        tasksDone,
        myDrafts: myDrafts || 0,
        unreadNotifications: unreadNotifications || 0
      });
    })();
  }, [supabase]);

  const first = (name || email || '').split('@')[0];
  const progressPct = sum.tasksTotal ? Math.round((sum.tasksDone / sum.tasksTotal) * 100) : 0;

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
            <p className="text-sm opacity-75">Fortschritt: {progressPct}%</p>
            <div className="mt-2"><NxProgress value={progressPct} /></div>
          </Link>

          <Link href="/blog" className="p-4 rounded-xl bg-white/5 ring-1 ring-white/10 hover:bg-white/10 transition">
            <div className="font-medium">Blog & Portfolio</div>
            <p className="text-sm opacity-75">{sum.myDrafts} Entwürfe/Reviews</p>
          </Link>

          {role === 'admin' ? (
            <Link href="/admin" className="p-4 rounded-xl bg-white/5 ring-1 ring-white/10 hover:bg-white/10 transition">
              <div className="font-medium">Dashboard</div>
              <p className="text-sm opacity-75">{sum.unreadNotifications} offene Benachrichtigungen</p>
            </Link>
          ) : (
            <Link href="/about" className="p-4 rounded-xl bg-white/5 ring-1 ring-white/10 hover:bg-white/10 transition">
              <div className="font-medium">Profil</div>
              <p className="text-sm opacity-75">{sum.unreadNotifications} ungelesen</p>
            </Link>
          )}
        </div>
      </div>
    </section>
  )
}
