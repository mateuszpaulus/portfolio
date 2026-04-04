import { createNavigation } from 'next-intl/navigation'

export const { Link, redirect, usePathname, useRouter } = createNavigation({
  locales: ['pl', 'en'] as const,
  defaultLocale: 'pl',
})
