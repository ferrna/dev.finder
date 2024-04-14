import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { LogOut, Trash2Icon } from 'lucide-react'
import { signOut } from 'next-auth/react'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { unstable_noStore } from 'next/cache'
import { deleteAccountAction } from './actions'

export function AccountTabs({ userSession }: any) {
  if (!userSession) return null
  return (
    <Tabs defaultValue="account" className="w-[400px]">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="password">Password</TabsTrigger>
      </TabsList>
      <TabsContent value="account">
        <Card>
          <CardHeader>
            <Avatar className="self-center w-16 h-16">
              <AvatarImage src={userSession.image ?? ''} />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="name">Name</Label>
              <Input id="name" defaultValue={`${userSession.name}`} readOnly />
            </div>
            <div className="space-y-1">
              <Label htmlFor="email">Email</Label>
              <Input id="email" defaultValue={`${userSession.email}`} readOnly />
            </div>
          </CardContent>
          <CardFooter className="justify-center gap-2">
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant={'destructive'} className="px-3">
                  <Trash2Icon size={20} strokeWidth={1} className="-ml-1" />
                  &nbsp; Delete account
                </Button>
              </AlertDialogTrigger>
              <AlertDialogPopup userSessionId={userSession.id} />
            </AlertDialog>
            <Button
              className="px-3"
              onClick={() =>
                signOut({
                  callbackUrl: '/',
                })
              }
            >
              <LogOut />
              &nbsp; Sign Out
            </Button>
          </CardFooter>
        </Card>
      </TabsContent>
      <TabsContent value="password">
        <Card>
          <CardHeader>
            <CardTitle>Password</CardTitle>
            <CardDescription>
              Change your password here. After saving, you'll be logged out.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="current">Current password</Label>
              <Input id="current" type="password" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="new">New password</Label>
              <Input id="new" type="password" />
            </div>
          </CardContent>
          <CardFooter>
            <Button>Save password</Button>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  )
}

export function AlertDialogPopup({ userSessionId }: { userSessionId: string }) {
  unstable_noStore()
  return (
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Are you sure you want to delete your account?</AlertDialogTitle>
        <AlertDialogDescription>
          This action cannot be undone. This will permanently delete your account and all
          data related to it.
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel>Cancel</AlertDialogCancel>
        <AlertDialogAction
          onClick={() =>
            deleteAccountAction(userSessionId).then((res) => {
              if (res.msg === 'ok') {
                signOut({ callbackUrl: '/' })
              } else {
                console.log(res)
              }
            })
          }
        >
          Delete MY ACCOUNT
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  )
}
