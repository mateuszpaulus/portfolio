'use client'

import { useEffect, useRef, useState } from 'react'
import { useMediaQuery } from '@/hooks/useMediaQuery'

type CursorState = 'default' | 'hover' | 'text' | 'clicking'

function resolveCursorState(target: HTMLElement): CursorState {
  if (
    target.tagName === 'A' ||
    target.tagName === 'BUTTON' ||
    target.closest('a') ||
    target.closest('button')
  ) return 'hover'
  if (['P', 'H1', 'H2', 'H3', 'SPAN', 'LABEL'].includes(target.tagName)) return 'text'
  return 'default'
}

export default function CustomCursor() {
  const isDesktop = useMediaQuery('(min-width: 1024px)')
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const [state, setState] = useState<CursorState>('default')

  // Use refs for values read inside RAF — avoids stale closure
  const cursorPos = useRef({ x: -100, y: -100 })
  const ringPos = useRef({ x: -100, y: -100 })
  const stateRef = useRef<CursorState>('default')
  const clickingRef = useRef(false)

  // Keep stateRef in sync with state
  useEffect(() => { stateRef.current = state }, [state])

  useEffect(() => {
    if (!isDesktop) return

    document.body.style.cursor = 'none'

    function handleMouseMove(e: MouseEvent) {
      cursorPos.current = { x: e.clientX, y: e.clientY }
    }
    function handleMouseDown() {
      clickingRef.current = true
      setState('clicking')
    }
    function handleMouseUp() {
      clickingRef.current = false
      setState(stateRef.current === 'clicking' ? 'default' : stateRef.current)
    }
    function handleMouseOver(e: MouseEvent) {
      if (clickingRef.current) return
      setState(resolveCursorState(e.target as HTMLElement))
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    window.addEventListener('mousedown', handleMouseDown)
    window.addEventListener('mouseup', handleMouseUp)
    window.addEventListener('mouseover', handleMouseOver)

    let rafId: number
    function animate() {
      // Dot: immediate follow
      if (dotRef.current) {
        dotRef.current.style.left = `${cursorPos.current.x}px`
        dotRef.current.style.top = `${cursorPos.current.y}px`
      }
      // Ring: lerp follow
      ringPos.current.x += (cursorPos.current.x - ringPos.current.x) * 0.12
      ringPos.current.y += (cursorPos.current.y - ringPos.current.y) * 0.12
      if (ringRef.current) {
        ringRef.current.style.left = `${ringPos.current.x}px`
        ringRef.current.style.top = `${ringPos.current.y}px`
      }
      rafId = requestAnimationFrame(animate)
    }
    animate()

    return () => {
      document.body.style.cursor = ''
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mousedown', handleMouseDown)
      window.removeEventListener('mouseup', handleMouseUp)
      window.removeEventListener('mouseover', handleMouseOver)
      cancelAnimationFrame(rafId)
    }
  }, [isDesktop])

  if (!isDesktop) return null

  const isClicking = state === 'clicking'
  const isHover = state === 'hover'
  const isText = state === 'text'

  return (
    <>
      {/* Dot — centered via translate(-50%,-50%), position set by left/top in RAF */}
      <div
        ref={dotRef}
        className="pointer-events-none fixed z-[9999]"
        style={{
          left: -100,
          top: -100,
          transform: `translate(-50%, -50%) scale(${isClicking ? 0.7 : 1})`,
          width: isText ? 2 : 8,
          height: isText ? 18 : 8,
          borderRadius: isText ? 2 : '50%',
          background: 'var(--brand)',
          opacity: isHover ? 0 : 1,
          transition:
            'width 150ms ease, height 150ms ease, border-radius 150ms ease, opacity 150ms ease, transform 100ms ease',
        }}
      />
      {/* Ring — same centering approach */}
      <div
        ref={ringRef}
        className="pointer-events-none fixed z-[9998]"
        style={{
          left: -100,
          top: -100,
          transform: `translate(-50%, -50%) scale(${isClicking ? 0.7 : 1})`,
          width: isHover ? 48 : isText ? 24 : 32,
          height: isHover ? 48 : isText ? 24 : 32,
          borderRadius: '50%',
          border: '1.5px solid var(--brand)',
          background: isHover ? 'rgba(99,102,241,0.1)' : 'transparent',
          opacity: 0.7,
          transition:
            'width 200ms ease, height 200ms ease, background 200ms ease, transform 100ms ease',
        }}
      />
    </>
  )
}
