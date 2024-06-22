'use client'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useRouter, useSearchParams } from 'next/navigation'
import { SearchIcon } from 'lucide-react'
import { useEffect, useState } from 'react'
import { getRoomsCount } from '@/data-access/rooms'

async function getLocalRoomsCount() {
  'use client'
  const roomsCount = localStorage.getItem('roomsCount')
  const lastFetch: Date | null = new Date(
    parseInt(localStorage['roomsCountDataDate'], 10)
  )
  let rooms: number | undefined
  if (!roomsCount || (lastFetch && lastFetch.getDate() < new Date().getDate() - 5)) {
    rooms = await getRoomsCount()
    console.dir(rooms)
    localStorage.setItem('roomsCount', '' + rooms)
    localStorage.setItem('roomsCountDataDate', '' + new Date().getTime())
  }
  return rooms ?? Number(roomsCount)
}

const formSchema = z.object({
  search: z.string().min(0).max(50),
})

export default function SearchBar() {
  const router = useRouter()
  const query = useSearchParams()

  const search = query.get('search')
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      search: query.get('search') ?? '',
    },
  })

  const [roomsCount, setRoomsCount] = useState<number | null>(null)

  useEffect(() => {
    form.setValue('search', search ?? '')
  }, [search, form])

  useEffect(() => {
    async function getNumberOfRooms() {
      const count = await getLocalRoomsCount()
      setRoomsCount(count)
      return
    }
    getNumberOfRooms()
  }, [])

  function onSubmit(values: z.infer<typeof formSchema>) {
    if (values.search) {
      router.push(`/browse?search=${values.search}`)
    } else {
      router.push('/browse')
    }
  }
  return (
    <div className="">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex gap-2 w-full">
          <FormField
            control={form.control}
            name="search"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    {...field}
                    className="w-[280px] md:w-[440px]"
                    placeholder="Filter rooms by language, libraries, such as typescript, nextjs, python"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit">
            <SearchIcon className="mr-2" />
            Search
          </Button>
          {query.get('search') && (
            <Button
              onClick={() => {
                form.setValue('search', '')
              }}
              variant={'outline'}
            >
              Clear
            </Button>
          )}
          <div className="ml-auto flex items-center">
            <span className="text-slate-700 dark:text-slate-700 text-sm">
              {roomsCount && roomsCount + ' total rooms.'}
            </span>
          </div>
        </form>
      </Form>
    </div>
  )
}
