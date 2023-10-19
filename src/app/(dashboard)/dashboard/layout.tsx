import { authOptions } from '@/app/lib/auth'
import { getServerSession } from 'next-auth'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { FC, ReactNode } from 'react'

interface LayoutProps {
    children: ReactNode
}

const Layout: FC<LayoutProps> = async ({children}) => {
    const session = await getServerSession(authOptions)

    if (!session) {
        notFound()
    }

  return (
    <div className='w-full flex h-screen'>
      <div className='flex h-full w-full max-w-xs grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 bg-white px-6'></div>
      <Link href='/dashboard' className='flex h-16 shrink-0 items-center'>
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-16 h-16 text-indigo-600">
  <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 4.5l7.5 7.5-7.5 7.5m-6-15l7.5 7.5-7.5 7.5" />
</svg>

      </Link>
      {children}
    </div>
  )
}

export default Layout