'use client';
import { createClient } from '@supabase/supabase-js';

const url = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY;

if (!url || !anon) {
  // Friendly runtime hints in the browser console (safe: anon/public key is expected to be public)
  // Do not throw synchronously to avoid SSR crashes; but warn loudly.
  console.error('[NEXORA] Supabase ENV missing. Expected one of:');
  console.error(' - NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY');
  console.error(' - or SUPABASE_URL and SUPABASE_ANON_KEY');
}

export const supabase = createClient(url || '', anon || '');
