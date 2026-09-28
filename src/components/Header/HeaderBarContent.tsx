import { navLinks } from '@/components/Header/navLinks'
import { Logo } from '@/components/Header/Logo'
import { PillButton } from '@/components/ui/PillButton'

interface HeaderBarContentProps {
  /** 'hero': logo adapts to the hero's own diagonal split (light on mobile, dark on the white desktop half).
   *  'scroll': logo is always light, since the Scroll Header's background is always solid black. */
  variant: 'hero' | 'scroll'
  menuOpen: boolean
  onOpenMenu: () => void
  /** false while the Scroll Header is translated off-screen, so its links/button/hamburger
   *  can't be tabbed into until it's actually visible. Always true for the Fancy Header. */
  focusable?: boolean
}

export function HeaderBarContent({ variant, menuOpen, onOpenMenu, focusable = true }: HeaderBarContentProps) {
  const tabIndex = focusable ? undefined : -1

  return (
    <div className="flex items-center justify-between px-6 py-6 sm:px-10 lg:px-12">
      <span className={variant === 'hero' ? 'text-cloud lg:text-ink' : 'text-cloud'}>
        <Logo tabIndex={tabIndex} />
      </span>

      <div className="hidden items-center gap-8 lg:flex">
        <nav aria-label="Primary" className="flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={link.href}
              tabIndex={tabIndex}
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
          tabIndex={tabIndex}
          className="bg-cloud text-ink hover:bg-white hover:text-ink"
        >
          Contact me
        </PillButton>
      </div>

      <button
        type="button"
        onClick={onOpenMenu}
        aria-label="Open navigation menu"
        aria-expanded={menuOpen}
        tabIndex={tabIndex}
        className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 lg:hidden"
      >
        <span className="h-0.5 w-6 bg-cloud" />
        <span className="h-0.5 w-6 bg-cloud" />
        <span className="h-0.5 w-4 self-end bg-cloud" />
      </button>
    </div>
  )
}
