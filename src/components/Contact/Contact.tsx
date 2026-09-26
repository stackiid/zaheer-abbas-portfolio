import { contact } from '@/data/contact'
import { personal } from '@/data/personal'
import { Container } from '@/components/ui/Container'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Divider } from '@/components/ui/Divider'
import { SocialLinks } from '@/components/ui/SocialLinks'
import { ContactForm } from '@/components/Contact/ContactForm'

export function Contact() {
  return (
    <section id="contact" className="bg-paper py-24 sm:py-28">
      <Container>
        <div className="flex flex-col items-center gap-10 text-center">
          <SectionHeading heading={contact.heading} intro={contact.intro} />

          <div className="flex flex-col items-center gap-3 text-sm text-muted">
            <span>
              {personal.email} · {personal.phone}
            </span>
            <SocialLinks links={personal.socials} variant="light" size="sm" />
          </div>

          <Divider />

          <ContactForm />
        </div>
      </Container>
    </section>
  )
}
