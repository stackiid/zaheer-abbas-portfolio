const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export interface FormValues {
  name: string
  email: string
  phone: string
  message: string
}

export type FormErrors = Partial<Record<keyof FormValues, string>>

// Required-field + email-format validation for the contact form.
// Phone is optional, matching the reference design.
export function validateContactForm(values: FormValues): FormErrors {
  const errors: FormErrors = {}

  if (!values.name.trim()) errors.name = 'Please enter your name.'
  if (!values.email.trim()) {
    errors.email = 'Please enter your email.'
  } else if (!EMAIL_RE.test(values.email.trim())) {
    errors.email = 'Please enter a valid email address.'
  }
  if (!values.message.trim()) errors.message = 'Please enter a message.'

  return errors
}
