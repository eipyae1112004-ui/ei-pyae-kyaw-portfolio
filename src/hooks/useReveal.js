import { useEffect, useRef } from 'react'

/**
 * useReveal — attaches an IntersectionObserver to a ref so elements
 * carrying the `.reveal` class animate into view as the user scrolls.
 * Returns a ref to attach to the container; any descendant with
 * class "reveal" will be toggled to "in-view" once it enters the viewport.
 */
export default function useReveal(options = {}) {
  const containerRef = useRef(null)

  useEffect(() => {
    const root = containerRef.current
    if (!root) return undefined

    const targets = root.classList.contains('reveal')
      ? [root, ...root.querySelectorAll('.reveal')]
      : [...root.querySelectorAll('.reveal')]

    if (targets.length === 0) return undefined

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.15, rootMargin: '0px 0px -60px 0px', ...options }
    )

    targets.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [options])

  return containerRef
}
