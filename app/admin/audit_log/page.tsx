
'use client';
import { useEffect, useState } from 'react';
import { getSupabase } from '@/lib/supabaseClient';

type Row = { id: any, user_id: any, action: any, entity: any, created_at: any };

export default function AuditList() {
  const supabase = getSupabase();
  const [items, setItems] = useState<Row[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!supabase) return;
    (async () => {
      const { data } = await supabase.from('audit_log').select('*').limit(50);
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
            <th className='py-2 pr-4'>id</th><th className='py-2 pr-4'>user_id</th><th className='py-2 pr-4'>action</th><th className='py-2 pr-4'>entity</th><th className='py-2 pr-4'>created_at</th>
          </tr>
        </thead>
        <tbody>
          {items.map((it, idx) => (
            <tr key={{idx}} className="border-t border-white/10">
              <td className='py-2 pr-4'>{String((it as any).id ?? '')}</td><td className='py-2 pr-4'>{String((it as any).user_id ?? '')}</td><td className='py-2 pr-4'>{String((it as any).action ?? '')}</td><td className='py-2 pr-4'>{String((it as any).entity ?? '')}</td><td className='py-2 pr-4'>{String((it as any).created_at ?? '')}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
