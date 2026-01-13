"use client"

import Link from 'next/link'
import { AuthButtons } from '@/components'

export default function Header() {
  return (
    <header style={{ position: 'relative', padding: 12 }}>
      <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Link href="/">Home</Link>
        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <AuthButtons />
        </div>
      </nav>
    </header>
  )
}
