'use client'
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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Room } from '@/db/schema'
import { DeleteIcon, GithubIcon, PencilIcon } from 'lucide-react'
import { ListTags } from '@/components/listTags'
import { splitTags } from '@/lib/utils'
import { unstable_noStore } from 'next/cache'
import { deleteUserRoom } from './actions'
import { useToast } from '@/components/ui/use-toast'

export default function RoomCard({ room }: { room: Room }) {
  return (
    <Card>
      <CardHeader className="relative">
        <Button className="absolute right-2 top-2" size="icon" asChild>
          <Link href={`/your-rooms/edit/${room.id}`}>
            <PencilIcon />
          </Link>
        </Button>
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
      <CardFooter className="flex gap-2">
        <Button asChild>
          <Link href={`/rooms/${room.id}`}>Join Room</Link>
        </Button>

        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant={'destructive'}>
              <DeleteIcon /> Delete Room
            </Button>
          </AlertDialogTrigger>
          <AlertDialogPopup roomId={room.id} />
        </AlertDialog>
      </CardFooter>
    </Card>
  )
}

export function AlertDialogPopup({ roomId }: { roomId: string }) {
  unstable_noStore()
  const { toast } = useToast()
  return (
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Are you sure you want to delete the room?</AlertDialogTitle>
        <AlertDialogDescription>
          This action cannot be undone. This will permanently delete your room and all
          data related to it.
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel>Cancel</AlertDialogCancel>
        <AlertDialogAction
          onClick={() =>
            deleteUserRoom(roomId).then((res) => {
              res === 'ok' &&
                toast({
                  variant: 'destructive',
                  title: 'Room deleted succesfully',
                  description: 'The room has been deleted with success',
                })
            })
          }
        >
          Delete
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  )
}
