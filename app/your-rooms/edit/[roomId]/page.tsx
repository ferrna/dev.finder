import { unstable_noStore } from 'next/cache'
import { EditRoomForm } from './edit-room-form'
import { getRoom } from '@/data-access/rooms'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { X } from 'lucide-react'

export default async function EditRoom({ params }: { params: { roomId: string } }) {
  unstable_noStore()
  const room = await getRoom(params.roomId)
  return (
    <div className="container p-24 mx-auto flex flex-col gap-8 pt-12">
      <div className="flex justify-between items-center">
        <h2 className="text-4xl font-bold">Edit room: {room?.name}</h2>
        <Button asChild variant={'ghost'} size={'icon'}>
          <Link href="/your-rooms">
            <X size={30} strokeWidth={1.25} />
          </Link>
        </Button>
      </div>
      <div className="">{room && <EditRoomForm room={room} />}</div>
    </div>
  )
}
