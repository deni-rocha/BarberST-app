"use client";

import { useAuth } from "@/Context/AuthContext";
import horarioApi from "@/api/horario";
import { useEffect, useState } from "react";

interface IDatasDisponiveis {
  "dd/mm/yyyy": string[];
}

const initDatasDisponiveis = {
  "dd/mm/yyyy": ["hh:mm"],
};

export default function Home() {
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
    if (daySelected === "dd/mm/yyyy") return;

    const diaSelecionado = datasDisponiveis.filter((data) => data[daySelected]);
    const horarios: string[] = diaSelecionado[0][daySelected];

    let partes: JSX.Element[][] = [],
      len = 2;

    for (let i = 0; i < horarios.length; i += len) {
      const arrayDividido = horarios.slice(i, i + len);
      const horasJSX = arrayDividido.map((hora, index) => (
        <p key={index}> {hora} </p>
      ));

      partes.push(horasJSX);
    }

    setHorariosDisponiveis(partes);
  }, [datasDisponiveis, daySelected]);

  useEffect(() => {
    const fetch = async () => {
      const res = await horarioApi.datasDisponiveis();

      setDatasDisponiveis(res);
    };

    fetch();
  }, []);

  return (
    <div className="w-full h-full bg-bgPrimary ">
      <header className="bg-bgSecondary h-[150px] rounded-b-3xl p-4 pt-8 text-white flex flex-col relative z-10">
        <h1 className="text-lg font-thin opacity-90 capitalize">
          Olá, {usuario?.nome}
        </h1>
        <h2 className="text-2xl font-bold mt-4">Agende seu horário!</h2>
      </header>
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
      <section className="bg-bgPrimary mt-10 text-white">
        <h2 className="p-4 font-bold text-2xl">Horários</h2>
        <div className="flex gap-5 pl-4 overflow-x-scroll divScroll">
          {horariosDisponiveis?.map((horario, index) => {
            if (horario) {
              return (
                <div key={index} className="flex flex-col">
                  {horario}
                </div>
              );
            }
          })}
        </div>
      </section>
    </div>
  );
}
