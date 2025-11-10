import Link from 'next/link';
import NxShell from '@/components/NxShell';
import NxCard from '@/components/NxCard';

// Demo-Aufgaben (später via Supabase where area = $param)
const TASKS = [
  { id: 101, title: 'Variablen & Typen', difficulty: 1 },
  { id: 102, title: 'Union & Intersection', difficulty: 2 },
  { id: 103, title: 'Generics Basics', difficulty: 2 },
  { id: 104, title: 'Utility Types', difficulty: 3 },
];

export default function AreaPage({ params }: { params: { area: string } }) {
  const area = params.area;
  return (
    <NxShell title={`Bereich: ${area}`}>
      <div className="grid-cards">
        {TASKS.map(t => (
          <NxCard key={t.id}>
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-medium">{t.title}</h3>
                <p className="text-xs opacity-70">Schwierigkeit: {t.difficulty}/3</p>
              </div>
              <Link className="text-sm underline" href={`/learn/task/${t.id}`}>Start</Link>
            </div>
          </NxCard>
        ))}
      </div>
    </NxShell>
  );
}
