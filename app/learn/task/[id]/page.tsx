'use client';
import { useMemo, useState } from 'react';
import NxShell from '@/components/NxShell';
import NxCard from '@/components/NxCard';

const MOCK = {
  title: 'Variablen & Typen',
  prompt: 'Deklariere eine Variable `username` mit dem Typ `string` und weise ihr deinen Namen zu.',
  hint: 'Nutze `const` oder `let` und expliziten Typ mit `:`.',
  solution: "const username: string = 'Nexora';"
};

export default function TaskPage({ params }: { params: { id: string } }) {
  const [code, setCode] = useState('');
  const [showHint, setShowHint] = useState(false);
  const [showSolution, setShowSolution] = useState(false);

  return (
    <NxShell title={`Aufgabe #${params.id}`}>
      <div className="grid gap-4">
        <NxCard>
          <h3 className="font-medium mb-1">{MOCK.title}</h3>
          <p className="opacity-80">{MOCK.prompt}</p>
          <div className="mt-3 flex gap-3 text-sm">
            <button className="underline" onClick={()=>setShowHint(v=>!v)}>Hinweis</button>
            <button className="underline" onClick={()=>setShowSolution(v=>!v)}>Lösung</button>
          </div>
          {showHint && <p className="mt-2 text-sm opacity-80">💡 {MOCK.hint}</p>}
          {showSolution && <pre className="mt-2 text-sm code bg-black/40 rounded-lg p-3 overflow-auto">{MOCK.solution}</pre>}
        </NxCard>
        <NxCard>
          <label className="text-sm opacity-80">Deine Lösung</label>
          <textarea
            value={code}
            onChange={e=>setCode(e.target.value)}
            className="mt-2 w-full h-40 bg-neutral-950 rounded-xl p-3 ring-1 ring-white/10 code"
            placeholder="Schreibe hier deinen Code..."
          />
          <div className="mt-3 flex gap-2">
            <button className="px-3 py-1.5 rounded-xl ring-1 ring-white/10 hover:bg-white/5 text-sm">Prüfen (Stub)</button>
            <button className="px-3 py-1.5 rounded-xl ring-1 ring-white/10 hover:bg-white/5 text-sm">Als gelöst markieren (Stub)</button>
          </div>
        </NxCard>
      </div>
    </NxShell>
  );
}
