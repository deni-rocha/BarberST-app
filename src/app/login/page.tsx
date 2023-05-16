"use client";

import Image from "next/image";
import BaberStLogo from "@/public/login/barberst-logo.svg";
import RedLogo from "@/public/login/Red Logo.png";
import { ChangeEvent, useState } from "react";
import { useAuth } from "@/Context/AuthContext";
import { BsFillEyeSlashFill } from "react-icons/bs";
import { IoEyeSharp } from "react-icons/io5";

export default function Home() {
  const [form, setForm] = useState({ email: "", senha: "" });
  const [hiddenPass, setHidden] = useState(true);
  const { login } = useAuth();
  function inputChange(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  }

  async function submit() {
    const res = await login!(form.email, form.senha);
    console.log(res);
  }
  return (
    <div className="absolute w-full h-full p-4">
      <header className="flex justify-between mt-12 md:justify-around">
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
              name="email"
              value={form.email}
              onChange={inputChange}
              type="text"
              placeholder="e-mail"
              className="w-full h-[40px] rounded-3xl pl-6 outline-none drop-shadow-md placeholder:opacity-70"
            />
            <div className="flex flex-col relative">
              <input
                onChange={inputChange}
                name="senha"
                placeholder="senha"
                type={hiddenPass ? "password" : "text"}
                className="w-full h-[40px] rounded-3xl pl-6 outline-none drop-shadow-md placeholder:opacity-70"
              />
              <div
                className="absolute top-3 self-end mr-3 opacity-50 cursor-pointer"
                onClick={() => setHidden(!hiddenPass)}
              >
                {hiddenPass ? <BsFillEyeSlashFill /> : <IoEyeSharp />}
              </div>
              <p className="text-bgSecondary self-end text-sm mt-2 mr-2 cursor-pointer">
                esqueceu a senha?
              </p>
            </div>
          </section>

          <button
            type="submit"
            onClick={submit}
            className="w-[255px] h-[40px] bg-bgPrimary rounded-3xl outline-none text-white"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
}
