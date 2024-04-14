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
    <div
      className="flex flex-col gap-8 p-6 pt-10 pb-20 md:container md:px-16 md:pt-14
     lg:px-20 md:flex-row md:items-start  md:flex-wrap  md:gap-0"
    >
      <div
        className="flex gap-4 items-center md:grow md:w-[38%] justify-between
      md:h-[70vh] md:flex-col"
      >
        <div className="md:flex">
          <Button asChild variant={'ghost'} title="Cancel" size={'icon'}>
            <Link href="/your-rooms" className="relative">
              <X size={34} strokeWidth={1.25} />
              <small
                className="hidden md:inline absolute md:right-[-50%]
               top-[90%] text-[10px] leading-tight text-gray-700 dark:text-gray-200"
              >
                Cancel
              </small>
            </Link>
          </Button>
        </div>
        <h2 className="text-4xl font-bold text-center">
          Edit room:
          <br /> <span className="text-4xl font-semibold">{room?.name}</span>
        </h2>
        <div className="invisible pointer-events-none flex">
          <Button asChild variant={'ghost'} title="Cancel" size={'icon'}>
            <Link href="/your-rooms">
              <X size={34} strokeWidth={1.25} />
            </Link>
          </Button>
        </div>
      </div>
      <div className="md:grow md:w-[62%]">{room && <EditRoomForm room={room} />}</div>
    </div>
  )
}
