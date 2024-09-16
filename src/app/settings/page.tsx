import * as React from "react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select"
import { auth } from "@/auth"
import Image from "next/image";
import { CircleUser } from "lucide-react"
import Link from "next/link"

type Props = {}

export default async function Settings({}: Props) {
  
  const session = await auth()

  return (
    <div className="flex justify-center p-[30px] ">
      <Card className="w-1/2">
        <CardHeader>
          <CardTitle>User Profile</CardTitle>
          <CardDescription>Your profile information </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="grid grid-cols-1 md:grid-cols-2 overflow-y-auto">
            <div className="flex justify-center items-center">
            {session ? (
            <Button variant="secondary" size="profile" className="rounded-full">
              {session.user.name && session.user.image && session.user.image.startsWith("https://avatars.githubusercontent.") ? (
                <img src={session.user.image} alt={session.user.name} className="w-32 h-32 rounded-full object-cover" />
              ) : (
                <Image src={session.user.image} alt={session.user.name} width={128} height={128} className="rounded-full h-32 w-32" />
              )}
            </Button>
              ) : (
                <Button variant="secondary" size="icon" className="rounded-full h-32 w-32">
                  <CircleUser className="h-32 w-32" />
                </Button>
              )}
            </div>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Name</Label>
                <Input 
                id="name" 
                placeholder="name"
                value={session?.user?.name || "Your Name..."}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="email">Email</Label>
                <Input 
                id="email" 
                placeholder="Your Email..."
                value={session?.user?.email || "Your Email..."}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                {session? <h2>You are a registerd user</h2> : <h2>You are not a registerd user.</h2>}
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
          {session && <Link className="no-underline hover:underline text-primary-foreground" href="/">Back to Dashboard</Link>}
          {!session && <Link href="/"><Button variant="outline">Cancle</Button></Link>}
          {!session && <Link href="/api/auth/signin"><Button>Sign In / Register</Button></Link>}
          
        </CardFooter>
      </Card>
    </div>
  )
}

