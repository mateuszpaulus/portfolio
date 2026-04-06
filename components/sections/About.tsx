'use client'

import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { Zap } from 'lucide-react'
import { SectionHeading } from '@/components/common/SectionHeading'
import { TechTag } from '@/components/common/TechTag'
import { useInView } from '@/hooks/useInView'
import { StatsRow } from '@/components/sections/StatsRow'

const TECH_STACK = [
  'Next.js', 'React', 'TypeScript',
  'Node.js', 'PostgreSQL', 'Tailwind CSS',
  'Prisma', 'Docker', 'Git',
  'REST API', 'GraphQL', 'AWS',
]


interface BioColumnProps {
  bio: string
  focusLabel: string
  focus: string
  visible: boolean
}

function BioColumn({ bio, focusLabel, focus, visible }: BioColumnProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={visible ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="flex flex-col gap-6"
    >
      <p className="text-base leading-relaxed text-[var(--foreground-secondary)] sm:text-lg">
        {bio}
      </p>
      <div className="flex items-start gap-3 rounded-lg border border-border bg-card p-4">
        <Zap size={18} className="mt-0.5 shrink-0 text-[var(--brand)]" />
        <div>
          <span className="text-sm font-semibold text-foreground">{focusLabel}:</span>{' '}
          <span className="text-sm text-[var(--foreground-secondary)]">{focus}</span>
        </div>
      </div>
    </motion.div>
  )
}

function TechStackGrid() {
  return (
    <div className="scroll-stagger flex flex-wrap content-start gap-2">
      {TECH_STACK.map(tech => (
        <div key={tech} className="scroll-fade-up">
          <TechTag name={tech} />
        </div>
      ))}
    </div>
  )
}

export default function About() {
  const t = useTranslations('about')
  const [ref, isInView] = useInView<HTMLElement>({ threshold: 0.15 })

  return (
    <section id="about" ref={ref} className="py-24">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
        <SectionHeading title={t('heading')} scramble />
        <div className="mb-16">
          <StatsRow />
        </div>
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
          <BioColumn
            bio={t('bio')}
            focusLabel={t('current_focus_label')}
            focus={t('current_focus')}
            visible={isInView}
          />
          <TechStackGrid />
        </div>
      </div>
    </section>
  )
}
