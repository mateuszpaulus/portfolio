'use client'

interface ErrorProps {
  error: Error & { digest?: string }
  reset: () => void
}

export default function Error({ reset }: ErrorProps) {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center gap-6 px-4 text-center">
      <p className="text-6xl font-bold text-[var(--brand)]">!</p>
      <h1 className="text-2xl font-semibold text-foreground">Coś poszło nie tak</h1>
      <p className="text-sm text-foreground/60">Wystąpił nieoczekiwany błąd.</p>
      <button
        onClick={reset}
        className="rounded-md bg-[var(--brand)] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[var(--brand-hover)]"
      >
        Spróbuj ponownie
      </button>
    </div>
  )
}
