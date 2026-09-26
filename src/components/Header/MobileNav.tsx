import { useEffect, useRef } from 'react'
import { gsap } from '@/lib/gsap'
import { useLockBodyScroll } from '@/hooks/useLockBodyScroll'
import { personal } from '@/data/personal'
import { SocialLinks } from '@/components/ui/SocialLinks'
import { PillButton } from '@/components/ui/PillButton'
import type { NavLink } from '@/components/Header/navLinks'

interface MobileNavProps {
  open: boolean
  onClose: () => void
  links: NavLink[]
  resumeUrl: string
}

// Slides in from the left over a dimmed backdrop; the page behind never
// moves. Escape and backdrop clicks close it, and focus returns to the
// hamburger trigger on close.
export function MobileNav({ open, onClose, links, resumeUrl }: MobileNavProps) {
  const panelRef = useRef<HTMLDivElement>(null)
  const backdropRef = useRef<HTMLDivElement>(null)
  const firstLinkRef = useRef<HTMLAnchorElement>(null)

  useLockBodyScroll(open)

  useEffect(() => {
    const panel = panelRef.current
    const backdrop = backdropRef.current
    if (!panel || !backdrop) return

    if (open) {
      gsap.set(panel, { xPercent: -100 })
      gsap.set(backdrop, { opacity: 0, pointerEvents: 'auto' })
      gsap.to(backdrop, { opacity: 1, duration: 0.3, ease: 'power2.out' })
      gsap.to(panel, { xPercent: 0, duration: 0.45, ease: 'power3.out' })
      firstLinkRef.current?.focus()
    } else {
      gsap.to(panel, { xPercent: -100, duration: 0.35, ease: 'power3.in' })
      gsap.to(backdrop, { opacity: 0, duration: 0.25, ease: 'power2.in', onComplete: () => {
        gsap.set(backdrop, { pointerEvents: 'none' })
      } })
    }
  }, [open])

  useEffect(() => {
    if (!open) return
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [open, onClose])

  return (
    <>
      <div
        ref={backdropRef}
        onClick={onClose}
        aria-hidden="true"
        style={{ opacity: 0, pointerEvents: 'none' }}
        className="fixed inset-0 z-40 bg-ink/60 backdrop-blur-sm lg:hidden"
      />
      <div
        ref={panelRef}
        style={{ transform: 'translateX(-100%)' }}
        role="dialog"
        aria-modal="true"
        aria-label="Site navigation"
        className="on-dark fixed inset-y-0 left-0 z-50 flex w-[82%] max-w-xs flex-col justify-between bg-ink px-7 py-8 lg:hidden"
      >
        <div>
          <div className="mb-10 flex items-center justify-between">
            <span className="font-display text-sm font-bold tracking-[0.2em] text-cloud">MENU</span>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close navigation menu"
              className="flex h-9 w-9 items-center justify-center text-cloud"
            >
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M1 1l16 16M17 1L1 17" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
              </svg>
            </button>
          </div>

          <nav aria-label="Mobile primary">
            <ul className="flex flex-col gap-5">
              {links.map((link, index) => (
                <li key={link.id}>
                  <a
                    ref={index === 0 ? firstLinkRef : undefined}
                    href={link.href}
                    onClick={onClose}
                    className="font-display text-xl font-semibold text-cloud transition-colors hover:text-white"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <PillButton
            as="a"
            href={resumeUrl}
            target="_blank"
            rel="noreferrer"
            variant="solid"
            className="mt-8 w-full bg-cloud text-ink"
          >
            Resume
          </PillButton>
        </div>

        <div className="flex flex-col gap-4">
          <SocialLinks links={personal.socials} variant="dark" size="sm" />
          <p className="text-xs text-muted-dark">{personal.email}</p>
        </div>
      </div>
    </>
  )
}
