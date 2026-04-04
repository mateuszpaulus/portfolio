import { useEffect, useRef, useState } from 'react'

interface UseInViewOptions {
  threshold?: number
  triggerOnce?: boolean
}

interface EntryHandlerOptions {
  entry: IntersectionObserverEntry
  setIsInView: (v: boolean) => void
  triggerOnce: boolean
  disconnect: () => void
}

function handleEntry({ entry, setIsInView, triggerOnce, disconnect }: EntryHandlerOptions) {
  if (entry.isIntersecting) {
    setIsInView(true)
    if (triggerOnce) disconnect()
  } else if (!triggerOnce) {
    setIsInView(false)
  }
}

export function useInView<T extends Element>(
  { threshold = 0.1, triggerOnce = true }: UseInViewOptions = {}
): [React.RefObject<T | null>, boolean] {
  const ref = useRef<T | null>(null)
  const [isInView, setIsInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => handleEntry({ entry, setIsInView, triggerOnce, disconnect: () => observer.disconnect() }),
      { threshold }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold, triggerOnce])

  return [ref, isInView]
}
