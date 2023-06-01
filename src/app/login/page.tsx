"use client";

import Image from "next/image";
import BaberStLogo from "@/public/login/barberst-logo.svg";
import RedLogo from "@/public/login/Red Logo.png";
import { ChangeEvent, useRef, useState, FormEvent } from "react";
import { useAuth } from "@/Context/AuthContext";
import { BsFillEyeSlashFill } from "react-icons/bs";
import { IoEyeSharp } from "react-icons/io5";

import GifLoader from "@/public/gifs/Reload-1s-200px.gif";
import Swal from "sweetalert2";
import { Input } from "@/components/atoms/Input";
import Link from "next/link";

export default function Login() {
  const [form, setForm] = useState({ email: "", senha: "" }); // formulário para login
  const [hiddenPass, setHidden] = useState(true); // mostrar ou esconder senha

  const [loadingLogin, setLoadingLogin] = useState(false); // estado animação do login
  const { login } = useAuth(); // função para fazer o login

  const refInputEmail = useRef<HTMLInputElement>(null); // referência para o input de email
  const refInputSenha = useRef<HTMLInputElement>(null); // referência para o input de senha

  // salvar estado ao digitar no input
  function inputChange(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  }

  // enviar dados
  async function submit(e: FormEvent<HTMLFormElement>) {
    // evita o comportamento padrão que reseta todos os campos
    e.preventDefault();

    // referências dos inputs
    const inputEmailClasses = refInputEmail.current?.classList;
    const inputSenhaClasses = refInputSenha.current?.classList;

    // expressão regular para validação de email
    const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;

    // validar o email
    if (!regex.test(form.email)) {
      // adiciona a classe para sinalizar o erro
      inputEmailClasses?.add("outline-red-500");
      return;
    } else {
      // remove a classe de erro
      inputEmailClasses?.remove("outline-red-500");
    }

    // validar senha
    if (form.senha.length < 4) {
      inputSenhaClasses?.add("outline-red-500");
      return;
    } else {
      // remove a classe de erro
      inputSenhaClasses?.remove("outline-red-500");
    }

    setLoadingLogin(true); // ativar animação

    const res = await login!(form.email, form.senha); // chama função para logar

    if (!res.success) {
      // parar o loader
      setLoadingLogin(false);

      // reseta o campo de senha
      setForm({ ...form, senha: "" });

      // mostrar popup de erro com mensagem de resposta da API
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: res.message,
        showConfirmButton: false,
        timer: 1500,
        customClass: {
          popup: "popupStyle",
        },
      });
    }
  }

  return (
    <div className="absolute w-full h-full p-4">
      <header className="flex justify-between gap-8 mt-12 md:justify-around">
        <section className="w-[240px] h-[100px]">
          <Image src={BaberStLogo} alt="logo-barberSt" />
        </section>

        <section className="w-[230px] h-[200px]">
          <h1 className="w-full h-full font-bold text-2xl text-white">
            Ambiente confortável e descontraído, para todos os estilos.
          </h1>
        </section>
      </header>

      <div className="w-[352px] h-[350px] rounded-3xl drop-shadow-md bg-[#eaeaeaff] pt-4 mt-4 mx-auto flex">
        <Image
          src={RedLogo}
          width={44}
          height={40}
          alt="logo-popUp"
          className="absolute -top-3 -left-2"
        />

        {/* lógica para mostrar o gif  */}
        {loadingLogin ? (
          <Image
            src={GifLoader}
            alt="loader"
            className="w-[80px] self-center mx-auto"
          />
        ) : (
          <div className="w-[300px] h-[300px] flex flex-col gap-8 items-center py-4 mx-auto ">
            <h2 className="text-xl font-bold text-bgPrimary">Entrar</h2>
            <form className="w-[255px] space-y-4" onSubmit={(e) => submit(e)}>
              <Input
                ref={refInputEmail}
                name="email"
                value={form.email}
                onChange={inputChange}
                type="text"
                placeholder="e-mail"
              />
              <div className="flex flex-col relative">
                <Input
                  ref={refInputSenha}
                  onChange={inputChange}
                  name="senha"
                  placeholder="senha"
                  type={hiddenPass ? "password" : "text"}
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

              <button
                type="submit"
                className="bottom-12 absolute focus:bg-opacity-75 hover:opacity-75 w-[255px] h-[40px] bg-bgPrimary rounded-3xl outline-none text-white"
              >
                Login
              </button>
            </form>
            <Link
              href="/registrar"
              className="absolute bottom-5 text-sm text-bgSecondary cursor-pointer"
            >
              ainda não tenho conta
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
