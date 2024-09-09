"use client"
// pages/dashboard.tsx
import Orders from "@/components/features/orders";
import { auth } from "@/auth";
import { FC, SetStateAction, useEffect, useState } from "react";
import Sidebar from "./sidebar";
import Header from "./header";
import Users from "../users/page";
import MainChild from "./main-child";
import { columns, User } from "./../users/columns";

type Props = {}

interface DashboardProps {
  session: any; // Replace 'any' with a specific session type if available
}



const Dashboard: FC<DashboardProps> = ({ session }) => {

  const [option, setOption] = useState("Dashboard");
  const [data, setData] = useState({});

  const selectedOption = (item: string) => {
    setOption(item);
  };

  useEffect(() => {
    const fetchData = async (): Promise<User[]> => {
      const res = await fetch('https://66c589e9134eb8f434949d19.mockapi.io/api/v1/users')
      const data = await res.json()
      return data
    }
  
    fetchData()
      .then(data => {
        console.log(data);
        setData(data)
      })
      .catch(error => {
        console.error('Error fetching data:', error)
      })
  }, [])

  useEffect(() => {
    console.log("UseEffect", option)
  }, [option])

  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <Sidebar session={session} selectedOption={selectedOption} />
      <div className="flex flex-col">
        <Header session={session} />
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
          <MainChild option={option} session={session} userdata={data} />
        </main>
      </div>
    </div>
  );
};


export default Dashboard;