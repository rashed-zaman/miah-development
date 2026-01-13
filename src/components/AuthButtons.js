"use client"

import { signIn, signOut, useSession } from 'next-auth/react'

export default function AuthButtons() {
  const { data: session, status } = useSession()

  if (status === 'loading') return null

  return (
    <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
      {session ? (
        <>
          <span>Signed in as {session.user?.name}</span>
          <button onClick={() => signOut()}>Sign out</button>
        </>
      ) : (
        <button onClick={() => signIn()}>Sign in</button>
      )}
    </div>
  )
}
