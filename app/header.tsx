'use client'
import { ModeToggle } from '@/components/mode-toggle'
import { signIn, signOut, useSession } from 'next-auth/react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Airplay, LogIn, LogOut, UserRound } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

function Dropdown() {
  const session = useSession()
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        {/* shadcn Button styles */}
        <div
          className="flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium
          ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2
          focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50
          hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2"
        >
          <Avatar>
            <AvatarImage src={session.data?.user?.image ?? ''} />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          &nbsp;
          <span className="hidden md:inline">{session.data?.user?.name}</span>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem className="cursor-pointer" asChild>
          <Link href="/my-account">
            <UserRound />
            &nbsp; Account
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer" asChild>
          <Link href="/your-account">
            <Airplay />
            &nbsp; Your Rooms
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() =>
            signOut({
              callbackUrl: '/',
            })
          }
          className="cursor-pointer"
        >
          <LogOut />
          &nbsp; Sign Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default function Header() {
  const session = useSession()
  const isLoggedIn = !!session.data
  const pathname = usePathname()
  return (
    <header className="py-2 bg-gray-100 bg-transparent dark:bg-gray-900 w-full px-8 z-10 relative">
      <div className="flex justify-between items-center">
        <Link
          href="/"
          className="min-w-[60px] flex items-center text-xl font-medium cursor-pointer
          text-ring dark:text-foreground hover:text-blue-400
          dark:hover:text-blue-400"
        >
          <Image src="/icon.png" alt="Dev Finder" width={60} height={60} />
          <span className="pl-1 tracking-tight hidden md:block">DevFinder</span>
        </Link>
        <nav>
          <Button asChild variant={'ghost'} className={`mr-2 font-semibold ${pathname === '/browse' && 'bg-accent text-accent-foreground dark:bg-transparent dark:hover:bg-accent'}`}>
            <Link href="/browse">Browse</Link>
          </Button>
          {isLoggedIn && (
            <Button asChild variant={'ghost'} className={`${pathname === '/your-rooms' && 'font-semibold bg-accent text-accent-foreground dark:bg-transparent dark:hover:bg-accent'}`}>
              <Link href="/your-rooms">Your Rooms</Link>
            </Button>
          )}
        </nav>
        <div className="flex items-center gap-4">
          {isLoggedIn ? (
            <Dropdown />
          ) : (
            <Button onClick={() => signIn()} className="cursor-pointer">
              <LogIn />
              &nbsp; Sign In
            </Button>
          )}
          <ModeToggle />
        </div>
      </div>
    </header>
  )
}
