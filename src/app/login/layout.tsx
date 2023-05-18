"use client";

import Image from "next/image";
import GifLoading from "@/public/gifs/Pulse-1s-200px.gif";

import { useAuth } from "@/Context/AuthContext";

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { loading } = useAuth();

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
    <div className="w-screen h-screen flex">
      <div className="h-full w-1/2 bg-bgPrimary"></div>
      <div className="h-full w-1/2 bg-bgSecondary"></div>
      {children}
    </div>
  );
}
