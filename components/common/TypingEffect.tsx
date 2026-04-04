'use client'

import { useState, useEffect, useRef } from 'react'

interface TypingEffectProps {
  words: string[]
  speed?: number
  deleteSpeed?: number
  pauseTime?: number
}

export function TypingEffect({
  words,
  speed = 100,
  deleteSpeed = 50,
  pauseTime = 2000,
}: TypingEffectProps) {
  const [displayed, setDisplayed] = useState('')
  const [wordIndex, setWordIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    const currentWord = words[wordIndex % words.length]

    function tick() {
      if (!isDeleting) {
        if (displayed.length < currentWord.length) {
          setDisplayed(currentWord.slice(0, displayed.length + 1))
          timeoutRef.current = setTimeout(tick, speed)
        } else {
          timeoutRef.current = setTimeout(() => setIsDeleting(true), pauseTime)
        }
      } else {
        if (displayed.length > 0) {
          setDisplayed(currentWord.slice(0, displayed.length - 1))
          timeoutRef.current = setTimeout(tick, deleteSpeed)
        } else {
          setIsDeleting(false)
          setWordIndex(i => i + 1)
        }
      }
    }

    timeoutRef.current = setTimeout(tick, isDeleting ? deleteSpeed : speed)
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [displayed, isDeleting, wordIndex, words, speed, deleteSpeed, pauseTime])

  return (
    <span className="text-[var(--brand)]">
      {displayed}
      <span
        className="ml-0.5 inline-block w-[2px] animate-[blink_1s_step-end_infinite] bg-[var(--brand)]"
        aria-hidden="true"
        style={{ height: '1em', verticalAlign: 'middle' }}
      />
    </span>
  )
}
