'use client'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { unstable_noStore } from 'next/cache'
import { DropdownMenuSeparator } from '@/components/ui/dropdown-menu'
import { AccountTabs } from './tabs'
import { useSession } from 'next-auth/react'

export default function MyAccount() {
  unstable_noStore()
  const session = useSession()
  const userSession = {
    id: session.data?.user.id,
    name: session.data?.user.name,
    email: session.data?.user.email,
    image: session.data?.user.image,
  }
  return (
    <main className="min-h-screen p-6 pt-10 pb-20 md:container md:px-16 md:pt-16 lg:px-20">
      <div className="flex justify-between items-center mb-4 px-4">
        <h1 className="text-lg sm:text-2xl">Account settings</h1>
        <Button asChild className="text-md sm:text-lg hover:underline" variant={'link'}>
          <Link href="/create-room">Create Room</Link>
        </Button>
      </div>
      <DropdownMenuSeparator />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <AccountTabs userSession={userSession} />
      </div>
    </main>
  )
}
