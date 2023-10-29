'use client'

import { chatHrefConstructor } from "@/app/lib/utils"
import { usePathname, useRouter } from "next/navigation"
import { FC, useEffect, useState } from "react"

interface SideBarChatListProps {
    friends: User[]
    sessionId: string
}

const SideBarChatList: FC<SideBarChatListProps> = ({friends, sessionId}) => {
    const router = useRouter()
    const pathname = usePathname()

    const [unseenMessages, setUnseenMessages] = useState<Message[]>([])

    useEffect(() => {
       if (pathname?.includes('chat')) {
        setUnseenMessages((prev) => {
            return prev.filter((msg) => !pathname.includes(msg.senderId))
        })
       }
    }, [pathname])

  return (
    <ul role='list' className='max-h-[25rem] overflow-y-auto -mx-2 space-y-1'>
        {
            friends.sort().map((friend) => {
                const unseenMessagesCount = unseenMessages.filter((unseenMsg) => {
                    return unseenMsg.senderId === friend.id
                }).length

                return(
                    <li key={friend.id}>
                        <a href={`/dashboard/chat/${chatHrefConstructor(
                            sessionId,
                            friend.id
                        )}`}>Hello</a>
                    </li>
                )
            })   
        }
    </ul>
  )
}

export default SideBarChatList
