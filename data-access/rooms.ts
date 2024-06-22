'use server'
import { db } from '@/db'
import { Room, room } from '@/db/schema'
import { getSession } from '@/lib/auth'
import { desc, eq, like, or, sql } from 'drizzle-orm'

export async function getRooms(search: string | undefined): Promise<Room[] | null> {
  const rooms = search
    ? await db
        .select()
        .from(room)
        .where(or(
          like(room.tags, `%${search}%`), 
          like(room.name, `%${search}%`)
        )).orderBy(desc(room.id)).limit(12)
    : await db.select()
    .from(room).orderBy(desc(room.id)).limit(12)
  return rooms
}

export async function getRoomsCount() {
  const roomsCount = await db
    .select({
      count: sql<number>`cast(count(${room.id}) as int)`,
    })
    .from(room)
  return roomsCount && roomsCount[0].count
}

export async function getUserRooms() {
  const session = await getSession()
  const rooms = await db.query.room.findMany({
    where: eq(room.userId, session?.user.id ?? ''),
  })
  return rooms
}

export async function getRoom(roomId: string): Promise<Room | undefined> {
  if (!isValidUUID(roomId)) return
  return await db.query.room.findFirst({ where: eq(room.id, roomId) })
}
function isValidUUID(uuid: string) {
  const uuidRegex =
    /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/
  return uuidRegex.test(uuid)
}

export async function deleteRoom(roomId: string) {
  const deletedRoom = await db
    .delete(room)
    .where(eq(room.id, roomId))
    .returning({ deletedId: room.id })
  return deletedRoom[0]
}

export async function editRoom(roomData: Omit<Room, 'userId'>, userId: string) {
  const editedRoom = await db
    .update(room)
    .set({ ...roomData, userId })
    .where(eq(room.id, roomData.id))
    .returning({ updatedId: room.id })
  return editedRoom[0]
}
export async function createRoom(roomData: Omit<Room, 'userId' | 'id'>, userId: string) {
  const createdRoom = await db
    .insert(room)
    .values({ ...roomData, userId })
    .returning({ insertedId: room.id })
  return createdRoom[0]
}
