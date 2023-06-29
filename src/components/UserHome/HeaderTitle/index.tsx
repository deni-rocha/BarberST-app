"use client";
import { useAuth } from "@/Context/AuthContext";

export const HeaderTitle = () => {
  const { usuario } = useAuth();

  console.log("tittle header", usuario?.nome);

  return (
    <h2 className="text-lg font-thin opacity-90 capitalize">
      Olá, {usuario?.nome}
    </h2>
  );
};
