'use server'

import { deleteUser } from '@/data-access/users'
import { getSession } from '@/lib/auth'

export async function deleteAccountAction(userId: string) {
  const session = await getSession()

  if (!session?.user) {
    throw new Error('you must be logged in to perform this action')
  }

  if (session.user.id !== userId) {
    throw new Error('User not authorized')
  }
  const response = await deleteUser(userId)

  return response?.deletedId
    ? { msg: 'ok', deletedId: response.deletedId }
    : { msg: 'error' }
}
