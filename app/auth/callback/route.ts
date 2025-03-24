// app/auth/callback/route.ts
import { createClient } from '@/utils/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get('code');
  
  if (code) {
    // Add await here to properly resolve the Promise
    const supabase = await createClient();
    
    // Exchange the code for a session
    await supabase.auth.exchangeCodeForSession(code);
    
    // Redirect to the dashboard
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }
  
  // If there's no code, redirect to the login page
  return NextResponse.redirect(new URL('/login', request.url));
}