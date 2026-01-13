
"use client"
import LayoutDashboard from '@/components/route/dashboard/LayoutDashboard'
import WishList from '@/components/route/dashboard/WishList'
import React from 'react'

export default function page() {
  return (
    <div>
        <LayoutDashboard>
            <WishList />
        </LayoutDashboard>
    </div>
  )
}
