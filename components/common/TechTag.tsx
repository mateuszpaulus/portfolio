import { cn } from '@/lib/utils'

interface TechTagProps {
  name: string
  active?: boolean
}

export function TechTag({ name, active = false }: TechTagProps) {
  return (
    <span
      className={cn(
        'inline-block rounded-full border px-3 py-1 text-sm transition-colors duration-200',
        active
          ? 'border-brand bg-brand text-white'
          : 'border-border text-foreground-secondary hover:border-brand hover:text-brand'
      )}
    >
      {name}
    </span>
  )
}
