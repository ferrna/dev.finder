import { ListTags } from '@/components/listTags'
import { DropdownMenuSeparator } from '@/components/ui/dropdown-menu'
import { getRoom } from '@/data-access/rooms'
import { GithubIcon } from 'lucide-react'
import Link from 'next/link'
import { VideoPlayer } from './videoPlayer'
import { splitTags } from '@/lib/utils'
import { unstable_noStore } from 'next/cache'

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
  return (
    <div className="grid grid-cols-4 min-h-screen">
      <div className="col-span-3 p-4 pr-2">
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-4">
          VIDEO
          <VideoPlayer room={room} />
        </div>
      </div>
      <div className="col-span-1 p-4 pl-2">
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-4">
          <h3 className="scroll-m-20 text-xl font-semibold tracking-tight">
            {room?.name}
          </h3>
          <p className="leading-7 my-3 text-gray-800 dark:text-gray-300">
            {room?.description}
          </p>
          <div className="pb-3">
            <ListTags tags={splitTags(room?.tags)} />
          </div>
          <DropdownMenuSeparator />
          {room.githubRepo && (
            <Link
              href={`/room/${room.id}`}
              target="_blank"
              className="flex items-center gap-2 pt-2 justify-center hover:underline"
              rel="noopener noreferrer"
            >
              <GithubIcon className="w-6 h-6" />
              Github Project
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}
