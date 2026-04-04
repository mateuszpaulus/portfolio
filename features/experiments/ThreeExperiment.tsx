'use client'

import dynamic from 'next/dynamic'
import { useState, useEffect } from 'react'
import { useMediaQuery } from '@/hooks/useMediaQuery'

const ThreeSphere = dynamic(() => import('./ThreeSphere'), {
  ssr: false,
  loading: () => <SpherePlaceholder />,
})

function SpherePlaceholder() {
  return (
    <div
      className="relative h-[280px] w-[280px] rounded-full"
      aria-hidden="true"
      style={{
        background: 'radial-gradient(circle at 35% 35%, rgba(99,102,241,0.15), transparent 70%)',
        border: '1px solid rgba(99,102,241,0.2)',
        boxShadow: '0 0 60px rgba(99,102,241,0.08)',
        animation: 'pulse-glow 4s ease-in-out infinite',
      }}
    >
      <div
        className="absolute inset-4 rounded-full"
        style={{
          border: '1px solid rgba(99,102,241,0.15)',
          animation: 'spin-slow 20s linear infinite',
        }}
      />
      <div
        className="absolute inset-[40%] rounded-full"
        style={{
          background: 'rgba(99,102,241,0.3)',
          animation: 'pulse-glow 2s ease-in-out infinite',
        }}
      />
    </div>
  )
}

function SphereTooltip() {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), 3000)
    return () => clearTimeout(timer)
  }, [])

  if (!visible) return null

  return (
    <div
      className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-background/80 px-3 py-1 text-xs text-[var(--foreground-secondary)] backdrop-blur-sm transition-opacity duration-500"
      style={{ opacity: visible ? 1 : 0 }}
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
    const delay = isDesktop ? 2000 : 0
    const timer = setTimeout(() => setMounted(true), delay)
    return () => clearTimeout(timer)
  }, [isDesktop])

  if (!mounted) return null

  if (!isDesktop) {
    return (
      <div
        className="flex justify-center opacity-60 lg:hidden"
        aria-hidden="true"
      >
        <SpherePlaceholder />
      </div>
    )
  }

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
        <ThreeSphere />
        <SphereTooltip />
      </div>
    </div>
  )
}
