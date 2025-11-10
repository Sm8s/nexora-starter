
'use client';
import { useRef } from 'react';
import { useRouter } from 'next/navigation';

export default function Logo() {
  const taps = useRef(0);
  const timer = useRef<NodeJS.Timeout | null>(null);
  const router = useRouter();

  const onClick = () => {
    taps.current += 1;
    if (!timer.current) {
      timer.current = setTimeout(() => { taps.current = 0; timer.current = null; }, 3000);
    }
    if (taps.current >= 5) {
      taps.current = 0;
      if (timer.current) { clearTimeout(timer.current); timer.current = null; }
      router.push('/admin'); // middleware entscheidet, ob redirect auf /login passiert
    }
  };

  return (
    <button
      onClick={onClick}
      aria-label="NEXORA"
      className="text-xl font-semibold tracking-tight select-none focus:outline-none"
      title="NEXORA"
    >
      NEXORA
    </button>
  );
}
