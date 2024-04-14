'use server'

import { editRoom, getRoom } from '@/data-access/rooms'
import { Room } from '@/db/schema'
import { getSession } from '@/lib/auth'
import { revalidatePath } from 'next/cache'

export const editRoomAction = async (
  roomData: Omit<Room, 'userId' | 'id'>,
  roomId: string
) => {
  const session = await getSession()

  if (!session) {
    throw new Error('you must be logged in to edit a room')
  }

  const roomX = await getRoom(roomId)
  if (roomX?.userId !== session.user.id) {
    throw new Error('User not authorized')
  }
  const response = await editRoom({ ...roomData, id: roomId }, session.user.id)
  revalidatePath('/your-rooms')
  return response?.updatedId ? 'ok' : 'error'
}
