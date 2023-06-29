"use client";

import { useAuth } from "@/Context/AuthContext";
import { horario } from "@/functions/api";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

interface IDatasDisponiveis {
  "dd/mm/yyyy": string[];
}

const initDatasDisponiveis = {
  "dd/mm/yyyy": ["hh:mm"],
};

export default function UserAgendarPage() {
  const { usuario } = useAuth();
  const [datasDisponiveis, setDatasDisponiveis] = useState<IDatasDisponiveis[]>(
    [initDatasDisponiveis]
  );

  const [daySelected, setDaySelected] =
    useState<keyof IDatasDisponiveis>("dd/mm/yyyy");
  const [horariosDisponiveis, setHorariosDisponiveis] = useState<
    JSX.Element[][]
  >([[]]);

  function transformData(value: string) {
    // a data está no padrão "pt-br", por isso é preciso fazer a separação
    const [dia, mes, ano] = value.split("/");

    const data = new Date(`${mes}/${dia}/ ${ano}`); // a classe new Date não recebe o input "pt-br"

    const diaSemanaNome = data.toLocaleDateString("pt-br", {
      weekday: "short",
    });

    const diaSemanaNumerico = data.toLocaleDateString("pt-br", {
      day: "numeric",
    });

    const diaSemanaNomeReplace = diaSemanaNome.replace(".", "");
    return (
      <>
        <p className="">{diaSemanaNumerico}</p>
        <p className="">{diaSemanaNomeReplace}</p>
      </>
    );
  }

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

  useEffect(() => {
    if (daySelected === "dd/mm/yyyy") return;

    const diaSelecionado = datasDisponiveis.filter((data) => data[daySelected]);
    const horarios: string[] = diaSelecionado[0][daySelected];

    // dividir o array em partes de dois elementos
    let partes: JSX.Element[][] = [],
      len = 2;

    for (let i = 0; i < horarios.length; i += len) {
      const arrayDividido = horarios.slice(i, i + len);
      const horasJSX = arrayDividido.map((hora, index) => (
        <p
          key={index}
          className="w-[85px] h-[36px] rounded-2xl flex items-center justify-center bg-white text-black"
        >
          {hora}
        </p>
      ));

      partes.push(horasJSX);
    }

    setHorariosDisponiveis(partes);
  }, [datasDisponiveis, daySelected]);

  useEffect(() => {
    const fetch = async () => {
      const res = await horario.datasDisponiveis("");

      setDatasDisponiveis(res);
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
          {datasDisponiveis?.map((data, index) => {
            return (
              <div
                className="min-w-[80px] h-[80px] mb-2 bg-white text-black rounded-2xl flex flex-col items-center justify-center cursor-pointer"
                key={index}
                onClick={() =>
                  setDaySelected(
                    Object.keys(data) as unknown as keyof IDatasDisponiveis
                  )
                }
              >
                {transformData(Object.keys(data).toString())}
              </div>
            );
          })}
        </div>
      </section>

      {/* horários */}
      <section className="bg-bgPrimary mt-10 text-white">
        <h2 className="p-4 font-bold text-2xl">Horários</h2>
        <div className="flex gap-5 pl-4 overflow-x-scroll divScroll">
          {horariosDisponiveis?.map((horario, index) => {
            if (horario) {
              return (
                <div key={index} className="flex flex-col gap-2 mb-2">
                  {horario}
                </div>
              );
            }
          })}
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
