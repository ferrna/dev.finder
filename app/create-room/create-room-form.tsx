'use client'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { createRoomAction } from './actions'
import { useToast } from '@/components/ui/use-toast'
import { useRouter } from 'next/navigation'

const formSchema = z.object({
  name: z.string().min(1).max(50),
  description: z.string().min(1).max(250),
  tags: z.string().min(1).max(50),
  githubRepo: z.string().max(50),
})

export function CreateRoomForm() {
  const router = useRouter()
  const { toast } = useToast()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      description: '',
      tags: '',
      githubRepo: '',
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    createRoomAction(values).then((res) => {
      if (res.msg === 'ok') {
        router.push(`/rooms/${res.roomId}`)
        toast({
          title: 'Room created',
          description: 'The room has been succesfully created',
        })
      } else {
        toast({
          variant: 'error',
          title: 'Error!',
          description: "There's been an error while creating the room",
        })
      }
    })
  }
  return (
    <div className="">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="My coding room" />
                </FormControl>
                <FormDescription>This is your public room name.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="An application to help pair program with random devs online"
                  />
                </FormControl>
                <FormDescription>{`Please describe what you'll coding on.`}</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="tags"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tags</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="typescript, nextjs, tailwind" />
                </FormControl>
                <FormDescription>
                  {`List the programming languages, frameworks, libraries you'll working
                  with so people can know what you're working on.`}
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="githubRepo"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Github Repo</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="https://github.com/username/project" />
                </FormControl>
                <FormDescription>
                  Please put a link to the project you are working on. (Optional)
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  )
}
