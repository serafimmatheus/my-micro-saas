import { NextRequest, NextResponse } from 'next/server'
import { getUrl } from './utils/getUrl'

export function middleware(request: NextRequest) {
  const token = request.cookies.get('authjs.session-token')
  const pathName = request.nextUrl.pathname

  if (pathName === '/auth' && token) {
    return NextResponse.redirect(new URL(getUrl('/app')))
  }

  if (pathName.includes('/app') && !token) {
    return NextResponse.redirect(new URL(getUrl('/auth')))
  }
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
