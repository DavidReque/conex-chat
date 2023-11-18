import { authOptions } from "@/app/lib/auth"
import { db } from "@/app/lib/db"
import { pusherServer } from "@/app/lib/pusher"
import { toPusherKey } from "@/app/lib/utils"
import { fetchRedis } from "@/helpers/redis"
import { getServerSession } from "next-auth"
import z from "zod"

export async function POST(req: Request) {
    try {
        const body = await req.json()

        const {id: idToAdd} = z.object({id: z.string()}).parse(body)

        const session = await getServerSession(authOptions)

        if (!session) {
            return new Response(
                'Unauthorized',
                {status: 401}
            )
        }

        const isAlreadyFriends = await fetchRedis(
            'sismember',
            `user:${session.user.id}:friends`,
            idToAdd
        )

        if (isAlreadyFriends) {
            return new Response('Already friends', {status: 400})
        }

        const hasFriendsRequest =  await fetchRedis(
            'sismember',
            `user:${session.user.id}:incoming_friend_requests`,
            idToAdd
    )  

        if (!hasFriendsRequest) {
            return new Response(
                'No friend request',
                {status: 400}
            )
        }

        const [useRaw, friendRaw] = (await Promise.all([
            fetchRedis('get', `user:${session.user.id}`),
            fetchRedis('get', `user:${idToAdd}`)
        ])) as [string, string]

        const user = JSON.parse(useRaw) as User
        const friend = JSON.parse(friendRaw) as User

        await Promise.all([
            pusherServer.trigger(toPusherKey(`user:${idToAdd}:friends`), 'new_friend', user),
            pusherServer.trigger(toPusherKey(`user:${session.user.id}:friends`), 'new_friend', friend),

         db.sadd(`user:${session.user.id}:friends`, idToAdd),

         db.sadd(`user:${idToAdd}:friends`, session.user.id),

         db.srem(`user:${session.user.id}:incoming_friend_requests`, idToAdd)
        ])
        
        return new Response('ok')

    } catch (error) {
        console.error(error);

        if (error instanceof z.ZodError) {
            return new Response('invalid request payload', {status: 422})
        }

        return new Response(
            'Invalid request', 
            {status: 400}
        )
    }
}