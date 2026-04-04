import { useTranslations } from 'next-intl'
import { Link } from '@/lib/i18n/navigation'

export default function NotFound() {
  const t = useTranslations('notFound')

  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center gap-6 px-4 text-center">
      <p className="text-8xl font-bold tracking-tight text-[var(--brand)]">404</p>
      <h1 className="text-2xl font-semibold text-foreground">{t('title')}</h1>
      <Link
        href="/"
        className="text-sm text-foreground/60 underline-offset-4 transition-colors hover:text-[var(--brand)] hover:underline"
      >
        {t('back')}
      </Link>
    </div>
  )
}
