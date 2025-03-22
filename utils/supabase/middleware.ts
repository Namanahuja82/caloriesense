import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => request.cookies.set(name, value))
          supabaseResponse = NextResponse.next({
            request,
          })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  // Fetch user session
  await supabase.auth.getSession();

  // Do not run code between createServerClient and supabase.auth.getUser()
  // This prevents users from being randomly logged out.
  
  const { data, error } = await supabase.auth.getUser();

  // Redirect to login if user is not authenticated
  if (request.nextUrl.pathname.startsWith('/dashboard') && (error || !data.user)) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return supabaseResponse;
}
