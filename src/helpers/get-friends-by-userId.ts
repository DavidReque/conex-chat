import { fetchRedis } from "./redis";

export async function getFriendsByUserId(userId: string) {
    const friendsIds = await fetchRedis(
        'smembers',
        `user:${userId}:friends`
    ) as string[]

    const friends = await Promise.all(
        friendsIds.map(async (friendId) => {
            const friend = await fetchRedis(
                'get',
                `user${friendId}`
            ) as string
            const parsedFriend = JSON.parse(friend) as User
            return parsedFriend 
        })
    )

    return friends
}