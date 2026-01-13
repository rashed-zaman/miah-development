"use client"

import { useSelector } from 'react-redux'
import { Breadcrumbs } from '@/components'

export default function DepartmentLayout({ children }) {


  return (
    <div style={{ fontFamily: 'Arial, sans-serif', padding: 12 }}>

      <div>{children}</div>
    </div>
  )
}
