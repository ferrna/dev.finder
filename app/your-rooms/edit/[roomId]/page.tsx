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
    <div className="flex flex-col gap-8 p-6 pt-10 pb-20 md:container md:px-16 md:pt-14 lg:px-20">
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
