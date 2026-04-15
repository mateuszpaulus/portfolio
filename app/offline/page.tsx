'use client'

import Link from 'next/link'
import { WifiOff, RefreshCw, Home } from 'lucide-react'

export default function OfflinePage() {
  return (
    <main className="flex min-h-screen items-center justify-center px-6">
      <div className="max-w-md text-center">
        <WifiOff
          className="mx-auto mb-6 text-foreground-secondary"
          size={48}
          aria-hidden="true"
        />

        <h1 className="mb-2 text-2xl font-bold text-foreground">No connection</h1>

        <p className="mb-2 text-foreground-secondary">
          Check your internet connection and try again.
        </p>

        <p className="mb-8 text-sm text-foreground-secondary">
          If you have visited this page before, some sections may still be available from cache.
        </p>

        <div className="flex justify-center gap-3">
          <button
            onClick={() => window.location.reload()}
            className="brand-btn flex items-center gap-2 rounded-lg bg-brand px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-hover"
          >
            <RefreshCw size={16} />
            Try again
          </button>

          <Link
            href="/"
            className="flex items-center gap-2 rounded-lg border border-border px-5 py-2.5 text-sm font-semibold transition-colors hover:border-brand hover:text-brand"
          >
            <Home size={16} />
            Home
          </Link>
        </div>
      </div>
    </main>
  )
}
