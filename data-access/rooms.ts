import { db } from '@/db'
import { room } from '@/db/schema'
import { eq } from 'drizzle-orm'
import { unstable_noStore } from 'next/cache'

export async function getRooms() {
  unstable_noStore()
  const rooms = await db.query.room.findMany()
  return rooms
}
export async function getRoom(roomId: string) {
  unstable_noStore()
  if (!isValidUUID(roomId)) return
  return await db.query.room.findFirst({ where: eq(room.id, roomId) })
}
function isValidUUID(uuid: string) {
  const uuidRegex =
    /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/
  return uuidRegex.test(uuid)
}
