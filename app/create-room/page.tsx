import { MoveLeft } from 'lucide-react'
import { CreateRoomForm } from './create-room-form'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { headers } from 'next/headers'
import { unstable_noStore } from 'next/cache'
import { getPreviousPath } from '@/lib/utils'

export default function CreateRoom() {
  unstable_noStore()
  const headersList = headers()
  let referer: string = '/browse'
  let previousPage: string | null = getPreviousPath(headersList.get('referer'))
  if (previousPage === '/your-rooms') {
    referer = previousPage
  }

  return (
    <div
      className="flex flex-col gap-8 p-6 pt-10 pb-20 md:container md:px-16 md:pt-14
       lg:px-20 md:flex-row md:items-start md:flex-wrap md:gap-0"
    >
      <div
        className="flex gap-4 items-center md:grow md:w-[38%] justify-between
      md:h-[70vh] md:flex-col"
      >
        <div className="md:flex">
          <Button asChild variant={'ghost'} title="Go back">
            <Link href={`${referer}`} className="relative">
              <MoveLeft size={30} strokeWidth={1.25} />
              <span
                className="hidden md:inline absolute md:right-[-35px] lg:right-[-40px]
               top-[25%] hover:underline"
              >
                Back
              </span>
            </Link>
          </Button>
        </div>
        <h2 className="text-4xl font-bold">Create Room</h2>
        <div className="invisible pointer-events-none flex">
          <Button asChild variant={'ghost'}>
            <Link href={`${referer}`}>
              <MoveLeft size={30} strokeWidth={1.25} />
            </Link>
          </Button>
        </div>
      </div>
      <div className="md:grow md:w-[62%]">
        <CreateRoomForm />
      </div>
    </div>
  )
}
