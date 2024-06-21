'use client'
import 'stream-chat-react/dist/css/index.css'
/* import '@stream-io/chat-react-sdk/dist/css/styles.css' */
import {
  Chat,
  Channel,
  LoadingIndicator,
  MessageInput,
  MessageList,
  Window,
} from 'stream-chat-react'
import { Channel as ChannelType, StreamChat } from 'stream-chat'
import { useSession } from 'next-auth/react'
import React, { useEffect, useState } from 'react'
import { Room } from '@/db/schema'
import { useTheme } from 'next-themes'
import { generateToken } from './actions'

export function ChatClient({ room }: { room: Room }) {
  // TS tweak No2
  const session = useSession()
  const { theme, setTheme } = useTheme()
  const [client, setClient] = useState<StreamChat | null>(null)
  const [channel, setChannel] = useState<ChannelType | null>(null)
  useEffect(() => {
    if (!session.data) return

    const initChat = async () => {
      const client = new StreamChat(process.env.NEXT_PUBLIC_GET_STREAM_API_KEY!)
      // you can still use new StreamChat("api_key");

      await client.connectUser(
        {
          id: session.data.user.id,
          name: session.data.user.name ?? undefined,
          image: session.data.user.image ?? undefined,
        },
        async () => {
          return await generateToken()
        }
      )
      const channel = client.channel('messaging', room.id)
      setClient(client)
      await channel.watch()
      setChannel(channel)
    }

    initChat()

    return () => {
      const cleanup = async () => {
        if (channel && client) {
          try {
            channel?._disconnect()
            client?.disconnectUser()
          } catch (err) {
            console.log(err)
          }
        }
      }
      cleanup()
    }
  }, [session, room])

  if (!client || !channel) {
    return <LoadingIndicator />
  }

  return (
    <Chat client={client} theme={`str-chat__theme-${theme ? theme : 'dark'}`}>
      <Channel channel={channel}>
        <Window>
          <MessageList />
          <MessageInput />
        </Window>
      </Channel>
    </Chat>
  )
}
