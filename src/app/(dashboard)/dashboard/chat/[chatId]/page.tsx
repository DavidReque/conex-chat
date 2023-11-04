import { authOptions } from '@/app/lib/auth'
import { db } from '@/app/lib/db'
import { messageArrayValidator } from '@/app/lib/validations/message'
import Messages from '@/components/Messages'
import { fetchRedis } from '@/helpers/redis'
import { getServerSession } from 'next-auth'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import React from 'react'

interface pageProps {
  params: {
    chatId: string
  }
}

async function getChatMessages(chatId: string) {
  try {
    const results: string[] = await fetchRedis(
      'zrange',
      `chat:${chatId}:messages`,
      0,
      -1
    )

    const dbMessages = results.map((msg) => {
      return JSON.parse(msg) as Message;
    });
    
    const reservedDbMessages = dbMessages.reverse()

    const messages = messageArrayValidator.parse(reservedDbMessages)

    return messages
  } catch (error) {
    console.error(error);
    notFound()
  }
}

const page = async ({params}: pageProps) => {
  const {chatId} = params
  const session = await getServerSession(authOptions) 

  if (!session) {
    notFound()
  }

  const {user} = session

  const [userId1, userId12] = chatId.split('--')

  if (user.id !== userId1 && user.id !== userId12) {
    notFound()
  }

  const chatPartnerId = user.id === userId1 ? userId12 : userId1
  const chatPartner = (await db.get(`user:${chatPartnerId}`)) as User
  const initialMessages = await getChatMessages(chatId)

  return (
    <div className='flex-1 justify-between flex flex-col h-full max-h-[calc(100vh-6rem)]'>
      <div className='flex sm:items-center justify-between py-3 border-b-2 border-gray-200'>
        <div className='relative flex items-center space-x-4'>
          <div className='relative'>
            <div className='relative w-8 sm:w-12 h-8 sm:h-12'>
                <Image 
                fill
                referrerPolicy='no-referrer'
                src={chatPartner.image}
                alt={`${chatPartner.name} profile picture`}
                className='rounded-full'
                />
            </div>
          </div>

          <div className='flex flex-col leading-tight'>
            <div className='text-xl items-center'>
              <span className='text-gray-700 mr-3 font-semibold'>{chatPartner.name}</span>
            </div>

            <span className='text-sm text-gray-600'>{chatPartner.email}</span>
          </div>
        </div>
      </div>

      <Messages/>
    </div>
  )
}

export default page
