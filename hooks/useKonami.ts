import { useState, useEffect, useCallback, useRef } from 'react'

const KONAMI = [
  'ArrowUp', 'ArrowUp',
  'ArrowDown', 'ArrowDown',
  'ArrowLeft', 'ArrowRight',
  'ArrowLeft', 'ArrowRight',
  'b', 'a',
]

export const KONAMI_SEQUENCE = KONAMI
export const KONAMI_TOTAL = KONAMI.length

export function useKonami(onSuccess: () => void) {
  const [progress, setProgress] = useState<string[]>([])
  const [wrongKey, setWrongKey] = useState(false)
  const progressRef = useRef<string[]>([])
  const onSuccessRef = useRef(onSuccess)

  useEffect(() => { onSuccessRef.current = onSuccess }, [onSuccess])

  const addKey = useCallback((key: string) => {
    const prev = progressRef.current
    const next = [...prev, key]
    const isValid = next.every((k, i) => k === KONAMI[i])

    if (!isValid) {
      setWrongKey(true)
      progressRef.current = []
      setProgress([])
      setTimeout(() => setWrongKey(false), 600)
      return
    }

    // Valid key — clear any lingering error state
    setWrongKey(false)

    if (next.length === KONAMI.length) {
      onSuccessRef.current()
      progressRef.current = []
      setProgress([])
      return
    }

    progressRef.current = next
    setProgress(next)
  }, [])

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      addKey(e.key)
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [addKey])

  return { progress, addKey, wrongKey, total: KONAMI_TOTAL }
}
