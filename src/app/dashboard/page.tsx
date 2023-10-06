'use client'

import { signOut } from 'next-auth/react'

export default function dashboard() {
  return (
    <div>
      <button className='bg-red-400'
      onClick={async() => {await signOut({
        callbackUrl: '/'
      })}}>Sign out</button>
    </div>
  )
}
