import api from "@/functions/api/base";
import { Servico } from "@/types/Servico";
import { AxiosError } from "axios";
import { cookies } from "next/headers";
import { User } from "@/Context/AuthContext";
import Loader from "@/components/Loader";

const listar = async () => {
  const token = cookies().get("token")?.value;

  try {
    const res = await api.get<Servico[]>(`/servico`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return res.data;
  } catch (err) {
    const error = err as AxiosError;

    console.log(error.response?.data);
    return null;
  }
};

export default async function UserHomePage() {
  const user = cookies().get("user")?.value;

  if (!user) return <Loader />;

  const usuario: User = JSON.parse(user);

  const servicos = await listar();

  return (
    <div className="w-full h-screen bg-bgPrimary relative">
      <header className="bg-bgSecondary h-[150px] rounded-b-3xl p-4 pt-8 text-white flex flex-col relative z-10">
        <h2 className="text-lg font-thin opacity-90 capitalize">
          Olá, {usuario?.nome}
        </h2>
        <h2 className="text-2xl font-bold mt-4">Agende seu horário!</h2>
      </header>

      {/* datas */}
      <div className="-mt-6 text-white pt-16">
        <h2 className="p-4 font-bold text-2xl">Datas</h2>
        <div className="flex gap-5 pl-4 overflow-x-scroll divScroll md:overflow-hidden">
          {servicos?.map((data, index) => {
            return (
              <div
                className="min-w-[80px] h-[80px] mb-2 bg-white text-black rounded-2xl flex flex-col items-center justify-center cursor-pointer"
                key={index}
              >
                <p>{data.nome}</p>
                <p>{data.preco}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* horários
      <div className="bg-bgPrimary mt-10 text-white">
        <h2 className="p-4 font-bold text-2xl">Horários</h2>
        <div className="flex gap-5 pl-4 overflow-x-scroll divScroll">
          {colaboradores?.map((data, index) => (
            <div key={index}>
              <p>{data.nome}</p>
              <p>{data.horario}</p>
            </div>
          ))}
        </div>
      </div> */}

      {/* marcar agendamento */}
      <section className="flex items-center justify-center">
        <button className="mb-10 absolute bottom-0 capitalize w-[264px] h-[56px] font-medium text-lg rounded-2xl bg-bgSecondary text-white">
          agendar
        </button>
      </section>
    </div>
  );
}
