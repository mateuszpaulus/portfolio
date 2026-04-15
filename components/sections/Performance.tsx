'use client'

import { useTranslations } from 'next-intl'
import { Package, Calendar } from 'lucide-react'
import { SectionHeading } from '@/components/common/SectionHeading'
import { LighthouseCircle } from '@/components/sections/LighthouseCircle'
import { WebVitalCard } from '@/components/sections/WebVitalCard'
import data from '@/content/performance.json'

function MetricCard({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-center gap-4 rounded-xl border border-border bg-card p-5">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand/10 text-brand">
        {icon}
      </div>
      <div>
        <p className="text-xs text-foreground-secondary">{label}</p>
        <p className="text-lg font-bold text-foreground">{value}</p>
      </div>
    </div>
  )
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="mb-6 text-xs font-semibold uppercase tracking-widest text-foreground-secondary">
      {children}
    </p>
  )
}

export default function Performance() {
  const t = useTranslations('performance')

  return (
    <section id="performance" className="py-24">
      <div className="mx-auto max-w-300 px-4 sm:px-6">
        <SectionHeading title={t('heading')} subtitle={t('subtitle')} />

        {/* Lighthouse scores */}
        <SectionLabel>Lighthouse</SectionLabel>
        <div className="grid grid-cols-2 justify-items-center gap-8 sm:grid-cols-4">
          <LighthouseCircle value={data.lighthouse.performance} label={t('lighthouse')} />
          <LighthouseCircle value={data.lighthouse.accessibility} label={t('accessibility')} />
          <LighthouseCircle value={data.lighthouse.bestPractices} label={t('best_practices')} />
          <LighthouseCircle value={data.lighthouse.seo} label={t('seo')} />
        </div>

        <hr className="my-10 border-border" />

        {/* Core Web Vitals */}
        <SectionLabel>Core Web Vitals</SectionLabel>
        <div className="grid gap-4 sm:grid-cols-3">
          <WebVitalCard
            label={t('lcp')}
            value={data.webVitals.lcp}
            description="Largest Contentful Paint"
            status="good"
          />
          <WebVitalCard
            label={t('cls')}
            value={data.webVitals.cls}
            description="Cumulative Layout Shift"
            status="good"
          />
          <WebVitalCard
            label={t('inp')}
            value={data.webVitals.inp}
            description="Interaction to Next Paint"
            status="good"
          />
        </div>

        <hr className="my-10 border-border" />

        {/* Additional metrics */}
        <div className="grid gap-4 sm:grid-cols-2">
          <MetricCard
            icon={<Package size={20} />}
            label={t('bundle')}
            value={data.bundleSize}
          />
          <MetricCard
            icon={<Calendar size={20} />}
            label={t('measured_at')}
            value={data.measuredAt}
          />
        </div>

        <p className="mt-8 text-center text-sm text-foreground-secondary">
          Results measured in production. Updated on every deploy.
        </p>
      </div>
    </section>
  )
}
