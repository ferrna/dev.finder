import { type ClassValue, clsx } from 'clsx'
import { unstable_noStore } from 'next/cache'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function splitTags(tags: string) {
  return tags.split(',').map((tag) => tag.trim())
}

export function getPreviousPath(url: string | null): string | null {
  unstable_noStore()
  if (!url) return null
  const chops: string[] = url.split('/')
  const lastQuery: string = chops[chops.length - 1]
  return `/${lastQuery}`
}
