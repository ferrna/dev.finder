import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { getUserRooms } from '@/data-access/rooms'
import RoomCard from './room-card'
import { unstable_noStore } from 'next/cache'
import Image from 'next/image'

export default async function YourRooms() {
  unstable_noStore()
  const rooms = await getUserRooms()
  return (
    <main className="min-h-screen p-6 pt-10 pb-20 md:container md:px-16 md:pt-14 lg:px-20">
      <div className="w-full flex justify-between items-center mb-8">
        <h1 className="text-4xl">Your Rooms</h1>
        <Button asChild className="text-lg">
          <Link href="/create-room">Create Room</Link>
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {rooms.length > 0 &&
          rooms.map((room) => {
            return <RoomCard key={room.id} room={room}></RoomCard>
          })}
        {rooms.length === 0 && (
          <div className="col-start-1 col-span-3 flex flex-col gap-6 items-center p-4 xl:p-8">
            <Image src="/no_data.svg" width={300} height={300} alt={'No rooms icon'} />
            <div className="italic underline">You dont have any rooms created yet</div>
          </div>
        )}
      </div>
    </main>
  )
}
