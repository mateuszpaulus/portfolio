'use client'

import { useEffect, useRef } from 'react'
import { useInView } from '@/hooks/useInView'

interface LighthouseCircleProps {
  value: number
  label: string
}

const SIZE = 120
const STROKE = 8
const RADIUS = (SIZE - STROKE) / 2
const CIRCUMFERENCE = 2 * Math.PI * RADIUS

function getColor(value: number): string {
  if (value >= 90) return '#22c55e'
  if (value >= 70) return '#f97316'
  return '#ef4444'
}

export function LighthouseCircle({ value, label }: LighthouseCircleProps) {
  const [ref, isInView] = useInView<HTMLDivElement>({ triggerOnce: true })
  const circleRef = useRef<SVGCircleElement>(null)
  const color = getColor(value)
  const target = CIRCUMFERENCE * (1 - value / 100)

  useEffect(() => {
    const el = circleRef.current
    if (!el || !isInView) return
    el.style.transition = 'stroke-dashoffset 1.2s cubic-bezier(0.4, 0, 0.2, 1)'
    el.style.strokeDashoffset = String(target)
  }, [isInView, target])

  return (
    <div ref={ref} className="flex flex-col items-center gap-2">
      <div className="relative" style={{ width: SIZE, height: SIZE }}>
        <svg
          width={SIZE}
          height={SIZE}
          viewBox={`0 0 ${SIZE} ${SIZE}`}
          className="-rotate-90"
          aria-hidden="true"
        >
          {/* Track */}
          <circle
            cx={SIZE / 2}
            cy={SIZE / 2}
            r={RADIUS}
            fill="none"
            stroke="currentColor"
            strokeWidth={STROKE}
            className="text-border"
          />
          {/* Progress */}
          <circle
            ref={circleRef}
            cx={SIZE / 2}
            cy={SIZE / 2}
            r={RADIUS}
            fill="none"
            stroke={color}
            strokeWidth={STROKE}
            strokeLinecap="round"
            strokeDasharray={CIRCUMFERENCE}
            strokeDashoffset={CIRCUMFERENCE}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-2xl font-bold tabular-nums text-foreground">
            {value}
          </span>
          <span className="text-xs text-[var(--foreground-secondary)]">%</span>
        </div>
      </div>
      <span className="text-center text-sm text-[var(--foreground-secondary)]">
        {label}
      </span>
    </div>
  )
}
