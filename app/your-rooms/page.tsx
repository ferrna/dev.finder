import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { getUserRooms } from '@/data-access/rooms'
import RoomCard from './room-card'
import { unstable_noStore } from 'next/cache'

export default async function YourRooms() {
  unstable_noStore()
  const rooms = await getUserRooms()
  return (
    <main className="min-h-screen p-16 pt-14">
      <div className="container flex justify-between items-center mb-8">
        <h1 className="text-4xl">Your Rooms</h1>
        <Button asChild className="text-lg">
          <Link href="/create-room">Create Room</Link>
        </Button>
      </div>
      <div className="container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {rooms.length > 0 &&
          rooms.map((room) => {
            return <RoomCard key={room.id} room={room}></RoomCard>
          })}
        {rooms.length === 0 && <div className="col-start-2">No rooms finded.</div>}
      </div>
    </main>
  )
}
