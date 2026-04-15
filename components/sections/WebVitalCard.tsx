'use client'

import { motion } from 'framer-motion'

type Status = 'good' | 'needs-improvement' | 'poor'

interface WebVitalCardProps {
  label: string
  value: string
  description: string
  status: Status
}

const STATUS_COLORS: Record<Status, string> = {
  good: '#22c55e',
  'needs-improvement': '#f97316',
  poor: '#ef4444',
}

export function WebVitalCard({ label, value, description, status }: WebVitalCardProps) {
  const color = STATUS_COLORS[status]

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, ease: 'easeOut' as const }}
      className="flex flex-col gap-2 rounded-xl border border-border bg-card p-5"
    >
      <div className="flex items-center gap-2">
        <span
          className="h-2 w-2 shrink-0 rounded-full"
          style={{ backgroundColor: color }}
          aria-hidden="true"
        />
        <span className="text-sm text-foreground-secondary">{label}</span>
      </div>
      <span
        className="text-3xl font-bold tabular-nums"
        style={{ color }}
      >
        {value}
      </span>
      <span className="text-xs text-foreground-secondary">{description}</span>
    </motion.div>
  )
}
