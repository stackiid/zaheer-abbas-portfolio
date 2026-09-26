import { useCallback, useEffect, useRef, useState } from 'react'
import { testimonials } from '@/data/testimonials'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'

const ROTATE_MS = 30_000

// Shows exactly one testimonial at a time and auto-advances every 30s.
// Manual navigation resets the timer so it never fights the visitor.
// Entries without quote text (not yet supplied) are filtered out —
// the component renders nothing if none are ready.
export function TestimonialCarousel() {
  const entries = testimonials.filter((item) => item.quote.trim().length > 0)
  const [index, setIndex] = useState(0)
  const prefersReducedMotion = usePrefersReducedMotion()
  const timerRef = useRef<number | null>(null)

  const clearTimer = () => {
    if (timerRef.current !== null) {
      window.clearInterval(timerRef.current)
      timerRef.current = null
    }
  }

  const restartTimer = useCallback(() => {
    clearTimer()
    if (prefersReducedMotion || entries.length <= 1) return
    timerRef.current = window.setInterval(() => {
      setIndex((current) => (current + 1) % entries.length)
    }, ROTATE_MS)
  }, [entries.length, prefersReducedMotion])

  useEffect(() => {
    restartTimer()
    return clearTimer
  }, [restartTimer])

  if (entries.length === 0) return null

  const goTo = (next: number) => {
    setIndex((next + entries.length) % entries.length)
    restartTimer()
  }

  const current = entries[index]

  return (
    <div className="mx-auto flex max-w-2xl flex-col items-center gap-8 text-center">
      <div aria-live="polite" className="flex min-h-[180px] flex-col items-center justify-center gap-5">
        <p className="text-lg leading-relaxed text-ink sm:text-xl">&ldquo;{current.quote}&rdquo;</p>
        <div>
          <p className="font-display text-sm font-bold text-ink">{current.name}</p>
          <p className="text-xs text-muted">{current.role}</p>
        </div>
      </div>

      {entries.length > 1 && (
        <div className="flex items-center gap-3">
          {entries.map((entry, entryIndex) => (
            <button
              key={entry.id}
              type="button"
              onClick={() => goTo(entryIndex)}
              aria-label={`Show testimonial from ${entry.name}`}
              aria-current={entryIndex === index}
              className={`h-2 w-2 rounded-full transition-all ${
                entryIndex === index ? 'w-6 bg-ink' : 'bg-ink/25 hover:bg-ink/50'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  )
}
