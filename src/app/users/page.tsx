import React, { useEffect, useState } from 'react'
import { DataTable } from '@/components/data-table'
import { columns, User } from './columns'
import { Button } from '@/components/ui/button'
import Settings from '../settings/page'

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
    const [addUser, setAddUser] = useState<boolean>(false)

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

                { addUser? <Settings /> : <DataTable columns={columns} data={data} />}
            </div>
        </section>
    );
}
