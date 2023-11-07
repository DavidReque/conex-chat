import { authOptions } from "@/app/lib/auth"
import { db } from "@/app/lib/db"
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

        await db.sadd(`user:${session.user.id}:friends`, idToAdd)

        await db.sadd(`user:${idToAdd}:friends`, session.user.id)

       // await db.srem(`user:${idToAdd}:outbound_friend_request`, session.user.id)

       await db.srem(`user:${session.user.id}:incoming_friend_requests`, idToAdd)
        
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