'use server'

import { deleteRoom, getRoom } from '@/data-access/rooms'
import { getSession } from '@/lib/auth'
import { revalidatePath } from 'next/cache'

export async function deleteUserRoom(roomId: string) {
  const session = await getSession()
  if (!session?.user) throw new Error('Unauthorized')
  const room = await getRoom(roomId)
  if (room?.userId !== session.user.id) throw new Error('User not authorized')

  const response = await deleteRoom(roomId)
  revalidatePath('/your-rooms')
  return response?.deletedId ? 'ok' : 'error'
}
