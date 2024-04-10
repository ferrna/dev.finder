import { Badge } from './ui/badge'

export function splitTags(tags: string) {
  return tags.split(',').map((tag) => tag.trim())
}

export function ListTags({ tags }: { tags: string[] }) {
  return (
    <div className="flex flex-wrap gap-1">
      {tags.map((tag) => (
        <Badge key={tag}>{tag}</Badge>
      ))}
    </div>
  )
}
