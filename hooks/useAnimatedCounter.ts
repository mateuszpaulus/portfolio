'use client'

import { useEffect, useRef, useState } from 'react'
import { useInView } from '@/hooks/useInView'

export function useAnimatedCounter({
  value,
  duration = 2000,
}: {
  value: number
  duration?: number
}): [React.RefObject<HTMLElement | null>, number, boolean] {
  const [ref, isInView] = useInView<HTMLElement>({ triggerOnce: true })
  const [displayValue, setDisplayValue] = useState(0)
  const rafRef = useRef<number | null>(null)

  useEffect(() => {
    if (!isInView) return

    const startTime = performance.now()

    function tick(now: number) {
      const elapsed = now - startTime
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setDisplayValue(Math.round(eased * value))
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(tick)
      }
    }

    rafRef.current = requestAnimationFrame(tick)
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current)
    }
  }, [isInView, value, duration])

  return [ref, displayValue, isInView]
}
