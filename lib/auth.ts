import { db } from '@/db'
import { DrizzleAdapter } from '@auth/drizzle-adapter'
import { AuthOptions, DefaultSession, getServerSession } from 'next-auth'
import { Adapter } from 'next-auth/adapters'
import GoogleProvider from 'next-auth/providers/google'

// overload the default type of next-auth, so it doesn't complains
// about session.user.id prop
declare module 'next-auth' {
  interface Session extends DefaultSession {
    user: {
      id: string
    } & DefaultSession['user']
  }
}

export const authConfig = {
  adapter: DrizzleAdapter(db) as Adapter,
  session: {
    strategy: 'jwt',
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  // callbacks allow you to define custom logic for when an user
  // tries to signin or register, so you can kind of get the user based
  // on the email in jwt() f.e.
  // jwt(): when you try to login for the first time, jwt() callback
  // its gonna take your token and its gonna try to find an user who matches
  // your token's email. Then its gonna return an object that has the same
  // information as before, but its gonna have your user's Id
  callbacks: {
    async jwt({ token, user }) {
      const dbUser = await db.query.users.findFirst({
        where: (users, { eq }) => eq(users.email, token.email!),
      })
      if (!dbUser) {
        throw new Error('no user with email found')
      }
      return {
        id: dbUser.id,
        name: dbUser.name,
        email: dbUser.email,
        picture: dbUser.image,
      }
    },
    async session({ token, session }) {
      if (token) {
        session.user = {
          //complains in default
          id: token.id as string,
          name: token.name,
          email: token.email,
          image: token.picture,
        }
      }
      return session
    },
  },
  // authConfig :=> satisfies AuthOptions so that its knows what 'token'
  // and 'user' is
} satisfies AuthOptions

export async function getSession() {
  const session = await getServerSession(authConfig)
  return session
}
