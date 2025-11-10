/* Simple diagnostics (no secrets) */
const fs = require('fs');
const { execSync } = require('child_process');

function safe(cmd) {
  try { return execSync(cmd).toString().trim(); } catch { return 'n/a'; }
}

console.log('--- DIAGNOSTICS START ---');
console.log('Node:', process.version);
console.log('NPM:', safe('npm -v'));
console.log('CI:', process.env.CI);
console.log('NETLIFY:', process.env.NETLIFY);
const env = {
  NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL || null,
  NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? 'present' : 'missing',
  NEXT_PUBLIC_APP_NAME: process.env.NEXT_PUBLIC_APP_NAME || null,
};
console.log('ENV (sanitized):', env);
try { console.log('tsconfig.json length:', fs.readFileSync('tsconfig.json','utf8').length); } catch { console.log('tsconfig.json not found'); }
try {
  const p = JSON.parse(fs.readFileSync('package.json','utf8'));
  console.log('package.json name:', p.name, 'deps:', Object.keys(p.dependencies||{}).length);
} catch {}
console.log('--- DIAGNOSTICS END ---');
