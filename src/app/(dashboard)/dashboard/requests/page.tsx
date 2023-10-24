import { authOptions } from '@/app/lib/auth'
import FriendRequest from '@/components/FriendRequest'
import { fetchRedis } from '@/helpers/redis'
import { getServerSession } from 'next-auth'
import { notFound } from 'next/navigation'
import React from 'react'

export default async function page() {
    const session = await getServerSession(authOptions)

    if (!session) {
        notFound()
    }

    const incomingSenderIds = await fetchRedis(
        'smembers', 
        `user:${session.user.id}:incoming_friend_requests`
    ) as string[]

    const incomingFriendRequests = await Promise.all(
        incomingSenderIds.map(async(senderId) => {
            const sender = await fetchRedis(
                'get',
                `user:${senderId}`
            ) as string

            const senderParsed = JSON.parse(sender) as User
            return {
                senderId,
                senderEmail: senderParsed.email
            }
        })
    )

  return (
    <main className='pt-8'>
        <h2 className="text-2xl my-5">Add a friend by E-mail</h2>
        <div className='flex flex-col gap-4'>
            <FriendRequest 
            incomingFriendRequest={incomingFriendRequests} 
            sessionId={session.user.id}/>
        </div>
    </main> 
  )
}
