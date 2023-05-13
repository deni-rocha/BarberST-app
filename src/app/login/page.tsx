import Image from "next/image";
import BaberStLogo from "@/public/login/barberst-logo.svg";
import RedLogo from "@/public/login/Red Logo.png";
export default function Home() {
  return (
    <div className="absolute w-full h-full p-4">
      <header className="flex justify-between mt-12">
        <section className="w-[240px] h-[100px]">
          <Image src={BaberStLogo} alt="logo-barberSt" />
        </section>

        <section className="w-[230px] h-[200px]">
          <h1 className="w-full h-full font-bold text-2xl text-white">
            Ambiente confortável e descontraído, para todos os estilos.
          </h1>
        </section>
      </header>

      <div className="w-[352px] h-[350px] rounded-3xl drop-shadow-md bg-[#eaeaeaff] pt-4 mt-4 mx-auto">
        <Image
          src={RedLogo}
          width={44}
          height={40}
          alt="logo-popUp"
          className="absolute -top-3 -left-2"
        />
        <div className="w-[300px] h-[300px] flex flex-col gap-8 items-center py-4 mx-auto">
          <h2 className="text-xl font-bold text-bgPrimary">Entrar</h2>

          <section className="w-[255px] space-y-4 ">
            <input
              type="text"
              placeholder="e-mail"
              className="w-full h-[40px] rounded-3xl pl-6 outline-none drop-shadow-md placeholder:opacity-70"
            />
            <div className="flex flex-col">
              <input
                placeholder="senha"
                type="password"
                className="w-full h-[40px] rounded-3xl pl-6 outline-none drop-shadow-md placeholder:opacity-70"
              />
              <p className="text-bgSecondary self-end text-sm mt-2 mr-2 cursor-pointer">
                esqueceu a senha?
              </p>
            </div>
          </section>

          <button className="w-[255px] h-[40px] bg-bgPrimary rounded-3xl outline-none text-white">
            Login
          </button>
        </div>
      </div>
    </div>
  );
}
