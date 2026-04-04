import createMiddleware from 'next-intl/middleware'
import type { NextRequest } from 'next/server'

const handleI18nRouting = createMiddleware({
  locales: ['pl', 'en'],
  defaultLocale: 'pl',
})

export function proxy(request: NextRequest) {
  return handleI18nRouting(request)
}

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
}
