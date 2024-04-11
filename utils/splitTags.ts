export function splitTags(tags: string) {
  return tags.split(',').map((tag) => tag.trim())
}
