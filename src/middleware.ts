import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const locales = ['en', 'fr']
const defaultLocale = 'en'

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  // Vérifier si le chemin commence déjà par une locale
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  )

  if (pathnameHasLocale) {
    return NextResponse.next()
  }

  // Ignorer les routes API, admin, et fichiers statiques
  if (
    pathname.startsWith('/api') ||
    pathname.startsWith('/admin') ||
    pathname.startsWith('/_next') ||
    pathname.startsWith('/favicon.ico') ||
    pathname.includes('.')
  ) {
    return NextResponse.next()
  }

  // Récupérer la locale préférée depuis le cookie ou les headers
  const locale =
    request.cookies.get('locale')?.value ||
    request.headers.get('accept-language')?.split(',')[0]?.split('-')[0] ||
    defaultLocale

  // Vérifier que la locale est valide
  const validLocale = locales.includes(locale) ? locale : defaultLocale

  // Rediriger vers la version localisée
  const newUrl = new URL(request.url)
  newUrl.pathname = `/${validLocale}${pathname === '/' ? '' : pathname}`
  return NextResponse.redirect(newUrl)
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - admin (admin routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|admin|_next/static|_next/image|favicon.ico).*)',
  ],
}

