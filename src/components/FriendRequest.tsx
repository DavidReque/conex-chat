'use client'

import { Check, UserPlus, X } from 'lucide-react'
import React, { FC, useState } from 'react'

interface FriendRequestProps {
    incomingFriendRequest: incomingFriendRequest[]
    sessionId: string
}

const FriendRequest: FC<FriendRequestProps> = ({
    incomingFriendRequest, 
    sessionId
}) => {
    const [friendRequest, setFriendRequest] = useState<incomingFriendRequest[]>(
        incomingFriendRequest
    )

  return (
    <>
        {friendRequest.length === 0 ? (
            <p className='text-sm text-zinc-500'>Nothing to show here...</p>
        ) : (
            friendRequest.map((request) => {
                <div key={request.senderId} className='flex items-center'>
                    <UserPlus className='text-black'/>
                    <p className='font-medium text-lg'>{request.senderEmail}</p>
                    <button aria-label='Accept friend' className='w-8 h-8 bg-indigo-600 hover:bg-indigo-700 grid place-items-center rounded-full transition hover:shadow-md'>
                        <Check className='font-semibold to-white w-3/4 h-3/4' />
                    </button>
                   
                    <button aria-label='deny friend' className='w-8 h-8 bg-red-600 hover:bg-red-700 grid place-items-center rounded-full transition hover:shadow-md'>
                        <X className='font-semibold to-white w-3/4 h-3/4' />
                    </button>
                </div>
            })
        )}
    </>
  )
}

export default FriendRequest