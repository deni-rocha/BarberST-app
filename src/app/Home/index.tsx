"use client";

import { useAuth } from "@/Context/AuthContext";
import horario from "@/api/horario";
import { useEffect, useState } from "react";

export default function Home() {
  const { usuario, loading, logout } = useAuth();
  const [datasDisponiveis, setDatasDisponiveis] = useState([
    { "20/02/2020": ["09:00"] },
  ]);

  useEffect(() => {
    const fetch = async () => {
      const res = await horario.datasDisponiveis();

      setDatasDisponiveis(res);
    };

    fetch();
  }, []);

  return (
    <div className="w-full h-full">
      <header className="bg-bgSecondary h-[150px] rounded-b-3xl p-4 pt-8 text-white flex flex-col relative z-10">
        <h1 className="text-lg font-thin opacity-80">Olá, {usuario?.nome}</h1>
        <h2 className="text-2xl font-bold mt-4">Agende seu horário!</h2>
      </header>
      <section className="bg-bgPrimary h-[500px] -mt-6 text-white pt-16">
        <h2 className="p-4 font-bold text-2xl">Datas</h2>
        {datasDisponiveis.map((data, index) => {
          return <div key={index}>dia: {Object.keys(data)}</div>;
        })}
      </section>
    </div>
  );
}
