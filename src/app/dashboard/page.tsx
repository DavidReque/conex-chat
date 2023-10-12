'use client'

import Button from '@/components/ui/Button'
import ButtonSignOut from '@/components/ui/ButtonSignOut'
import { useSession } from 'next-auth/react'

export default function dashboard() {
  const {data: session} = useSession()

  return (
    <div>
      {session?.user ? (
        <div>
          <p>{session.user.name}</p>
          <img src={session.user.image} alt="" />
          <ButtonSignOut/>
        </div>
      ) : (
        <Button/>
      )}

    </div>
  )
}
