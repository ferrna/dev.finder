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
    <div className="flex flex-col gap-8 p-6 pt-10 pb-20 md:container md:px-16 md:pt-14 lg:px-20">
      <div className="flex gap-4 items-center">
        <Button asChild variant={'ghost'}>
          <Link href={`${referer}`}>
            <MoveLeft size={30} strokeWidth={1.25} />
          </Link>
        </Button>
        <h2 className="text-4xl font-bold">Create Room</h2>
      </div>
      <div className="">
        <CreateRoomForm />
      </div>
    </div>
  )
}
