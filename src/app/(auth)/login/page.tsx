'use client'

import React, { useState } from 'react'
import { Spinner } from '@nextui-org/react'
import { signIn } from 'next-auth/react'
import toast from 'react-hot-toast'
import Button from '@/components/ui/Button'

export default function Page() {
  const [loading, setLoading] = useState<boolean>(false)

  async function loginWithGoogle() {
    setLoading(true)
    try {
      signIn('google', { callbackUrl: `${window.location.origin}/dashboard` })    } catch (error) {
      toast.error('Something went wrong with your login.')
      console.error(error);
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
        <div className='flex max-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8'>
            <div className='w-full flex flex-col items-center max-w-md space-y-8'>
                <div className='flex flex-col items-center gap-8'>
                    <h2 className='mt-6 text-center text-3xl font-bold tracking-tight text-gray-900'>Sign in to your account</h2>
                </div>
                <div onClick={loginWithGoogle}>
                  {loading ? <Spinner color="default"/> : <Button/>}
                </div>
            </div>
        </div> 
    </>
  )
}
