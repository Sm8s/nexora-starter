import { createClient } from '@supabase/supabase-js';

const url = process.env.SUPABASE_URL!;
const service = process.env.SUPABASE_SERVICE_ROLE_KEY!; // server only
const email = 'banje@example.com';
const password = 'banje1';
const name = 'banje';

async function main() {
  const admin = createClient(url, service, { auth: { autoRefreshToken: false, persistSession: false } });
  const { data, error } = await admin.auth.admin.createUser({ email, password, email_confirm: true, user_metadata: { name } });
  if (error) throw error;
  const user = data.user!;
  const { error: pErr } = await admin.from('profiles').upsert({ id: user.id, email, name, role: 'admin' });
  if (pErr) throw pErr;
  console.log('Admin erstellt:', user.id);
}
main().catch(err => { console.error(err); process.exit(1); });
