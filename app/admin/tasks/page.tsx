
'use client';
import { useEffect, useState } from 'react';
import { getSupabase } from '@/lib/supabaseClient';

type Row = { id: any, title: any, difficulty: any, area_id: any, created_at: any };

export default function TasksList() {
  const supabase = getSupabase();
  const [items, setItems] = useState<Row[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!supabase) return;
    (async () => {
      const { data } = await supabase.from('tasks').select('*').limit(50);
      setItems(data || []);
      setLoading(false);
    })();
  }, [supabase]);

  if (loading) return <div>Lade…</div>;

  return (
    <div className="overflow-auto">
      <table className="min-w-full text-sm">
        <thead>
          <tr className="text-left opacity-70">
            <th className='py-2 pr-4'>id</th><th className='py-2 pr-4'>title</th><th className='py-2 pr-4'>difficulty</th><th className='py-2 pr-4'>area_id</th><th className='py-2 pr-4'>created_at</th>
          </tr>
        </thead>
        <tbody>
          {items.map((it, idx) => (
            <tr key={{idx}} className="border-t border-white/10">
              <td className='py-2 pr-4'>{String((it as any).id ?? '')}</td><td className='py-2 pr-4'>{String((it as any).title ?? '')}</td><td className='py-2 pr-4'>{String((it as any).difficulty ?? '')}</td><td className='py-2 pr-4'>{String((it as any).area_id ?? '')}</td><td className='py-2 pr-4'>{String((it as any).created_at ?? '')}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
