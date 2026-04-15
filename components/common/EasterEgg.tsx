'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useTranslations } from 'next-intl'

interface EasterEggProps {
  active: boolean
  onClose: () => void
}

export default function EasterEgg({ active, onClose }: EasterEggProps) {
  const t = useTranslations('easterEgg')

  return (
    <AnimatePresence>
      {active && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          className="fixed bottom-8 left-1/2 z-[9999] w-full max-w-sm -translate-x-1/2 px-4"
        >
          <div className="rounded-2xl border border-brand/30 bg-background p-6 text-center shadow-2xl shadow-brand/10">
            <div className="mb-3 text-3xl">🎮</div>
            <h3 className="mb-1 text-lg font-bold text-foreground">{t('achievement')}</h3>
            <p className="mb-4 text-sm text-foreground-secondary">{t('found')}</p>
            <div className="flex justify-center gap-3">
              <a
                href="#contact"
                onClick={onClose}
                className="brand-btn rounded-lg bg-brand px-4 py-2 text-sm font-medium text-white transition-colors"
              >
                {t('cta')}
              </a>
              <button
                onClick={onClose}
                className="rounded-lg border border-border px-4 py-2 text-sm transition-colors hover:border-brand"
              >
                {t('close')}
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
