import React from 'react'
import { DataTable } from '@/components/data-table'
import { columns, User } from './columns'

async function getUsers(): Promise<User[]> {
    const res = await fetch('https://66c589e9134eb8f434949d19.mockapi.io/api/v1/users')
    const data = await res.json()
    return data
}


export default async function Users() {
  
  const data = await getUsers()
    
  return (
    <section className="py-14">
         <div className="container">
             <h1 className="text-3xl font-bold">All Users</h1>
             <DataTable columns={columns} data={data} />
         </div>
    </section>
  )
}
