import { Button } from '@/components/ui/button'
import Link from 'next/link'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Room } from '@/db/schema'
import { GithubIcon } from 'lucide-react'
import { getRooms } from '@/data-access/rooms'
import { ListTags } from '@/components/listTags'
import SearchBar from './search-bar'
import { unstable_noStore } from 'next/cache'
import { splitTags } from '@/lib/utils'

function RoomCard({ room }: { room: Room }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{room.name}</CardTitle>
        <CardDescription>{room.description}</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <ListTags tags={splitTags(room?.tags)} />
        {room.githubRepo && (
          <Link
            href={`/room/${room.id}`}
            target="_blank"
            className="flex items-center"
            rel="noopener noreferrer"
          >
            <GithubIcon className="w-6 h-6" />
            Github Project
          </Link>
        )}
      </CardContent>
      <CardFooter>
        <Button asChild>
          <Link href={`/rooms/${room.id}`}>Join Room</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}

export default async function Browse({
  searchParams,
}: {
  searchParams: { search: string }
}) {
  unstable_noStore()
  const rooms = await getRooms(searchParams?.search)
  return (
    <main className="min-h-screen p-16 pt-14">
      <div className="container flex justify-between items-center mb-8">
        <h1 className="text-4xl">Find Dev Rooms</h1>
        <Button asChild className="text-lg">
          <Link href="/create-room">Create Room</Link>
        </Button>
      </div>
      <div className="container my-4">
        <SearchBar />
      </div>
      <div className="container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {rooms.map((room) => {
          return <RoomCard key={room.id} room={room}></RoomCard>
        })}
      </div>
    </main>
  )
}
