"use client"

import { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal, ArrowUpDown, Trash } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

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
} from "@/components/ui/alert-dialog"
import { useState } from "react"
import { useToast } from "@/hooks/use-toast"
// import { z } from "zod"

// This type is used to define the shape of our data.
// Todo use Zod schema here 
export type User = {
  id: string
  name: string
  email: string
  image: string
  lastseen: string
}

interface ColumnsProps {
  handleDeleteUser: (userId: string) => Promise<void>;
}


// export type User = z.object({
//   id: z.number().min(1),
//   name: z.string().min(5, 'Username must be at least 5 characters'),
//   email: z.string().email('Invalid email format'),
//   password: z.string().min(8, 'Password must contain at least 8 characters'),
//   age: z.number().optional(),
// });

// export const columns = ({ handleDeleteUser }: ColumnsProps): ColumnDef<User>[] => [
//   {
//       id: "select",
//       header: ({ table }) => (
//         <Checkbox
//           checked={
//             table.getIsAllPageRowsSelected() ||
//             (table.getIsSomePageRowsSelected() )
//           }
//           onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
//           aria-label="Select all"
//         />
//       ),
//       cell: ({ row }) => (
//         <Checkbox
//           checked={row.getIsSelected()}
//           onCheckedChange={(value) => row.toggleSelected(!!value)}
//           aria-label="Select row"
//         />
//       ),
//   },
//   {
//     accessorKey: "name", //used for sorting, api's etc
//     header: ({ column }) => {
//         return (
//           <Button
//             variant="ghost"
//             onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
//           >
//             Name
//             <ArrowUpDown className="ml-2 h-4 w-4" />
//           </Button>
//         )
//     }
//     /*header: "Name", //just a simple string */
//   },
//   {
//     accessorKey: "email",
//     header: "Email",
//   },
//   {
//     accessorKey: "lastseen",
//     header: "Last Seen",
//     cell: ({ row }) => {
//         const date = new Date(row.getValue('lastseen'))
//         const formatted = date.toLocaleDateString("en-US")
//         return <div className="font-medium">{formatted}</div>
//     }
//   },
//   {
//     id: "actions",
//     cell: ({ row }) => {
//       const user = row.original

//       const [isDialogOpen, setIsDialogOpen] = useState(false)
//       const { toast } = useToast()
 
//       return (
//         <DropdownMenu>
//           <DropdownMenuTrigger asChild>
//             <Button variant="ghost" className="h-8 w-8 p-0">
//               <span className="sr-only">Open menu</span>
//               <MoreHorizontal className="h-4 w-4" />
//             </Button>
//           </DropdownMenuTrigger>
//           <DropdownMenuContent align="end">
//             <DropdownMenuLabel>Actions</DropdownMenuLabel>
//             <DropdownMenuItem
//               onClick={() => {navigator.clipboard.writeText(user.id); alert("Client ID copied to clipboard")}}
//             >
//               Copy user ID
//             </DropdownMenuItem>
//             <DropdownMenuSeparator />
//             <DropdownMenuItem onClick={() => setIsDialogOpen(true)}>
//               <Trash className="mr-2 h-4 w-4 text-red-500" />
//               Delete User
//             </DropdownMenuItem>
//           </DropdownMenuContent>

//           {/* AlertDialog for confirmation */}
//           <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
//             <AlertDialogContent>
//               <AlertDialogHeader>
//                 <AlertDialogTitle>Confirm Delete</AlertDialogTitle>
//                 <AlertDialogDescription>
//                   Are you sure you want to delete this user? This action cannot
//                   be undone.
//                 </AlertDialogDescription>
//               </AlertDialogHeader>
//               <AlertDialogFooter>
//                 <AlertDialogCancel onClick={() => setIsDialogOpen(false)}>
//                   Cancel
//                 </AlertDialogCancel>
//                 <AlertDialogAction
//                   onClick={() => handleDeleteUser(user.id)}
//                   className="bg-red-500 text-white"
//                 >
//                   Yes, Delete
//                 </AlertDialogAction>
//               </AlertDialogFooter>
//             </AlertDialogContent>
//           </AlertDialog>
//         </DropdownMenu>
//       )
//     },
//   },
// ]

const ActionCell = ({ user, handleDeleteUser }: { user: User, handleDeleteUser: (userId: string) => Promise<void> }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuItem
          onClick={() => {
            navigator.clipboard.writeText(user.id);
            alert("Client ID copied to clipboard");
          }}
        >
          Copy user ID
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => setIsDialogOpen(true)}>
          <Trash className="mr-2 h-4 w-4 text-red-500" />
          Delete User
        </DropdownMenuItem>
      </DropdownMenuContent>

      {/* AlertDialog for confirmation */}
      <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm Delete</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this user? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setIsDialogOpen(false)}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={() => handleDeleteUser(user.id)}
              className="bg-red-500 text-white"
            >
              Yes, Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </DropdownMenu>
  );
};

export const columns = ({ handleDeleteUser }: ColumnsProps): ColumnDef<User>[] => [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected() || table.getIsSomePageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Name
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "lastseen",
    header: "Last Seen",
    cell: ({ row }) => {
      const date = new Date(row.getValue("lastseen"));
      const formatted = date.toLocaleDateString("en-US");
      return <div className="font-medium">{formatted}</div>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <ActionCell user={row.original} handleDeleteUser={handleDeleteUser} />,
  },
];
 