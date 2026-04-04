'use client'

import { WifiOff } from 'lucide-react'

export default function OfflinePage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 px-4 text-center">
      <WifiOff
        size={64}
        className="text-[var(--foreground-secondary)]"
        aria-hidden="true"
      />
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-semibold text-foreground">No connection</h1>
        <p className="text-sm text-[var(--foreground-secondary)]">
          Check your internet connection and try again.
        </p>
      </div>
      <button
        onClick={() => window.location.reload()}
        className="rounded-lg bg-[var(--brand)] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[var(--brand-hover)]"
      >
        Try again
      </button>
    </div>
  )
}
