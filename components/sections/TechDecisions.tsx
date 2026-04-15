import { useTranslations } from 'next-intl'
import { LucideProps } from 'lucide-react'
import { SectionHeading } from '@/components/common/SectionHeading'
import { getLucideIcon } from '@/lib/utils/getLucideIcon'
import decisionsData from '@/content/decisions.json'

interface Decision {
  id: string
  icon: string
  title: string
  description: string
}

interface DecisionWithIcon extends Decision {
  IconComponent: React.ComponentType<LucideProps>
}

// Resolve icon components once at module level — stable references across renders
const decisions: DecisionWithIcon[] = (decisionsData as Decision[]).map(d => ({
  ...d,
  IconComponent: getLucideIcon(d.icon),
}))

function DecisionCard({ decision }: { decision: DecisionWithIcon }) {
  const { IconComponent } = decision

  return (
    <div className="scroll-scale-in flex flex-col gap-3 rounded-xl border border-border bg-card p-6">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand/10">
          <IconComponent size={20} className="text-brand" />
        </div>
        <h3 className="font-semibold text-foreground">{decision.title}</h3>
      </div>
      <p className="text-sm leading-relaxed text-foreground-secondary">
        {decision.description}
      </p>
    </div>
  )
}

export default function TechDecisions() {
  const t = useTranslations('techDecisions')

  return (
    <section id="tech-decisions" className="py-24">
      <div className="mx-auto max-w-300 px-4 sm:px-6">
        <SectionHeading title={t('heading')} subtitle={t('subtitle')} />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {decisions.map((decision) => (
            <DecisionCard key={decision.id} decision={decision} />
          ))}
        </div>
      </div>
    </section>
  )
}
