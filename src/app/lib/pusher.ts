import PusherServer from 'pusher'
import Pusher from 'pusher-js';

export const pusherServer = new PusherServer({
    appId: process.env.PUSHER_APP_ID!,
    key: process.env.NEXT_PUBLIC_PUSHER_APP_KEY!,
    secret: process.env.PUSHER_APP_SECRET!,
<<<<<<< HEAD
    cluster: 'eu',
=======
    cluster: 'us2',
>>>>>>> parent of 719c433 (pusherclient)
    useTLS: true
})


<<<<<<< HEAD
export const pusherClient = new PusherClient(process.env.NEXT_PUBLIC_PUSHER_APP_KEY!, {
    cluster: 'eu',
=======
export const pusherClient = new Pusher(process.env.NEXT_PUBLIC_PUSHER_APP_KEY!, {
    cluster: 'us2',
>>>>>>> parent of 719c433 (pusherclient)
});
