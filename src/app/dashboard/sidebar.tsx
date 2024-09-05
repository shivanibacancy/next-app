// components/ui/Sidebar.tsx
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Home, ShoppingCart, Package, Users, LineChart, Package2, Bell } from "lucide-react";
import { FC, useState } from "react";

interface SidebarProps {
  session: any;
  selectedOption: (item: string) => void ;
}
  
const Sidebar: FC<SidebarProps> = ({ session, selectedOption }) => {

  const [activeItem, setActiveItem] = useState<string>("Dashboard"); // State to track the active nav item

  const handleNavClick = (item: string) => {
    setActiveItem(item);
    selectedOption(item); // Ensure selectedOption is called when an item is clicked
  };

  return (
    <div className="hidden border-r bg-muted/40 md:block">
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <Package2 className="h-6 w-6" />
            <span>Shivani Inc</span>
          </Link>
          <Button variant="outline" size="icon" className="ml-auto h-8 w-8">
            <Bell className="h-4 w-4" />
            <span className="sr-only">Toggle notifications</span>
          </Button>
        </div>
        <div className="flex-1">
          <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
            <NavItem 
            href="#" 
            icon={<Home className="h-4 w-4" />} 
            text="Dashboard"
            onClick={() => handleNavClick("Dashboard")}
            bgMuted={activeItem === "Dashboard"} 
            />
            {session?.user && (
              <NavItem
                href="#"
                icon={<ShoppingCart className="h-4 w-4" />}
                text="Orders"
                badge={<Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">6</Badge>}
                onClick={() => handleNavClick("Orders")}
                bgMuted={activeItem === "Orders"}
              />
            )}
            <NavItem 
            href="#" 
            icon={<Package className="h-4 w-4" />} 
            text="Products" 
            onClick={() => handleNavClick("Products")}
            bgMuted={activeItem === "Products"}
            />
            {session?.user && <NavItem 
            href="#" 
            icon={<Users className="h-4 w-4" />} 
            text="Customers"
            //onClick={() => handleNavClick("Customers")}
            bgMuted={activeItem === "Customers"}
            />}
          </nav>
        </div>
        <div className="mt-auto p-4">
          <Card x-chunk="dashboard-02-chunk-0">
            <CardHeader className="p-2 pt-0 md:p-4">
              <CardTitle>Upgrade to Pro</CardTitle>
              <CardDescription>
                Unlock all features and get unlimited access to our support team.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-2 pt-0 md:p-4 md:pt-0">
              <Button size="sm" className="w-full">
                Upgrade
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

interface NavItemProps {
  href: string;
  icon: JSX.Element;
  text: string;
  badge?: JSX.Element;
  bgMuted?: boolean;
  onClick?: () => void;
}

// const NavItem: FC<NavItemProps> = ({ href, icon, text, badge, bgMuted, onClick }) => (
//   <Link
//     href={href}
//     onClick={onClick}
//     className={`flex items-center gap-3 rounded-lg px-3 py-2 ${
//       bgMuted ? "bg-muted text-primary" : "text-muted-foreground"
//     } transition-all hover:text-primary`}
//   >
//     {icon}
//     {text}
//     {badge && badge}
//   </Link>
// );

const NavItem: FC<NavItemProps> = ({ href, icon, text, badge, bgMuted, onClick }) => (
  <a
    href={href}
    onClick={(e) => {
      e.preventDefault(); // Prevent default link behavior
      if (onClick) onClick(); // Execute onClick handler
    }}
    className={`flex items-center gap-3 rounded-lg px-3 py-2 ${
      bgMuted ? "bg-muted text-primary" : "text-muted-foreground"
    } transition-all hover:text-primary`}
  >
    {icon}
    {text}
    {badge && badge}
  </a>
);

export default Sidebar;