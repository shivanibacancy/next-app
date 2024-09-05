"use client"
// pages/dashboard.tsx
import Orders from "@/components/features/orders";
import { auth } from "@/auth";
import { FC, SetStateAction, useEffect, useState } from "react";
import Sidebar from "./sidebar";
import Header from "./header";
import Users from "../users/page";
import MainChild from "./main-child";

type Props = {}

interface DashboardProps {
  session: any; // Replace 'any' with a specific session type if available
}


const Dashboard: FC<DashboardProps> = ({ session }) => {

  const [option, setOption] = useState("Dashboard");

  const selectedOption = (item: string) => {
    setOption(item);
    // console.log("Option", option, item)
  };

  useEffect(() => {
    console.log("UseEffect", option)
  }, [option])

  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <Sidebar session={session} selectedOption={selectedOption} />
      <div className="flex flex-col">
        <Header session={session} />
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
          {/* {option === "Dashboard" ? <Users /> : option=== "Customers" ? <Users /> : <h1>Hello World</h1>} */}
          <MainChild option={option} session={session} />
        </main>
        {/* <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
          <h1>MAIN PAGE</h1>
        
         {/* {option === "Customers" && <Users />} 
        </main> */}
      </div>
    </div>
  );
};


export default Dashboard;