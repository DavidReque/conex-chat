import { authOptions } from '@/app/lib/auth'
import { getServerSession } from 'next-auth'
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
    <div>{children}</div>
  )
}

export default Layout