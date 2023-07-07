"use client";

import { servico } from "@/functions/api";
import { Colaborador } from "@/types/Colaborador";
import { Servico } from "@/types/Servico";
import { useEffect, useState } from "react";

export const UserHomeMain = () => {
  const [servicos, setServicos] = useState<Servico[] | null>(null);
  const [colaboradores, setColaboradores] = useState<Colaborador[] | null>(
    null
  );

  useEffect(() => {
    const fetch = async () => {
      const res = await servico.listar();

      setServicos(res);
    };

    void fetch();
  });

  return (
    <>
      <div className="-mt-6 text-white pt-16">
        <h2 className="p-4 font-bold text-2xl">Serviços</h2>
        <div className="flex gap-5 pl-4 overflow-x-scroll divScroll md:overflow-hidden">
          {servicos?.map((data, index) => {
            return (
              <div
                className="min-w-[80px] h-[80px] mb-2 bg-white text-black rounded-2xl flex flex-col items-center justify-center cursor-pointer"
                key={index}
                onClick={() => setColaboradores(data.colaboradores)}
              >
                <p>{data.nome}</p>
                <p>{data.preco}</p>
              </div>
            );
          })}
        </div>
      </div>

      <div className="bg-bgPrimary mt-10 text-white">
        <h2 className="p-4 font-bold text-2xl">Funcionários</h2>
        <div className="flex gap-5 pl-4 overflow-x-scroll divScroll">
          {colaboradores?.map((data, index) => (
            <div key={index}>
              <p>{data.nome}</p>
              <p>{data.sexo}</p>
            </div>
          ))}
        </div>
      </div>

      {/* marcar agendamento */}
      <section className="flex items-center justify-center">
        <button className="mb-10 absolute bottom-0 capitalize w-[264px] h-[56px] font-medium text-lg rounded-2xl bg-bgSecondary text-white">
          agendar
        </button>
      </section>
    </>
  );
};
