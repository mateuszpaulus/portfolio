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
      className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-background/80 px-3 py-1 text-xs text-foreground-secondary backdrop-blur-sm"
      aria-hidden="true"
    >
      Drag to rotate · Scroll to zoom
    </div>
  )
}

function SpherePlaceholder({ size }: { size: number }) {
  return (
    <div
      style={{ width: size, height: size }}
      className="flex items-center justify-center"
      aria-hidden="true"
    >
      <div className="h-32 w-32 animate-pulse rounded-full border border-brand/20 bg-brand/5" />
    </div>
  )
}

export default function ThreeExperiment() {
  const isDesktop = useMediaQuery('(min-width: 1024px)')
  const [mounted, setMounted] = useState(false)
  const [visible, setVisible] = useState(false)
  const [isDragging, setIsDragging] = useState(false)

  useEffect(() => {
    const delay = isDesktop ? 4000 : 3500
    const timer = setTimeout(() => setMounted(true), delay)
    return () => clearTimeout(timer)
  }, [isDesktop])

  useEffect(() => {
    if (!mounted) return
    const raf = requestAnimationFrame(() => setVisible(true))
    return () => cancelAnimationFrame(raf)
  }, [mounted])

  if (!isDesktop) {
    if (!mounted) {
      return (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-30" aria-hidden="true">
          <SpherePlaceholder size={500} />
        </div>
      )
    }
    return (
      <div
        className="pointer-events-none absolute inset-0 flex items-center justify-center transition-opacity duration-1000"
        style={{ opacity: visible ? 0.3 : 0 }}
        aria-hidden="true"
      >
        <ThreeSphere interactive={false} />
      </div>
    )
  }

  if (!mounted) {
    return (
      <div className="absolute right-0 top-1/2 -translate-y-1/2 select-none opacity-70" aria-hidden="true">
        <SpherePlaceholder size={400} />
      </div>
    )
  }

  return (
    <div
      className="absolute right-0 top-1/2 -translate-y-1/2 select-none transition-opacity duration-1000"
      style={{ cursor: isDragging ? 'grabbing' : 'grab', opacity: visible ? 0.7 : 0 }}
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
