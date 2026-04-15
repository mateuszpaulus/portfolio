'use client'

import dynamic from 'next/dynamic'
import { motion, type Variants } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { ArrowDown } from 'lucide-react'
import { staggerContainer, fadeInUp } from '@/lib/utils/animations'
import { TypingEffect } from '@/components/common/TypingEffect'
import { TextScramble } from '@/components/common/TextScramble'
import MagneticButton from '@/components/common/MagneticButton'

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

      <div
        aria-hidden
        className="scroll-parallax-slow pointer-events-none absolute -left-40 bottom-1/4 h-100 w-100 rounded-full blur-3xl"
        style={{ background: 'var(--brand)', opacity: 0.06 }}
      />

      <ThreeExperiment />

      <div className="relative z-10 mx-auto flex w-full max-w-300 items-center px-4 py-24 sm:px-6 lg:py-0">
        <div className="grid w-full lg:grid-cols-2 lg:gap-16">
          <div className="flex flex-col items-start">
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              <TextScramble text={t('title')} trigger="mount" speed={25} />
            </h1>

            <p className="mt-6 max-w-lg text-lg leading-relaxed text-foreground-secondary">
              {t('subtitle')}
            </p>

            <motion.div
              variants={heroContainer}
              initial="hidden"
              animate="visible"
              className="flex w-full flex-col items-start"
            >
              <motion.span
                variants={heroItem}
                className="mt-4 inline-flex items-center gap-2 rounded-full border border-brand/30 bg-brand/8 px-3 py-1 text-sm font-medium text-brand"
              >
                <span className="h-2 w-2 animate-pulse rounded-full bg-brand" aria-hidden="true" />
                {t('badge')}
              </motion.span>

              <motion.div variants={heroItem} className="mt-3 h-8 text-lg font-medium">
                <TypingEffect words={t.raw('typing_words') as string[]} />
              </motion.div>

              <motion.div variants={heroItem} className="mt-8 flex flex-wrap gap-3">
                <MagneticButton>
                  <a
                    href="#projects"
                    className="brand-btn inline-flex items-center gap-2 rounded-lg bg-brand px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-hover"
                  >
                    {t('cta_projects')}
                    <ArrowDown size={16} />
                  </a>
                </MagneticButton>
                <MagneticButton>
                  <a
                    href="/cv.pdf"
                    download
                    className="inline-flex items-center rounded-lg border border-border px-5 py-2.5 text-sm font-semibold text-foreground transition-colors hover:border-brand hover:text-brand"
                  >
                    {t('cta_cv')}
                  </a>
                </MagneticButton>
              </motion.div>
            </motion.div>
          </div>

          <div className="hidden lg:block" aria-hidden="true" />
        </div>
      </div>
    </section>
  )
}
