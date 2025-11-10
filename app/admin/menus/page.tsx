
'use client';
import { useEffect, useState } from 'react';
import { getSupabase } from '@/lib/supabaseClient';

type Row = { id: any, label: any, url: any, parent_id: any, position: any };

export default function MenuList() {
  const supabase = getSupabase();
  const [items, setItems] = useState<Row[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!supabase) return;
    (async () => {
      const { data } = await supabase.from('menus').select('*').limit(50);
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
            <th className='py-2 pr-4'>id</th><th className='py-2 pr-4'>label</th><th className='py-2 pr-4'>url</th><th className='py-2 pr-4'>parent_id</th><th className='py-2 pr-4'>position</th>
          </tr>
        </thead>
        <tbody>
          {items.map((it, idx) => (
            <tr key={{idx}} className="border-t border-white/10">
              <td className='py-2 pr-4'>{String((it as any).id ?? '')}</td><td className='py-2 pr-4'>{String((it as any).label ?? '')}</td><td className='py-2 pr-4'>{String((it as any).url ?? '')}</td><td className='py-2 pr-4'>{String((it as any).parent_id ?? '')}</td><td className='py-2 pr-4'>{String((it as any).position ?? '')}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
