import { useState, useEffect, useRef } from 'react'

/**
 * Hook que detecta cuando un elemento entra en viewport.
 * Una vez visible, permanece visible (no vuelve a ocultarse).
 */
export function useInView(options = {}) {
  const [isVisible, setIsVisible] = useState(true) // true inicial para evitar pantalla negra
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1, rootMargin: '50px', ...options }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [options.threshold, options.rootMargin])

  return [ref, isVisible]
}
