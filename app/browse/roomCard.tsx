'use client'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Room } from '@/db/schema'
import { GithubIcon } from 'lucide-react'
import { ListTags } from '@/components/listTags'
import { splitTags } from '@/lib/utils'
import styles from './roomCard.module.css'
import React from 'react'

export default function RoomCard({ room }: { room: Room }) {
  const ref = React.useRef<HTMLParagraphElement>(null)
  const [showMore, setShowMore] = React.useState(false)
  const [showLink, setShowLink] = React.useState(false)

  React.useLayoutEffect(() => {
    if (!ref.current) return
    if (ref.current.clientHeight < ref.current.scrollHeight) {
      setShowLink(true)
    }
  }, [ref])

  const onClickMore = () => {
    setShowMore(!showMore)
  }

  return (
    <Card>
      <CardHeader className="bg-image-stripes dark:bg-image-stripes-dark mb-4 border-b border-[#f5f7fb] border-[#091421]">
        <CardTitle>{room.name}</CardTitle>
        <CardDescription
          className={styles.description + (showMore ? styles.showall : '')}
          ref={ref}
        >
          {room.description}
        </CardDescription>
        {showLink && (
          <span className={styles.more} onClick={onClickMore}>
            {showMore ? 'Show less' : 'Show more'}
          </span>
        )}
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <ListTags tags={splitTags(room?.tags)} />
        {room.githubRepo && (
          <Link
            href={`/room/${room.id}`}
            target="_blank"
            className="flex items-center"
            rel="noopener noreferrer"
          >
            <GithubIcon className="w-6 h-6" />
            Github Project
          </Link>
        )}
      </CardContent>
      <CardFooter>
        <Button asChild>
          <Link href={`/rooms/${room.id}`}>Join Room</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
