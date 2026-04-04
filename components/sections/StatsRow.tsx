'use client'

import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { useAnimatedCounter } from '@/hooks/useAnimatedCounter'

interface Stat {
  value: number
  suffix: string
  labelKey: string
}

const STATS: Stat[] = [
  { value: 3,   suffix: '+', labelKey: 'experience' },
  { value: 20,  suffix: '+', labelKey: 'projects' },
  { value: 98,  suffix: '',  labelKey: 'lighthouse' },
  { value: 100, suffix: '%', labelKey: 'coffee' },
]

function StatItem({ stat, index }: { stat: Stat; index: number }) {
  const t = useTranslations('stats')
  const [ref, count] = useAnimatedCounter({ value: stat.value, duration: 1800 })

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, ease: 'easeOut' as const, delay: index * 0.1 }}
      className="flex flex-col items-center gap-1 text-center"
    >
      <span
        ref={ref as React.RefObject<HTMLSpanElement>}
        className="text-4xl font-bold tabular-nums text-[var(--brand)] sm:text-5xl"
      >
        {count}{stat.suffix}
      </span>
      <span className="text-sm text-[var(--foreground-secondary)]">
        {t(stat.labelKey)}
      </span>
    </motion.div>
  )
}

export function StatsRow() {
  return (
    <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
      {STATS.map((stat, i) => (
        <StatItem key={stat.labelKey} stat={stat} index={i} />
      ))}
    </div>
  )
}
