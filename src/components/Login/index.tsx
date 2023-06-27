"use client";

import Image from "next/image";
import BaberStLogo from "@/public/login/barberst-logo.svg";
import RedLogo from "@/public/login/Red Logo.png";
import { useState } from "react";
import { useAuth } from "@/Context/AuthContext";
import { BsFillEyeSlashFill } from "react-icons/bs";
import { IoEyeSharp } from "react-icons/io5";

import GifLoader from "@/public/gifs/Eclipse-1s-200px.gif";
import Swal from "sweetalert2";
import { Input } from "@/components/Input";
import Link from "next/link";
import { FormikErrors, useFormik } from "formik";
import { useRouter } from "next/navigation";
import { APP_ROUTES } from "@/constants/app-routes";
import { FormLogin, validateLogin } from "@/functions/validates";

type LoginProps = {
  admin?: boolean;
};

export default function Login({ admin = false }: LoginProps): JSX.Element {
  const [hiddenPass, setHidden] = useState(true); // mostrar ou esconder senha

  const [loadingLogin, setLoadingLogin] = useState(false); // estado animação do login
  const { login } = useAuth(); // função para fazer o login
  const { push } = useRouter();

  const formik = useFormik({
    initialValues: {
      email: "",
      senha: "",
    },
    validate: (e) => validateLogin(e),
    onSubmit: (e) => submit(e),
  });

  // enviar dados
  async function submit(e: FormLogin) {
    setLoadingLogin(true); // ativar animação

    const res = await login!(e.email, e.senha); // chama função para logar

    if (!res.success) {
      // parar o loader
      setLoadingLogin(false);

      // reseta o campo de senha
      // setForm({ ...form, senha: "" });

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

    // faz o push para rota /home de administrador ou de usuário
    admin
      ? push(APP_ROUTES.private.admin.home)
      : push(APP_ROUTES.private.user.home);
  }

  return (
    <div className="w-screen h-screen flex">
      {/* background  */}
      <div className="h-full w-1/2 bg-bgPrimary"></div>
      <div className="h-full w-1/2 bg-bgSecondary"></div>

      {/* content */}
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
              className="w-[150px] h-[150px] self-center mx-auto"
            />
          ) : (
            <div className="w-[300px] h-[300px] flex flex-col gap-8 items-center py-4 mx-auto ">
              <h2 className="text-xl font-bold text-bgPrimary">
                Login {admin ? "Administrador" : null}
              </h2>
              <form
                className="w-[255px] space-y-4"
                onSubmit={formik.handleSubmit}
              >
                <Input
                  name="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  type="text"
                  placeholder="e-mail"
                  className={`${
                    formik.touched.email && formik.errors.email
                      ? "border border-red-500"
                      : ""
                  }`}
                />
                <div className="flex flex-col relative">
                  <Input
                    value={formik.values.senha}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
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
                  Entrar
                </button>
              </form>
              {admin ? null : (
                <Link
                  href="/registrar"
                  className="absolute bottom-5 text-sm text-bgSecondary cursor-pointer"
                >
                  ainda não tenho conta
                </Link>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
