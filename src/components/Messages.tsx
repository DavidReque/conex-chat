'use client'

import { Message } from '@/app/lib/validations/message'
import React, { FC, useRef, useState } from 'react'

interface MessagesProps {
    initialMessages: Message[]
    sessionId: string
}

const Messages: FC<MessagesProps> = ({initialMessages, sessionId}) => {
    const [messages, setMessages] = useState<Message[]>(initialMessages)

    const scrollDownRef = useRef<HTMLDivElement | null>(null)

  return (
    <div id='messages' className='flex h-full flex-1 flex-col-reverse gap-4 p-3 overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-blue-lighter scrollbar-w-2 scrolling-touch'>
        <div ref={scrollDownRef}/>

        {messages.map((message, index) => {
            const isCurrentUser = message.senderId === sessionId

            const hasNextMessageFromSameUser = messages[index - 1]?.senderId === messages[index].senderId

            return (
                <div 
                className='chat-message' 
                key={`${message.id}-${message.timestamp}`}>
                    <div className={cn('flex items-end', {
                        'justify-end': isCurrentUser,
                    })}>
                        <div 
                        className={cn('flex flex-col space-y-2 text-base max-w-xs mx-2', {
                            'order-1 items-center': isCurrentUser,
                            'order-2 items-start': !isCurrentUser
                        }
                        )}>

                        </div>
                    </div>
                </div>
            )
        })}
    </div>
  )
}

export default Messages