import { about } from '@/data/about'
import { Container } from '@/components/ui/Container'
import { BracketButton } from '@/components/ui/BracketButton'

// The black horizontal band that opens the About section, sitting flush
// against the bottom of the Hero (full-bleed, no section padding above it)
// and immediately above the existing "About Me" content. Deliberately a
// plain bold headline rather than the boxed SectionHeading style used for
// "About Me" / "Skills" / etc., so the two don't read as two stacked
// section titles.
export function AboutIntroBanner() {
  return (
    <div className="relative overflow-hidden bg-[#1d1d1d] py-10 sm:py-12 lg:py-14">
      <svg
        aria-hidden="true"
        viewBox="0 0 34 34"
        className="pointer-events-none absolute -right-10 top-1/2 hidden h-56 w-56 -translate-y-1/2 text-cloud/10 lg:block xl:-right-6 xl:h-72 xl:w-72"
      >
        <path
          d="M6 8h20l-15 18h20"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </svg>

      <Container>
        <div className="relative z-10 max-w-lg">
          <h3 className="font-display text-2xl font-bold uppercase tracking-tight text-cloud sm:text-3xl">
            {about.banner.heading}
          </h3>
          <p className="mt-4 text-sm leading-relaxed text-muted-dark sm:text-base">{about.banner.body}</p>
          <div className="mt-6">
            <BracketButton
              onDark
              label={about.banner.action}
              onClick={() => document.getElementById('about-content')?.scrollIntoView({ behavior: 'smooth' })}
            />
          </div>
        </div>
      </Container>
    </div>
  )
}
