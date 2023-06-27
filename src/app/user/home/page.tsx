"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

import { Colaborador } from "@/types/Colaborador";
import { Servico } from "@/types/Servico";
import { useAuth } from "@/Context/AuthContext";
import { servico } from "@/functions/api";
import Swal from "sweetalert2";

export default function UserHomePage() {
  const { usuario } = useAuth();
  const [servicos, setServicos] = useState<Servico[] | []>([]);
  const [colaboradores, setColaboradores] = useState<Colaborador[] | []>([]);

  const [servicoId, setServicoId] = useState("");

  const [colaboradorId, setColaboradorId] = useState("");

  useEffect(() => {
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
  }, []);

  useEffect(() => {}, []);

  useEffect(() => {
    const fetch = async () => {
      const res = await servico.listar();

      setServicos(res as Servico[]);
    };

    fetch();
  }, []);

  return (
    <div className="w-full h-screen bg-bgPrimary relative">
      <header className="bg-bgSecondary h-[150px] rounded-b-3xl p-4 pt-8 text-white flex flex-col relative z-10">
        <h1 className="text-lg font-thin opacity-90 capitalize">
          Olá, {usuario?.nome}
        </h1>
        <h2 className="text-2xl font-bold mt-4">Agende seu horário!</h2>
      </header>

      {/* datas */}
      <section className="-mt-6 text-white pt-16">
        <h2 className="p-4 font-bold text-2xl">Datas</h2>
        <div className="flex gap-5 pl-4 overflow-x-scroll divScroll md:overflow-hidden">
          {servicos?.map((data, index) => {
            return (
              <div
                className="min-w-[80px] h-[80px] mb-2 bg-white text-black rounded-2xl flex flex-col items-center justify-center cursor-pointer"
                key={index}
                onClick={() => {
                  setServicoId(data._id);
                  setColaboradores(data.colaboradores);
                }}
              >
                <p>{data.nome}</p>
                <p>{data.preco}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* horários */}
      <section className="bg-bgPrimary mt-10 text-white">
        <h2 className="p-4 font-bold text-2xl">Horários</h2>
        <div className="flex gap-5 pl-4 overflow-x-scroll divScroll">
          {colaboradores?.map((data, index) => (
            <div key={index}>
              <p>{data.nome}</p>
              <Image src={data.foto} alt="foto do colaborador" />
            </div>
          ))}
        </div>
      </section>

      {/* marcar agendamento */}
      <footer className="flex items-center justify-center">
        <button className="mb-10 absolute bottom-0 capitalize w-[264px] h-[56px] font-medium text-lg rounded-2xl bg-bgSecondary text-white">
          agendar
        </button>
      </footer>
    </div>
  );
}
