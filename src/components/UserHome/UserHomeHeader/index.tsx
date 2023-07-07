import { cookies } from "next/headers";
import { User } from "@/Context/AuthContext";
import Loader from "@/components/Loader";

export const UserHomeHeader = () => {
  const user = cookies().get("user")?.value;

  if (!user) return <Loader />;

  const usuario: User = JSON.parse(user);

  return (
    <header className="bg-bgSecondary h-[150px] rounded-b-3xl p-4 pt-8 text-white flex flex-col relative z-10">
      <h2 className="text-lg font-thin opacity-90 capitalize">
        Olá, {usuario?.nome}
      </h2>
      <h2 className="text-2xl font-bold mt-4">Agende seu horário!</h2>
    </header>
  );
};
