"use client";

import { useAuth } from "@/Context/AuthContext";
import Image from "next/image";
import GifLoading from "@/public/gifs/Pulse-1s-200px.gif";
import Swal from "sweetalert2";
import { useEffect } from "react";
import Home from "./Home";

export default function Page() {
  const { usuario, loading, logout } = useAuth();

  useEffect(() => {
    // verifica se usuário está conectado
    if (!loading && usuario) {
      // mostra popup de sucesso com mensagem de "login efetuado"
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "conectado",
        showConfirmButton: false,
        timer: 1500,
        customClass: {
          popup: "popupStyle",
        },
      });
    }
  });

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
  } else {
    return <Home />;
  }
}
