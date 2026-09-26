import { useState } from 'react'
import { personal } from '@/data/personal'
import { navLinks } from '@/components/Header/navLinks'
import { Logo } from '@/components/Header/Logo'
import { MobileNav } from '@/components/Header/MobileNav'
import { PillButton } from '@/components/ui/PillButton'

// Header sits transparently over the hero. Desktop shows the full text nav
// plus the "Contact me" pill; below `lg` a hamburger opens the slide panel.
export function Header() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <>
      <header id="top" className="absolute inset-x-0 top-0 z-40">
        <div className="flex items-center justify-between px-6 py-6 sm:px-10 lg:px-12">
          <span className="text-cloud lg:text-ink">
            <Logo />
          </span>

          <div className="hidden items-center gap-8 lg:flex">
            <nav aria-label="Primary" className="flex items-center gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.id}
                  href={link.href}
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
              className="bg-cloud text-ink hover:bg-white hover:text-ink"
            >
              Contact me
            </PillButton>
          </div>

          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            aria-label="Open navigation menu"
            aria-expanded={menuOpen}
            className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 lg:hidden"
          >
            <span className="h-0.5 w-6 bg-cloud" />
            <span className="h-0.5 w-6 bg-cloud" />
            <span className="h-0.5 w-4 self-end bg-cloud" />
          </button>
        </div>
      </header>

      <MobileNav open={menuOpen} onClose={() => setMenuOpen(false)} links={navLinks} resumeUrl={personal.resumeUrl} />
    </>
  )
}
