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
        <div className="w-[280px] h-[280px] border border-black mx-auto">
          <h2>Bem-vindo</h2>
        </div>
      </div>
    </div>
  );
}
