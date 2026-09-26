import type { ButtonHTMLAttributes } from 'react'

interface BracketButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string
  onDark?: boolean
}

// The "| EXPLORE |" / "| SUBMIT |" bracketed text-button from the reference
// design — a minimal, no-fill action used inline within a section.
export function BracketButton({ label, onDark = false, className = '', ...rest }: BracketButtonProps) {
  const color = onDark ? 'text-cloud' : 'text-ink'

  return (
    <button
      type="button"
      className={`group flex items-center gap-3 font-display text-xs font-bold tracking-[0.3em] ${color} ${className}`}
      {...rest}
    >
      <span className="h-4 w-px bg-current opacity-60 transition group-hover:h-5" aria-hidden="true" />
      <span className="transition group-hover:opacity-70">{label.toUpperCase()}</span>
      <span className="h-4 w-px bg-current opacity-60 transition group-hover:h-5" aria-hidden="true" />
    </button>
  )
}
