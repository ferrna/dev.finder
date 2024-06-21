import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { getRooms } from '@/data-access/rooms'
import SearchBar from './search-bar'
import { unstable_noStore } from 'next/cache'
import Image from 'next/image'
import RoomCard from './roomCard'

export default async function Browse({
  searchParams,
}: {
  searchParams: { search: string }
}) {
  unstable_noStore()
  const rooms = await getRooms(searchParams?.search)
  return (
    <main className="min-h-screen p-6 pt-10 md:container md:px-16 md:pt-14 md:pb-20 lg:px-20">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-4xl">Find Dev Rooms</h1>
        <Button asChild className="text-lg">
          <Link href="/create-room">Create Room</Link>
        </Button>
      </div>
      <div className="my-8">
        <SearchBar />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {rooms.length > 0 &&
          rooms.map((room) => {
            return <RoomCard key={room.id} room={room}></RoomCard>
          })}
        {rooms.length === 0 && (
          <div className="col-start-1 col-span-3 flex flex-col gap-6 items-center p-4 xl:p-8">
            <Image src="/no_data.svg" width={300} height={300} alt={'No rooms icon'} />
            <div className="italic underline">No rooms finded</div>
          </div>
        )}
      </div>
    </main>
  )
}
