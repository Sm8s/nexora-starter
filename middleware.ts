import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'

export async function middleware(req: NextRequest) {
  if (!req.nextUrl.pathname.startsWith('/admin')) return NextResponse.next();

  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) {
    const url = new URL('/login', req.url);
    url.searchParams.set('redirect', req.nextUrl.pathname);
    return NextResponse.redirect(url);
  }
  const { data: profile } = await supabase.from('profiles').select('role').eq('id', session.user.id).maybeSingle();
  if (!profile || profile.role !== 'admin') {
    return NextResponse.redirect(new URL('/', req.url));
  }
  return res;
}

export const config = { matcher: ['/admin/:path*'] };
