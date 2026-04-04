'use client'

import { motion, type Variants } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { ArrowDown } from 'lucide-react'

const container: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const item: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' as const } },
}

export default function Hero() {
  const t = useTranslations('hero')

  return (
    <section className="relative flex min-h-screen items-center overflow-hidden">
      {/* Background decoration */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            'radial-gradient(circle at 1px 1px, var(--border) 1px, transparent 0)',
          backgroundSize: '40px 40px',
          opacity: 0.4,
        }}
      />

      {/* Gradient orb — CSS only, zero JS */}
      <div
        aria-hidden
        className="pointer-events-none absolute right-0 top-1/2 hidden h-[600px] w-[600px] -translate-y-1/2 translate-x-1/3 rounded-full blur-3xl lg:block"
        style={{ background: 'var(--brand)', opacity: 0.12 }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-40 bottom-1/4 h-[400px] w-[400px] rounded-full blur-3xl"
        style={{ background: 'var(--brand)', opacity: 0.06 }}
      />

      <div className="relative mx-auto flex w-full max-w-[1200px] items-center px-4 py-24 sm:px-6 lg:py-0">
        <div className="grid w-full lg:grid-cols-2 lg:gap-16">
          {/* Left — content */}
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="flex flex-col items-start"
          >
            {/* Badge */}
            <motion.span
              variants={item}
              className="mb-4 inline-flex items-center rounded-full border border-[var(--brand)]/30 bg-[var(--brand)]/8 px-3 py-1 text-sm font-medium text-[var(--brand)]"
            >
              {t('badge')}
            </motion.span>

            {/* H1 */}
            <motion.h1
              variants={item}
              className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl"
            >
              {t('title')}
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              variants={item}
              className="mt-6 max-w-lg text-lg leading-relaxed text-[var(--foreground-secondary)]"
            >
              {t('subtitle')}
            </motion.p>

            {/* CTA buttons */}
            <motion.div variants={item} className="mt-8 flex flex-wrap gap-3">
              <a
                href="#projects"
                className="inline-flex items-center gap-2 rounded-lg bg-[var(--brand)] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[var(--brand-hover)]"
              >
                {t('cta_projects')}
                <ArrowDown size={16} />
              </a>
              <a
                href="/cv.pdf"
                download
                className="inline-flex items-center rounded-lg border border-border px-5 py-2.5 text-sm font-semibold text-foreground transition-colors hover:border-[var(--brand)] hover:text-[var(--brand)]"
              >
                {t('cta_cv')}
              </a>
            </motion.div>
          </motion.div>

          {/* Right — decorative (desktop only) */}
          <div className="hidden items-center justify-center lg:flex">
            <div className="relative h-80 w-80">
              <div
                className="absolute inset-0 rounded-full blur-2xl"
                style={{ background: 'var(--brand)', opacity: 0.15 }}
              />
              <div
                className="absolute inset-8 rounded-full border border-[var(--brand)]/20"
                style={{ animation: 'spin 20s linear infinite' }}
              />
              <div
                className="absolute inset-16 rounded-full border border-[var(--brand)]/10"
                style={{ animation: 'spin 15s linear infinite reverse' }}
              />
              <div
                className="absolute inset-0 flex items-center justify-center text-6xl font-bold text-[var(--brand)]/20"
              >
                MP
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
