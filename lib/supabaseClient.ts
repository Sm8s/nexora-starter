'use client';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

function readEnv() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY;
  return { url, anon };
}

let cached: SupabaseClient | null = null;

export function getSupabase(): SupabaseClient | null {
  if (cached) return cached;
  const { url, anon } = readEnv();
  if (!url || !anon) {
    if (typeof window !== 'undefined') {
      console.error('[NEXORA] Supabase ENV missing. Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY.');
    }
    return null;
  }
  cached = createClient(url, anon);
  return cached;
}
