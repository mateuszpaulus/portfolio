'use client'

import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { SectionHeading } from '@/components/common/SectionHeading'
import { useInView } from '@/hooks/useInView'

type Familiarity = 'daily' | 'regular' | 'occasional'

interface Skill {
  name: string
  familiarity: Familiarity
}

interface SkillGroup {
  category: string
  skills: Skill[]
}

const SKILL_GROUPS: SkillGroup[] = [
  {
    category: 'Frontend',
    skills: [
      { name: 'Vue.js / Nuxt.js', familiarity: 'daily' },
      { name: 'TypeScript', familiarity: 'daily' },
      { name: 'React / Next.js', familiarity: 'regular' },
      { name: 'Angular', familiarity: 'regular' },
      { name: 'Tailwind / Bootstrap', familiarity: 'daily' },
      { name: 'HTML / CSS / SCSS', familiarity: 'daily' },
    ],
  },
  {
    category: 'Backend',
    skills: [
      { name: 'Node.js / NestJS', familiarity: 'regular' },
      { name: 'Java / Spring Boot', familiarity: 'regular' },
      { name: 'PHP / Laravel', familiarity: 'occasional' },
      { name: 'REST API / GraphQL', familiarity: 'daily' },
      { name: 'PostgreSQL / MySQL', familiarity: 'regular' },
      { name: 'MongoDB', familiarity: 'regular' },
    ],
  },
  {
    category: 'DevOps & Tools',
    skills: [
      { name: 'Docker', familiarity: 'regular' },
      { name: 'Git / GitHub', familiarity: 'daily' },
      { name: 'Grafana / Sentry', familiarity: 'regular' },
      { name: 'CI/CD', familiarity: 'regular' },
      { name: 'Storybook', familiarity: 'regular' },
      { name: 'Figma', familiarity: 'regular' },
    ],
  },
]

const FAMILIARITY_DOT: Record<Familiarity, string> = {
  daily: 'bg-[var(--brand)]',
  regular: 'bg-[var(--brand)]/50',
  occasional: 'bg-border',
}

function SkillChip({
  skill,
  index,
  visible,
}: {
  skill: Skill
  index: number
  visible: boolean
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -8 }}
      animate={visible ? { opacity: 1, x: 0 } : { opacity: 0, x: -8 }}
      transition={{ duration: 0.35, ease: 'easeOut' as const, delay: index * 0.06 }}
      className="flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-2"
    >
      <span
        className={`h-1.5 w-1.5 shrink-0 rounded-full ${FAMILIARITY_DOT[skill.familiarity]}`}
        aria-hidden="true"
      />
      <span className="text-sm text-foreground">{skill.name}</span>
    </motion.div>
  )
}

function SkillGroupCard({ group }: { group: SkillGroup }) {
  const [ref, isInView] = useInView<HTMLDivElement>({ threshold: 0.15 })

  return (
    <div ref={ref} className="flex flex-col gap-4">
      <h3 className="text-xs font-semibold uppercase tracking-widest text-[var(--foreground-secondary)]">
        {group.category}
      </h3>
      <div className="flex flex-col gap-2">
        {group.skills.map((skill, i) => (
          <SkillChip key={skill.name} skill={skill} index={i} visible={isInView} />
        ))}
      </div>
    </div>
  )
}

export default function Skills() {
  const t = useTranslations('skills')

  return (
    <section id="skills" className="py-24">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
        <SectionHeading title={t('heading')} subtitle={t('subtitle')} />
        <div className="grid gap-12 sm:grid-cols-3">
          {SKILL_GROUPS.map(group => (
            <SkillGroupCard key={group.category} group={group} />
          ))}
        </div>
      </div>
    </section>
  )
}
