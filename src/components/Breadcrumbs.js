import Link from 'next/link'

export default function Breadcrumbs({ items = [] }) {
  if (!items || items.length === 0) return null

  return (
    <nav aria-label="Breadcrumb" style={{ marginBottom: 12 }}>
      {items.map((it, idx) => {
        const isLast = idx === items.length - 1
        return (
          <span key={idx} style={{ marginRight: 6 }}>
            {isLast ? (
              <strong>{it.label}</strong>
            ) : (
              <Link href={it.href}>{it.label}</Link>
            )}
            {idx < items.length - 1 ? ' / ' : ''}
          </span>
        )
      })}
    </nav>
  )
}
