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
          ? 'border-[var(--brand)] bg-[var(--brand)] text-white'
          : 'border-border text-[var(--foreground-secondary)] hover:border-[var(--brand)] hover:text-[var(--brand)]'
      )}
    >
      {name}
    </span>
  )
}
