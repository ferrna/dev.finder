'use server'

import { createRoom } from '@/data-access/rooms'
import { Room } from '@/db/schema'
import { getSession } from '@/lib/auth'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export const createRoomAction = async (roomData: Omit<Room, 'userId' | 'id'>) => {
  const session = await getSession()

  if (!session?.user) {
    throw new Error('you must be logged in to create a room')
  }

  const response = await createRoom(roomData, session.user.id)

  if (response?.insertedId) {
    revalidatePath('/browse')
    redirect(`/rooms/${response?.insertedId}`)
  } else {
    redirect('/browse')
  }
}
