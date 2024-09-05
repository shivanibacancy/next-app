// "use client"
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button"
import FormGenerator from "./form-generator";
import Header from "@/components/ui/header";
import { SessionProvider } from "next-auth/react";
import { useEffect } from "react";
// import Dashboard from "./home/page";
import Dashboard from "./dashboard/page";
import { auth } from "@/auth";

export default async function Home() {

  const session = await auth();
  console.log("session", session);
  return (
    <SessionProvider>
      {/* <Header /> */}
      <main className="flex min-h-screen flex-col items-center justify-between ">
      {/* p-24 */}
        {/* <FormGenerator /> */}
        <Dashboard session={session} />
      </main>
    </SessionProvider>
  );
}
