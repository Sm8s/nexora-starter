'use client';
import { useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null); setLoading(true);
    const { data, error } = await supabase.auth.signUp({
      email, password,
      options: { data: { name } }
    });
    setLoading(false);
    if (error) return setError(error.message);
    alert('Bestätigungslink gesendet. Bitte E-Mail prüfen.');
    router.push('/login');
  };

  return (
    <div className="max-w-md mx-auto card">
      <h2 className="text-xl font-semibold mb-2">Account erstellen</h2>
      <form onSubmit={onSubmit} className="grid gap-3">
        <label className="grid gap-1">
          <span className="text-sm opacity-80">Name</span>
          <input className="bg-neutral-950 rounded-xl px-3 py-2 ring-1 ring-white/10" value={name} onChange={e=>setName(e.target.value)} />
        </label>
        <label className="grid gap-1">
          <span className="text-sm opacity-80">E-Mail</span>
          <input className="bg-neutral-950 rounded-xl px-3 py-2 ring-1 ring-white/10" type="email" value={email} onChange={e=>setEmail(e.target.value)} required />
        </label>
        <label className="grid gap-1">
          <span className="text-sm opacity-80">Passwort</span>
          <input className="bg-neutral-950 rounded-xl px-3 py-2 ring-1 ring-white/10" type="password" value={password} onChange={e=>setPassword(e.target.value)} required />
        </label>
        {error && <p className="text-sm text-red-400">{error}</p>}
        <button disabled={loading} className="rounded-2xl px-4 py-2 text-sm font-medium bg-violet-600 hover:bg-violet-500 ring-1 ring-violet-400/30 disabled:opacity-50">
          {loading ? 'Bitte warten…' : 'Registrieren'}
        </button>
      </form>
      <div className="mt-4">
        <Link href="/login" className="text-sm underline">Zurück zum Login</Link>
      </div>
    </div>
  );
}
