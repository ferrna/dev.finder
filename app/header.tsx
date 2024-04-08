'use client'
import { ModeToggle } from '@/components/mode-toggle'
import { signIn, signOut, useSession } from 'next-auth/react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { LogIn, LogOut } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import Image from 'next/image'
import Link from 'next/link'

function Dropdown() {
  const session = useSession()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button variant={'ghost'} style={{ display: 'flex', alignItems: 'center' }}>
          <Avatar>
            <AvatarImage src={session.data?.user?.image ?? ''} />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          &nbsp;
          {session.data?.user?.name}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {session.data ? (
          <DropdownMenuItem onClick={() => signOut()} className="cursor-pointer">
            <LogOut />
            &nbsp; Sign Out
          </DropdownMenuItem>
        ) : (
          <DropdownMenuItem onClick={() => signIn('google')} className="cursor-pointer">
            <LogIn />
            &nbsp; Sign In
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
export default function Header() {
  const session = useSession()
  return (
    <header className="py-2 bg-gray-100 dark:bg-gray-900 container mx-auto">
      <div className="flex justify-between items-center">
        <Link
          href="/"
          className="flex items-center text-xl font-medium cursor-pointer
          text-ring dark:text-foreground hover:text-blue-400
          dark:hover:text-blue-400"
        >
          <Image src="/icon.png" alt="Dev Finder" width={60} height={60} />
          <span className="pl-1 tracking-tight">DevFinder</span>
        </Link>
        <div className="flex items-center gap-4">
          <Dropdown />
          <ModeToggle />
        </div>
      </div>
    </header>
  )
}
