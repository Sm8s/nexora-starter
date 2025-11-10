import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'

export async function middleware(req: NextRequest) {
  // Only run for admin paths; matcher below enforces this, but keep logic simple
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req, res })

  // Get current session
  const { data: { session } } = await supabase.auth.getSession()

  // Not logged in: redirect to /login with redirect param
  if (!session) {
    const url = new URL('/login', req.url)
    url.searchParams.set('redirect', req.nextUrl.pathname)
    return NextResponse.redirect(url)
  }

  // Check profile role
  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', session.user.id)
    .maybeSingle()

  if (!profile || profile.role !== 'admin') {
    return NextResponse.redirect(new URL('/', req.url))
  }

  return res
}

// Limit to /admin routes
export const config = { matcher: ['/admin/:path*'] }
