'use client'
import '@stream-io/video-react-sdk/dist/css/styles.css'
import {
  Call,
  CallControls,
  CallParticipantsList,
  LoadingIndicator,
  SpeakerLayout,
  StreamCall,
  StreamTheme,
  StreamVideo,
  StreamVideoClient,
} from '@stream-io/video-react-sdk'
import { Room } from '@/db/schema'
import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import { generateToken } from './actions'
import { useRouter } from 'next/navigation'

const apiKey = process.env.NEXT_PUBLIC_GET_STREAM_API_KEY!

export function VideoPlayer({ room }: { room: Room }) {
  const session = useSession()

  const [client, setClient] = useState<StreamVideoClient | null>(null)
  const [showParticipants, setShowParticipants] = useState<boolean>(true)
  const [call, setCall] = useState<Call | null>(null)
  const router = useRouter()
  useEffect(() => {
    if (!room || !session.data) return;

    const initVideo = async () => {
      const userId = session.data?.user.id
      const client = new StreamVideoClient({
        apiKey,
        user: {
          id: userId,
          name: session.data.user.name ?? undefined,
          image: session.data.user.image ?? undefined,
        },
        tokenProvider: () => generateToken(),
      });
      setClient(client)
      const call = client.call('default', room.id)
      await call.join({ create: true })
      setCall(call)
    }

    initVideo()
    
    return () => {
      const cleanup = async () => {
        if (call && client) {
          try {
            await call.leave();
            await client.disconnectUser();
          } catch (err) {
            console.log(err);
          }
        }
      };
      cleanup();
    }
  }, [session, room])

  if (!client || !call) {
    return <LoadingIndicator />
  }
  
  return (
    <StreamVideo client={client}>
      <StreamTheme>
        <StreamCall call={call}>
          <SpeakerLayout />
          <CallControls onLeave={() => router.push('/browse')} />
          {showParticipants && (
            <CallParticipantsList onClose={() => setShowParticipants(false)} />
          )}
        </StreamCall>
      </StreamTheme>
    </StreamVideo>
  )
}
