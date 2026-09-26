import { useEffect, useRef, useState } from 'react'
import { navLinks } from '@/components/Header/navLinks'
import { PillButton } from '@/components/ui/PillButton'
import { gsap } from '@/lib/gsap'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'

const SCROLL_THRESHOLD = 24

// Compact black nav bar for scroll: stays off-screen above the viewport
// until the user scrolls past the hero's top, then animates down and pins
// itself in place. Scrolling back to the top reverses it, which hands
// visibility back to the primary/fancy header in the hero. Desktop-only,
// mirroring the primary header's own lg-and-up nav.
export function StickyHeader() {
  const barRef = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  const prefersReducedMotion = usePrefersReducedMotion()

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > SCROLL_THRESHOLD)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const bar = barRef.current
    if (!bar) return

    if (prefersReducedMotion) {
      gsap.set(bar, { yPercent: visible ? 0 : -100 })
      return
    }

    gsap.to(bar, {
      yPercent: visible ? 0 : -100,
      duration: 0.45,
      ease: visible ? 'power3.out' : 'power2.in',
    })
  }, [visible, prefersReducedMotion])

  return (
    <div
      ref={barRef}
      aria-hidden={!visible}
      style={{ transform: 'translateY(-100%)' }}
      className={`fixed inset-x-0 top-0 z-50 hidden bg-ink lg:block ${visible ? '' : 'pointer-events-none'}`}
    >
      <div className="mx-auto flex max-w-[1680px] items-center justify-end gap-8 px-12 py-4">
        <nav aria-label="Secondary" className="flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={link.href}
              tabIndex={visible ? 0 : -1}
              className="font-display text-xs font-semibold tracking-[0.15em] text-cloud/85 transition-colors hover:text-cloud"
            >
              {link.label.toUpperCase()}
            </a>
          ))}
        </nav>

        <PillButton
          as="a"
          href="#contact"
          variant="solid"
          tabIndex={visible ? 0 : -1}
          className="bg-cloud text-ink hover:bg-white hover:text-ink"
        >
          Contact me
        </PillButton>
      </div>
    </div>
  )
}
