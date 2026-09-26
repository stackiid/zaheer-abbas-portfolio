import type { ContactConfig } from '@/types'

export const contact: ContactConfig = {
  eyebrow: 'Contact',
  heading: 'Contact',
  intro: "Have a project in mind or a role to discuss? Send a message and I'll get back to you.",
  // Add your Formspree endpoint here, e.g. https://formspree.io/f/xxxxxxx
  formspreeEndpoint: '',
  autoHideMs: 5000,
  fields: [
    { name: 'name', label: 'Name', type: 'text', placeholder: 'Enter your name*', required: true },
    { name: 'email', label: 'Email', type: 'email', placeholder: 'Enter your email*', required: true },
    { name: 'phone', label: 'Phone number', type: 'tel', placeholder: 'Phone number', required: false },
    { name: 'message', label: 'Message', type: 'textarea', placeholder: 'Your message*', required: true },
  ],
}
