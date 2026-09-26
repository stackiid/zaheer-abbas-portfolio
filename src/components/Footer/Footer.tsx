import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowUp } from '@fortawesome/free-solid-svg-icons'
import { personal } from '@/data/personal'
import { Container } from '@/components/ui/Container'
import { SocialLinks } from '@/components/ui/SocialLinks'

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="on-dark bg-ink py-12 text-cloud">
      <Container className="flex flex-col items-center gap-6 text-center">
        <a
          href="#top"
          className="flex flex-col items-center gap-2 text-cloud/80 transition-colors hover:text-cloud"
        >
          <FontAwesomeIcon icon={faArrowUp} />
          <span className="font-display text-xs font-bold tracking-[0.25em]">BACK TO TOP</span>
        </a>

        <SocialLinks links={personal.socials} variant="dark" size="sm" />

        <p className="text-xs text-muted-dark">
          © {year} {personal.name}. All rights reserved.
        </p>
      </Container>
    </footer>
  )
}
