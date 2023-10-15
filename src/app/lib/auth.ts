import { db } from "@/app/lib/db";
import { UpstashRedisAdapter } from "@next-auth/upstash-redis-adapter";
import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: NextAuthOptions =
    {
        adapter: UpstashRedisAdapter(db),
        session: {
            strategy: 'jwt'
        },
        pages: {
            signIn: '/login'
        },
        
        providers: [
            GoogleProvider({
                clientId: process.env.GOOGLE_CLIENT_ID as string,
                clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
            })
        ],
        callbacks: {
            async jwt ({token, user}){
                const dbUser = (await db.get(`user:${token.id}`)) as User | null
    
                if (!dbUser) {
                    token.id = user!.id
                    return token
                }
    
                return {
                    id: dbUser.id,
                    name: dbUser.name,
                    email: dbUser.email,
                    picture: dbUser.image
                }
            },
            async session({session, token}) {
                if (token) {
                    session.user.id = token.id
                    session.user.name = token.name
                    session.user.email = token.email
                    session.user.image = token.picture
                }
    
                return session
            }
        }
    }
