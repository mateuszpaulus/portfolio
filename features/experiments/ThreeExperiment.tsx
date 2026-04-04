'use client'

import dynamic from 'next/dynamic'
import { useState, useEffect } from 'react'
import { useMediaQuery } from '@/hooks/useMediaQuery'

const ThreeSphere = dynamic(() => import('./ThreeSphere'), {
  ssr: false,
  loading: () => <div aria-hidden="true" />,
})

function SphereTooltip() {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), 3000)
    return () => clearTimeout(timer)
  }, [])

  if (!visible) return null

  return (
    <div
      className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-background/80 px-3 py-1 text-xs text-[var(--foreground-secondary)] backdrop-blur-sm"
      aria-hidden="true"
    >
      Drag to rotate · Scroll to zoom
    </div>
  )
}

export default function ThreeExperiment() {
  const isDesktop = useMediaQuery('(min-width: 1024px)')
  const [mounted, setMounted] = useState(false)
  const [isDragging, setIsDragging] = useState(false)

  useEffect(() => {
    const delay = isDesktop ? 2000 : 500
    const timer = setTimeout(() => setMounted(true), delay)
    return () => clearTimeout(timer)
  }, [isDesktop])

  if (!mounted) return null

  // Mobile / tablet — non-interactive background
  if (!isDesktop) {
    return (
      <div
        className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-30"
        aria-hidden="true"
      >
        <ThreeSphere interactive={false} />
      </div>
    )
  }

  // Desktop — interactive, positioned right
  return (
    <div
      className="absolute right-0 top-1/2 -translate-y-1/2 select-none opacity-70"
      style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
      onMouseDown={() => setIsDragging(true)}
      onMouseUp={() => setIsDragging(false)}
      onMouseLeave={() => setIsDragging(false)}
      aria-hidden="true"
    >
      <div className="relative">
        <ThreeSphere interactive={true} />
        <SphereTooltip />
      </div>
    </div>
  )
}
