'use client'
import { Room } from '@/db/schema'
import { VideoPlayer } from './videoPlayer'
import { ChatClient } from './chat'
import { ListTags } from '@/components/listTags'
import { splitTags } from '@/lib/utils'
import { DropdownMenuSeparator } from '@/components/ui/dropdown-menu'
import { ArrowRightIcon, GithubIcon } from 'lucide-react'
import { useState } from 'react'
import clsx from 'clsx'
import { Button } from '@/components/ui/button'

function Players({ room }: { room: Room }) {
  return (
    <div className="col-span-3 p-4 pr-2">
      <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-4">
        <div className="grid place-content-center w-full min-h-96">
          <VideoPlayer room={room} />
          <ChatClient room={room} />
        </div>
      </div>
    </div>
  )
}

export default function RoomWrapper({ room }: { room: Room }) {
  const [showInfoPanel, setShowInfoPanel] = useState<boolean>(true)
  return (
    <div
      className="grid min-h-screen transition-all place-items-start justify-items-stretch"
      style={{
        gridTemplateColumns: showInfoPanel
          ? 'repeat(4, minmax(0, 1fr))'
          : 'repeat(3, minmax(0, 1fr)) 60px',
      }}
    >
      <Players room={room} />
      <div className="col-span-1 p-4 pl-2 relative self-start min-h-[217px]">
        <div
          className={clsx(
            'rounded-lg border bg-card text-card-foreground shadow-sm p-4 transition-all',
            !showInfoPanel && 'hidden'
          )}
        >
          <h3 className="scroll-m-20 text-xl font-semibold tracking-tight">
            {room?.name}
          </h3>
          <p className="leading-7 my-3 text-gray-800 dark:text-gray-300">
            {room?.description}
          </p>
          <div className="pb-3">
            <ListTags tags={splitTags(room?.tags)} />
          </div>
          <DropdownMenuSeparator />
          {room.githubRepo ? (
            <a
              href={`${room.githubRepo}`}
              target="_blank"
              className="flex items-center gap-2 pt-2 justify-center hover:underline"
              rel="noopener noreferrer"
            >
              <GithubIcon className="w-6 h-6" />
              Github Project
            </a>
          ) : (
            <span>no repository</span>
          )}
        </div>
        <div className="absolute inset-y-0 left-0 flex items-center h-full">
          <Button
            title="Hide/Show Info"
            className="px-0 py-2"
            onClick={() => setShowInfoPanel(!showInfoPanel)}
          >
            <ArrowRightIcon className={clsx('w-4 h-6', !showInfoPanel && 'rotate-180')} />
          </Button>
        </div>
      </div>
    </div>
  )
}
