"use client";

import { Sidebar } from "./components/Sidebar";
import { Chat } from "./components/Chat";
import { useAppContext } from "@/context/AppContext";

const sleep = (msec: number) =>
  new Promise((resolve) => setTimeout(resolve, msec));

export default async function Home() {
  const { user } = useAppContext();

  if (!user) {
    await sleep(3000);
  }

  return (
    <div className="flex h-screen justify-center items-center">
      <div className="h-full flex" style={{ width: "1280px" }}>
        <div className="w-1/5 h-full border-r">
          <Sidebar />
        </div>
        <div className="w-4/5 h-full">
          <Chat />
        </div>
      </div>
    </div>
  );
}
