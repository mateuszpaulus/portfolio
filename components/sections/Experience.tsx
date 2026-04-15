'use client'

import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { Briefcase } from 'lucide-react'
import { SectionHeading } from '@/components/common/SectionHeading'
import { TechTag } from '@/components/common/TechTag'
import experienceData from '@/content/experience.json'

interface ExperienceEntry {
  id: string
  role: string
  company: string
  period: string
  description: string
  highlights: string[]
  stack: string[]
}

function TimelineItem({ entry, index }: { entry: ExperienceEntry; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, ease: 'easeOut' as const, delay: index * 0.15 }}
      className="relative pl-8 pb-12 last:pb-0"
    >
      {/* Timeline line */}
      <div
        aria-hidden
        className="absolute left-[11px] top-1.5 bottom-0 w-px bg-border last:hidden"
      />

      {/* Timeline dot */}
      <div
        aria-hidden
        className="absolute left-0 top-1.5 flex h-[23px] w-[23px] items-center justify-center rounded-full border-2 border-brand bg-background"
      >
        <Briefcase size={11} className="text-brand" />
      </div>

      {/* Content */}
      <div className="flex flex-col gap-3">
        <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h3 className="text-lg font-semibold text-foreground">{entry.role}</h3>
            <p className="text-sm font-medium text-brand">{entry.company}</p>
          </div>
          <span className="text-sm text-foreground-secondary">{entry.period}</span>
        </div>

        <p className="text-sm leading-relaxed text-foreground-secondary">
          {entry.description}
        </p>

        <ul className="flex flex-col gap-1.5">
          {entry.highlights.map(highlight => (
            <li
              key={highlight}
              className="flex items-start gap-2 text-sm text-foreground-secondary"
            >
              <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-brand" aria-hidden />
              {highlight}
            </li>
          ))}
        </ul>

        <div className="flex flex-wrap gap-1.5 pt-1">
          {entry.stack.map(tech => (
            <TechTag key={tech} name={tech} />
          ))}
        </div>
      </div>
    </motion.div>
  )
}

export default function Experience() {
  const t = useTranslations('experience')

  return (
    <section id="experience" className="py-24">
      <div className="mx-auto max-w-300 px-4 sm:px-6">
        <SectionHeading title={t('heading')} subtitle={t('subtitle')} />
        <div className="mx-auto max-w-2xl">
          {(experienceData as ExperienceEntry[]).map((entry, i) => (
            <TimelineItem key={entry.id} entry={entry} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
