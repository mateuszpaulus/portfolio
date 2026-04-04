'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { TextScramble } from '@/components/common/TextScramble'

interface SectionHeadingProps {
  title: string
  subtitle?: string
  align?: 'left' | 'center'
  scramble?: boolean
}

export function SectionHeading({ title, subtitle, align = 'left', scramble = false }: SectionHeadingProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={cn('mb-10', align === 'center' && 'text-center')}
    >
      <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
        {scramble ? (
          <TextScramble text={title} trigger="inView" speed={25} />
        ) : (
          title
        )}
      </h2>
      <div
        className={cn(
          'mt-2 h-0.5 w-10 rounded-full bg-[var(--brand)]',
          align === 'center' && 'mx-auto'
        )}
      />
      {subtitle && (
        <p className="mt-3 text-base text-[var(--foreground-secondary)]">{subtitle}</p>
      )}
    </motion.div>
  )
}
