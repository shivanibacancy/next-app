"use client"
import React, { useEffect, useState } from 'react'
import { DataTable } from '@/components/data-table'
import { columns, User } from './columns'
import { Button } from '@/components/ui/button'
import Settings from '../settings/page'
import AddUserForm from './addUserForm'
import { useToast } from "@/hooks/use-toast"

async function getUsers(): Promise<User[]> {
    const res = await fetch('https://66c589e9134eb8f434949d19.mockapi.io/api/v1/users')
    const data = await res.json()
    return data
}

interface UsersProps {
    userdata?: User[]; 
}

export default function Users({ userdata }: UsersProps) {
    const [data, setData] = useState<User[]>(userdata || []);
    const [loading, setLoading] = useState<boolean>(!userdata);
    const [error, setError] = useState<string | null>(null);
    const [addUser, setAddUser] = useState<boolean>(false);
    const { toast } = useToast();

    useEffect(() => {
        if (!userdata) {
            const fetchData = async () => {
                try {
                    const users = await getUsers();
                    setData(users);
                } catch (err) {
                    setError('Failed to fetch users');
                } finally {
                    setLoading(false);
                }
            };

            fetchData();
        }
    }, [userdata]);

    const handleAddUser = async (newUser: User) => {
      try {
        const response = await fetch("https://66c589e9134eb8f434949d19.mockapi.io/api/v1/users", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newUser),
        });
        if (response.ok) {
          const createdUser = await response.json();
          setData((prevData) => [...prevData, createdUser]); // Update state with the new user
        //   toast({
        //     title: "User added successfully.",
        //     description: "The user has been Added.",
        //    })
        alert("User Added Successfully!")
        } else {
          throw new Error("Failed to add user");
        }
      } catch (error) {
        console.error("Error adding user:", error);
      }
    };

    // Handle user deletion and refresh data
    const handleDeleteUser = async (userId: string) => {
        try {
        const response = await fetch(
            `https://66c589e9134eb8f434949d19.mockapi.io/api/v1/users/${userId}`,
            {
            method: "DELETE",
            }
        );
        if (response.ok) {
            toast({
                title: "User deleted successfully.",
                description: "The user has been deleted.",
            })
            alert("User Deleted")
            setData((prevData) => prevData.filter((user) => user.id !== userId)) // Remove user from state
            
        } else {
            throw new Error("Failed to delete user");
        }
        } catch (error: any) {
        console.error("Error deleting user:", error);
        toast({
            title: "Failed to delete user.",
            description: error.message,
            variant: "destructive",
        });
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <section className="py-14">
            <div className="container">
                <h1 className="text-3xl font-bold">All Users</h1>
                <Button onClick={()=> setAddUser(!addUser)}>Add New User</Button>
                {addUser && (
                    <AddUserForm
                        onClose={() => setAddUser(false)}
                        onSubmit={handleAddUser}
                    />
                )}
            <DataTable columns={columns({ handleDeleteUser })} data={data} />
            </div>
        </section>
    );
}
