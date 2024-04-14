import { users } from '@/db/schema'
import { eq } from 'drizzle-orm'
import { db } from '@/db'

export async function deleteUser(userId: string) {
  const deletedUser = await db
    .delete(users)
    .where(eq(users.id, userId))
    .returning({ deletedId: users.id })
  return deletedUser[0]
}
