'use server'

import { db } from '@/db'
import { Room, room } from '@/db/schema'
import { getSession } from '@/lib/auth'

export const createRoomAction = async (roomData: Omit<Room, 'userId'>) => {
  const session = await getSession()

  if (!session) {
    throw new Error('you must be logged in to create a room')
  }

  await db.insert(room).values({ ...roomData, userId: session.user?.id })
}
