'use client'

import Button from '@/components/ui/Button'
import { signOut, useSession } from 'next-auth/react'

export default function dashboard() {
  const {data: session} = useSession()

  return (
    <div>
      {session?.user ? (
        <div>
          <p>{session.user.name}</p>
          <img src={session.user.image} alt="" />
          <button className='bg-red-400'
        onClick={async() => {await signOut({
          callbackUrl: '/'
        })}}>Sign out</button>
        </div>
      ) : (
        <Button/>
      )}

    </div>
  )
}
