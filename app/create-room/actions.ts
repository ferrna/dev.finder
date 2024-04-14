'use server'

import { createRoom } from '@/data-access/rooms'
import { Room } from '@/db/schema'
import { getSession } from '@/lib/auth'
import { revalidatePath } from 'next/cache'

export const createRoomAction = async (roomData: Omit<Room, 'userId' | 'id'>) => {
  const session = await getSession()

  if (!session?.user) {
    throw new Error('you must be logged in to create a room')
  }

  const response = await createRoom(roomData, session.user.id)

  revalidatePath('/browse')
  revalidatePath('/your-rooms')
  return response?.insertedId
    ? { msg: 'ok', roomId: response.insertedId }
    : { msg: 'error' }
}
