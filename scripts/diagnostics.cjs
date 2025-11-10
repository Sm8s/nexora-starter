/* Diagnostics (no secrets leaked) */
const fs = require('fs');
const { execSync } = require('child_process');

function safe(cmd) {
  try { return execSync(cmd).toString().trim(); } catch { return 'n/a'; }
}

function present(v){ return v ? 'present' : 'missing' }

console.log('--- DIAGNOSTICS START ---');
console.log('Node:', process.version);
console.log('NPM:', safe('npm -v'));
console.log('CI:', process.env.CI);
console.log('NETLIFY:', process.env.NETLIFY);

const env = {
  NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL || null,
  NEXT_PUBLIC_SUPABASE_ANON_KEY: present(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY),
  SUPABASE_URL: process.env.SUPABASE_URL || null,
  SUPABASE_ANON_KEY: present(process.env.SUPABASE_ANON_KEY),
  NEXT_PUBLIC_APP_NAME: process.env.NEXT_PUBLIC_APP_NAME || null,
};
console.log('ENV (sanitized):', env);

const chosenUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL || '(none)';
const chosenKey = (process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY) ? 'present' : 'missing';
console.log('Supabase client will use URL=', chosenUrl, 'KEY=', chosenKey);

try { console.log('tsconfig.json length:', fs.readFileSync('tsconfig.json','utf8').length); } catch { console.log('tsconfig.json not found'); }
try {
  const p = JSON.parse(fs.readFileSync('package.json','utf8'));
  console.log('package.json name:', p.name, 'deps:', Object.keys(p.dependencies||{}).length);
} catch {}
console.log('--- DIAGNOSTICS END ---');
