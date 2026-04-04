'use client'

import dynamic from 'next/dynamic'
import { motion, type Variants } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { ArrowDown } from 'lucide-react'
import { staggerContainer, fadeInUp } from '@/lib/utils/animations'
import { TypingEffect } from '@/components/common/TypingEffect'

const ThreeExperiment = dynamic(
  () => import('@/features/experiments/ThreeExperiment'),
  { ssr: false }
)

const heroContainer: Variants = {
  ...staggerContainer,
  hidden: staggerContainer.hidden ?? {},
  visible: {
    ...(typeof staggerContainer.visible === 'object' ? staggerContainer.visible : {}),
    transition: { staggerChildren: 0.1 },
  },
}

const heroItem: Variants = {
  hidden: fadeInUp.hidden ?? { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' as const },
  },
}

export default function Hero() {
  const t = useTranslations('hero')

  return (
    <section className="relative flex min-h-screen items-center overflow-hidden">
      {/* Background dot grid */}
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

      {/* Gradient orbs — CSS only */}
      <div
        aria-hidden
        className="pointer-events-none absolute right-0 top-1/2 hidden h-[600px] w-[600px] -translate-y-1/2 translate-x-1/3 rounded-full blur-3xl lg:block"
        style={{ background: 'var(--brand)', opacity: 0.08 }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-40 bottom-1/4 h-[400px] w-[400px] rounded-full blur-3xl"
        style={{ background: 'var(--brand)', opacity: 0.06 }}
      />

      <div className="relative z-10 mx-auto flex w-full max-w-[1200px] items-center px-4 py-24 sm:px-6 lg:py-0">
        <div className="grid w-full lg:grid-cols-2 lg:gap-16">
          {/* Left — content */}
          <motion.div
            variants={heroContainer}
            initial="hidden"
            animate="visible"
            className="flex flex-col items-start"
          >
            <motion.span
              variants={heroItem}
              className="mb-4 inline-flex items-center rounded-full border border-[var(--brand)]/30 bg-[var(--brand)]/8 px-3 py-1 text-sm font-medium text-[var(--brand)]"
            >
              {t('badge')}
            </motion.span>

            <motion.h1
              variants={heroItem}
              className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl"
            >
              {t('title')}
            </motion.h1>

            <motion.div variants={heroItem} className="mt-3 h-7 text-lg font-medium">
              <TypingEffect words={t.raw('typing_words') as string[]} />
            </motion.div>

            <motion.p
              variants={heroItem}
              className="mt-6 max-w-lg text-lg leading-relaxed text-[var(--foreground-secondary)]"
            >
              {t('subtitle')}
            </motion.p>

            <motion.div variants={heroItem} className="mt-8 flex flex-wrap gap-3">
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

          {/* Right — placeholder for desktop layout balance */}
          <div className="hidden lg:block" aria-hidden="true" />
        </div>
      </div>

      {/* Three.js sphere — lazy, desktop only, non-blocking */}
      <ThreeExperiment />
    </section>
  )
}
