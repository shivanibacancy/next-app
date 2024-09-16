"use client"

import { useEffect, useState } from "react";
import Sidebar from "./sidebar";
import Header from "./header";
import MainChild from "./main-child";
import { User } from "./../users/columns";
import { Product } from "../products/page";

type Props = {}

interface DashboardProps {
  session: any; 
}

const Dashboard = ({ session }: DashboardProps) => {
  const [option, setOption] = useState<string>("Dashboard");
  const [userData, setUserData] = useState<User[]>([]);
  const [productData, setProductData] = useState<Product[]>([]);

  const selectedOption = (item: string) => {
    setOption(item);
  };

  // useEffect(() => {
  //   const fetchData = async (): Promise<User[]> => {
  //     try {
  //       const res = await fetch('https://66c589e9134eb8f434949d19.mockapi.io/api/v1/users');
  //       const data = await res.json();
  //       return data;
  //     } catch (error) {
  //       console.error('Error fetching data:', error);
  //       return [];
  //     }
  //   };

  //   fetchData().then((data) => {
  //     console.log(data);
  //     setData(data);
  //   });
  // }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [userResponse, productResponse] = await Promise.all([
          fetch('https://66c589e9134eb8f434949d19.mockapi.io/api/v1/users'),
          fetch('https://fakestoreapi.com/products'),
        ]);

        const [users, products] = await Promise.all([
          userResponse.json(),
          productResponse.json(),
        ]);

        setUserData(users);
        setProductData(products);

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    console.log("UseEffect", option);
  }, [option]);

  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <Sidebar session={session} selectedOption={selectedOption} />
      <div className="flex flex-col">
        <Header session={session} />
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
          <MainChild option={option} session={session} userdata={userData} productdata={productData} />
        </main>
      </div>
    </div>
  );
};

export default Dashboard;