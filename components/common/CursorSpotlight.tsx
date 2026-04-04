'use client'

import { useEffect, useRef } from 'react'
import { useMediaQuery } from '@/hooks/useMediaQuery'

export default function CursorSpotlight() {
  const spotlightRef = useRef<HTMLDivElement>(null)
  const isDesktop = useMediaQuery('(min-width: 1024px)')

  useEffect(() => {
    if (!isDesktop) return

    function handleMouseMove(e: MouseEvent) {
      if (!spotlightRef.current) return
      spotlightRef.current.style.left = `${e.clientX}px`
      spotlightRef.current.style.top = `${e.clientY}px`
      spotlightRef.current.style.opacity = '1'
    }

    function handleMouseLeave() {
      if (!spotlightRef.current) return
      spotlightRef.current.style.opacity = '0'
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    document.addEventListener('mouseleave', handleMouseLeave)
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [isDesktop])

  if (!isDesktop) return null

  return (
    <div
      ref={spotlightRef}
      className="pointer-events-none fixed z-0 opacity-0 transition-opacity duration-300"
      style={{
        width: '600px',
        height: '600px',
        transform: 'translate(-50%, -50%)',
        background: 'radial-gradient(circle, rgba(99,102,241,0.04) 0%, transparent 70%)',
        borderRadius: '50%',
      }}
      aria-hidden="true"
    />
  )
}
