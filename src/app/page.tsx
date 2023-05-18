"use client";

import { useAuth } from "@/Context/AuthContext";
import Image from "next/image";
import GifLoading from "@/public/gifs/Pulse-1s-200px.gif";

export default function Home() {
  const { loading, logout } = useAuth();

  if (loading) {
    return (
      <div className="w-screen h-screen bg-bgPrimary flex flex-col justify-center">
        <Image
          src={GifLoading}
          alt="loader"
          className="w-[130px] h-[130px] mx-auto"
        />
      </div>
    );
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>
        Início index page,{" "}
        <button
          className="bg-bgSecondary text-white p-2 rounded-md"
          onClick={() => logout!()}
        >
          sair
        </button>
      </h1>
    </main>
  );
}
