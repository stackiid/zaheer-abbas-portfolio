import type { AnchorHTMLAttributes, ButtonHTMLAttributes } from 'react'

type CommonProps = { label: string; onDark?: boolean }
type AsButton = CommonProps & { as?: 'button' } & ButtonHTMLAttributes<HTMLButtonElement>
type AsAnchor = CommonProps & { as: 'a' } & AnchorHTMLAttributes<HTMLAnchorElement>

// The "| EXPLORE |" / "| SUBMIT |" bracketed text-button from the reference
// design — a minimal, no-fill action used inline within a section. Renders
// as a <button> by default, or as an <a> (e.g. the hero's "Resume" link)
// when `as="a"` is passed, so every bracket CTA in the app shares one look.
export function BracketButton(props: AsButton | AsAnchor) {
  const { label, onDark = false, className = '', as, ...rest } = props
  const color = onDark ? 'text-cloud' : 'text-ink'
  const classes = `group flex items-center gap-3 font-display text-xs font-bold tracking-[0.3em] ${color} ${className}`

  const brackets = (
    <>
      <span className="h-4 w-px bg-current opacity-60 transition group-hover:h-5" aria-hidden="true" />
      <span className="transition group-hover:opacity-70">{label.toUpperCase()}</span>
      <span className="h-4 w-px bg-current opacity-60 transition group-hover:h-5" aria-hidden="true" />
    </>
  )

  if (as === 'a') {
    return (
      <a className={classes} {...(rest as AnchorHTMLAttributes<HTMLAnchorElement>)}>
        {brackets}
      </a>
    )
  }

  return (
    <button type="button" className={classes} {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}>
      {brackets}
    </button>
  )
}
