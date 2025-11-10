'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

export default function EasterEggLogo({ size = 20 }: { size?: number }) {
  const router = useRouter();
  const [taps, setTaps] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (taps >= 5) {
      setTaps(0);
      if (timerRef.current) clearTimeout(timerRef.current);
      // Hier könnte man prüfen, ob der User eingeloggt ist (Supabase auth)
      router.push('/admin');
    }
  }, [taps, router]);

  const click = () => {
    setTaps((t) => t + 1);
    if (!timerRef.current) {
      timerRef.current = setTimeout(() => {
        setTaps(0);
        timerRef.current && clearTimeout(timerRef.current);
        timerRef.current = null;
      }, 3000);
    }
  };

  return (
    <button
      aria-label="Nexora Logo"
      onClick={click}
      className="rounded-full bg-violet-500/20 hover:bg-violet-500/30 ring-1 ring-violet-300/30"
      style={{ width: size, height: size }}
      title="tap me 5x"
    />
  );
}
