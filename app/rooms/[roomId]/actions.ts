'use server'

import { StreamChat } from 'stream-chat'
import { getSession } from '@/lib/auth'

export async function generateToken() {
  const session = await getSession()
  const api_key = process.env.NEXT_PUBLIC_GET_STREAM_API_KEY!
  const api_secret = process.env.GET_STREAM_API_SECRET!
  const user_id = session?.user.id!

  if (!session) throw new Error('No session user')
  // Initialize a Server Client
  const serverClient = StreamChat.getInstance(api_key, api_secret)
  // Create User Token
  return serverClient.createToken(user_id)
}
