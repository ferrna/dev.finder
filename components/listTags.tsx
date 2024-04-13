'use client'
import { useRouter } from 'next/navigation'
import { badgeVariants } from './ui/badge'
import { cn } from '@/lib/utils'

export function ListTags({ tags }: { tags: string[] }) {
  const router = useRouter()
  return (
    <div className="flex flex-wrap gap-1">
      {tags.map((tag) => (
        <button
          className={cn(badgeVariants({ variant: 'default' }))}
          key={tag}
          onClick={() => {
            router.push(`/browse?search=${tag}`)
          }}
        >
          {tag}
        </button>
      ))}
    </div>
  )
}

/* 
<Badge
  tabIndex={0}
  role="button"
>

</Badge>
*/
