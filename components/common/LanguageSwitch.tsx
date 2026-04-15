'use client'

import { Fragment } from 'react'
import { useLocale } from 'next-intl'
import { useRouter, usePathname } from '@/lib/i18n/navigation'

const LOCALES = ['pl', 'en'] as const

export function LanguageSwitch() {
  const locale = useLocale()
  const router = useRouter()
  const pathname = usePathname()

  const handleSwitch = (next: string) => {
    router.replace(pathname, { locale: next })
  }

  return (
    <div className="flex items-center gap-1 text-sm font-medium">
      {LOCALES.map((l, i) => (
        <Fragment key={l}>
          <button
            onClick={() => handleSwitch(l)}
            className={`px-1 py-0.5 transition-colors ${
              locale === l
                ? 'text-brand'
                : 'text-foreground/50 hover:text-foreground'
            }`}
            aria-current={locale === l ? 'true' : undefined}
          >
            {l.toUpperCase()}
          </button>
          {i < LOCALES.length - 1 && (
            <span className="text-foreground/20">/</span>
          )}
        </Fragment>
      ))}
    </div>
  )
}
