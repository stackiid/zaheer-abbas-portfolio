// Abstract monogram mark, echoing the geometric logo in the reference hero.
// Color is controlled by the parent via `currentColor` (text-* utility).
export function Logo() {
  return (
    <a href="#top" aria-label="Zaheer Abbas — back to top" className="inline-flex items-center text-current">
      <svg width="32" height="32" viewBox="0 0 34 34" fill="none">
        <path
          d="M6 8h20l-15 18h20"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </svg>
    </a>
  )
}
