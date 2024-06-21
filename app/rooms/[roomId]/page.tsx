import { getRoom } from '@/data-access/rooms'
import { unstable_noStore } from 'next/cache'
import RoomWrapper from './roomWrapper'

export default async function Room({ params }: { params: { roomId: string } }) {
  unstable_noStore()
  const room = await getRoom(params.roomId)
  if (!room) {
    return (
      <div className="grid place-content-center min-h-screen">
        <p>Room not found with provided ID.</p>
      </div>
    )
  }
  return <RoomWrapper room={room} />
}
