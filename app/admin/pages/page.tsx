
'use client';
import { useEffect, useState } from 'react';
import { getSupabase } from '@/lib/supabaseClient';

type Row = { id: any, slug: any, title: any, updated_at: any };

export default function PagesList() {
  const supabase = getSupabase();
  const [items, setItems] = useState<Row[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!supabase) return;
    (async () => {
      const { data } = await supabase.from('pages').select('*').limit(50);
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
            <th className='py-2 pr-4'>id</th><th className='py-2 pr-4'>slug</th><th className='py-2 pr-4'>title</th><th className='py-2 pr-4'>updated_at</th>
          </tr>
        </thead>
        <tbody>
          {items.map((it, idx) => (
            <tr key={{idx}} className="border-t border-white/10">
              <td className='py-2 pr-4'>{String((it as any).id ?? '')}</td><td className='py-2 pr-4'>{String((it as any).slug ?? '')}</td><td className='py-2 pr-4'>{String((it as any).title ?? '')}</td><td className='py-2 pr-4'>{String((it as any).updated_at ?? '')}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
