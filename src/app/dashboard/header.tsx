// components/ui/Header.tsx
import { Button } from "@/components/ui/button";
import { Sheet, SheetTrigger } from "@/components/ui/sheet";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Menu, CircleUser, Users } from "lucide-react";
import AdminSearch from "@/components/features/admin-search";
import { ModeToggle } from "@/components/ui/mode-toggle";
import Image from "next/image";
import { FC } from "react";
import Link from "next/link";

interface HeaderProps {
  session: any; // Replace 'any' with a specific session type if available
}

const Header: FC<HeaderProps> = ({ session }) => {

  //console.log("Github session", session)
  return (
    <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="shrink-0 md:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
      </Sheet>
      <div className="w-full flex-1">
        <AdminSearch />
      </div>
      <ModeToggle />
      <UserMenu session={session} />
    </header>
  );
};

const UserMenu: FC<HeaderProps> = ({ session }) => (
  <DropdownMenu>
    <DropdownMenuTrigger asChild>
      {session?
      // .user ? 
      (
        <Button variant="secondary" size="icon" className="rounded-full">
          {session.user.name && session.user.image && session.user.image.startsWith("https://avatars.githubusercontent.") ? 
          (<img src={session.user.image} alt={session.user.name} width={32} height={32} />) : 
            (<Image src={session.user.image} alt={session.user.name} width={32} height={32} className="rounded-full" />
            ) 
          } 
        </Button>
      ) : (
        <Button variant="secondary" size="icon" className="rounded-full">
          <CircleUser className="h-5 w-5" />
          <span className="sr-only">Toggle user menu</span>
        </Button>
      )}
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end">
      <DropdownMenuLabel >My Account</DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuItem><Link href="/settings">Settings</Link></DropdownMenuItem>
      <DropdownMenuItem><Link href="/help">Help</Link></DropdownMenuItem>
      <DropdownMenuSeparator />
      <DropdownMenuItem>{session?.user ? <Link href="api/auth/signout"><Button variant="link">Sign Out</Button></Link> : <Link href="api/auth/signin"><Button variant="link">Sign In</Button></Link>}</DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
);

export default Header;