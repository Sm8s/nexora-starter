import Link from 'next/link';
import NxShell from '@/components/NxShell';
import NxCard from '@/components/NxCard';
import NxProgress from '@/components/NxProgress';

// Demo-Daten (ersetze später mit Supabase-Query)
const AREAS = [
  { slug: 'typescript', title: 'TypeScript Basics', progress: 35, tasks: 12 },
  { slug: 'react', title: 'React Fundamentals', progress: 60, tasks: 18 },
  { slug: 'sql', title: 'SQL & Supabase', progress: 20, tasks: 10 },
];

export default function LearnHome(){
  return (
    <NxShell title="NEXORA · Learn">
      <div className="grid-cards">
        {AREAS.map(a => (
          <NxCard key={a.slug}>
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-medium">{a.title}</h3>
                <p className="text-sm opacity-70">{a.tasks} Aufgaben</p>
              </div>
              <Link className="text-sm underline" href={`/learn/${a.slug}`}>Öffnen</Link>
            </div>
            <div className="mt-3">
              <NxProgress value={a.progress} />
              <p className="mt-1 text-xs opacity-60">{a.progress}% abgeschlossen</p>
            </div>
          </NxCard>
        ))}
      </div>
    </NxShell>
  );
}
