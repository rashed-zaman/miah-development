"use client"

import { useSelector } from 'react-redux'
import Link from 'next/link'

export default function CatalogViewer() {
  const catalog = useSelector((state) => state.catalog.catalog)

  if (!catalog) return <div>Loading catalog...</div>

  return (
    <section style={{ padding: 16, fontFamily: 'Arial, sans-serif' }}>
      <h2>Catalog (from Redux)</h2>
      <ul>
        {Object.keys(catalog).map((deptKey) => (
          <li key={deptKey} style={{ marginBottom: 8 }}>
            <strong>{catalog[deptKey].name}</strong>
            <ul>
              {Object.keys(catalog[deptKey].categories).map((catKey) => (
                <li key={catKey}>
                  <Link href={`/${deptKey}/${catKey}`}>/{deptKey}/{catKey}</Link>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </section>
  )
}
