"use client";
import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers';

 
// 1. Specify protected and public routes
const protectedRoutes = ['/profile','/profile/edit',"users"]
const publicRoutes = ['/register', '/']
 
export default async function middleware(req: NextRequest) {
  // 2. Check if the current route is protected or public
  const path = req.nextUrl.pathname
  const isProtectedRoute = protectedRoutes.includes(path)
  const isPublicRoute = publicRoutes.includes(path)
  // 3. Decrypt the session from the cookie
  const authToken = cookies().get('authToken')?.value;
  // const session = await decrypt(cookie)
  // 5. Redirect to /login if the user is not authenticated
  if (isProtectedRoute && !authToken) {
    return NextResponse.redirect(new URL('/', req.nextUrl))
  }
 
  // 6. Redirect to /dashboard if the user is authenticated
  if (
    isPublicRoute &&
    authToken &&
    !req.nextUrl.pathname.startsWith('/profile')
  ) {
    return NextResponse.redirect(new URL('/profile', req.nextUrl))
  }
 
  return NextResponse.next()
}
 
// Routes Middleware should not run on
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}