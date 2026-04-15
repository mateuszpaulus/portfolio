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
    <div className={cn('mb-10 scroll-fade-up', align === 'center' && 'text-center')}>
      <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
        {scramble ? (
          <TextScramble text={title} trigger="inView" speed={25} />
        ) : (
          title
        )}
      </h2>
      <div
        className={cn(
          'mt-2 h-0.5 w-10 rounded-full bg-brand',
          align === 'center' && 'mx-auto'
        )}
      />
      {subtitle && (
        <p className="mt-3 text-base text-foreground-secondary">{subtitle}</p>
      )}
    </div>
  )
}
