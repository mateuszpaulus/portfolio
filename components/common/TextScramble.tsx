'use client'

import { useEffect, useState, useRef, useCallback } from 'react'

const CHARS = '!<>-_\\/[]{}—=+*^?#@$%&'

interface TextScrambleProps {
  text: string
  trigger?: 'mount' | 'inView'
  speed?: number
  className?: string
}

export function TextScramble({
  text,
  trigger = 'inView',
  speed = 30,
  className,
}: TextScrambleProps) {
  const [displayText, setDisplayText] = useState(text)
  const ref = useRef<HTMLSpanElement>(null)
  const frameRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const scramble = useCallback(() => {
    if (frameRef.current) clearTimeout(frameRef.current)
    let iteration = 0
    const totalFrames = text.length * 3

    function update() {
      const revealed = Math.floor((iteration / totalFrames) * text.length)
      setDisplayText(
        text
          .split('')
          .map((char, i) => {
            if (char === ' ') return ' '
            if (i < revealed) return char
            return CHARS[Math.floor(Math.random() * CHARS.length)]
          })
          .join('')
      )
      iteration++
      if (iteration < totalFrames + text.length) {
        frameRef.current = setTimeout(update, speed)
      } else {
        setDisplayText(text)
      }
    }
    update()
  }, [text, speed])

  useEffect(() => {
    if (trigger === 'mount') {
      const timer = setTimeout(scramble, 300)
      return () => {
        clearTimeout(timer)
        if (frameRef.current) clearTimeout(frameRef.current)
      }
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          scramble()
          observer.disconnect()
        }
      },
      { threshold: 0.5 }
    )

    if (ref.current) observer.observe(ref.current)
    return () => {
      observer.disconnect()
      if (frameRef.current) clearTimeout(frameRef.current)
    }
  }, [scramble, trigger])

  return (
    <span ref={ref} className={className}>
      {displayText}
    </span>
  )
}
