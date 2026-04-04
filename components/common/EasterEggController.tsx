'use client'

import { useState, useCallback } from 'react'
import confetti from 'canvas-confetti'
import { useKonami } from '@/hooks/useKonami'
import EasterEgg from '@/components/common/EasterEgg'
import EasterEggHint from '@/components/sections/EasterEggHint'

function fireConfetti() {
  confetti({
    particleCount: 150,
    spread: 80,
    origin: { y: 0.6 },
    colors: ['#6366f1', '#818cf8', '#a5b4fc', '#ffffff'],
  })
  setTimeout(() => {
    confetti({ particleCount: 80, angle: 60, spread: 55, origin: { x: 0 }, colors: ['#6366f1', '#818cf8'] })
  }, 300)
  setTimeout(() => {
    confetti({ particleCount: 80, angle: 120, spread: 55, origin: { x: 1 }, colors: ['#6366f1', '#818cf8'] })
  }, 500)
}

export default function EasterEggController() {
  const [active, setActive] = useState(false)

  const trigger = useCallback(() => {
    if (active) return
    setActive(true)
    fireConfetti()
    setTimeout(() => setActive(false), 6000)
  }, [active])

  const { progress, addKey, wrongKey, total } = useKonami(trigger)

  return (
    <>
      <EasterEggHint
        progress={progress}
        addKey={addKey}
        wrongKey={wrongKey}
        total={total}
      />
      <EasterEgg active={active} onClose={() => setActive(false)} />
    </>
  )
}
