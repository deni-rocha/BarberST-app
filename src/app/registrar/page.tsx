"use client";

import { Input } from "@/components/atoms/Input";

export default function Registrar() {
  return (
    <div className="w-full h-screen bg-bgPrimary flex items-center justify-center">
      <div className="w-[400px] h-[500px] flex flex-col justify-center items-center bg-bgSecondary rounded-3xl">
        <h1 className="text-2xl text-white font-bold">Registrar</h1>
        <form className="flex flex-col items-center gap-2 w-[300px]">
          <div>
            <label htmlFor="nome" className="text-white ml-4">
              Nome:
            </label>
            <Input type="text" id="nome" />
          </div>
          <div>
            <label htmlFor="email" className="text-white ml-4">
              Email:
            </label>
            <Input type="text" id="nome" />
          </div>

          <div>
            <label htmlFor="senha" className="text-white ml-4">
              Senha:
            </label>
            <Input type="text" id="nome" />
          </div>
          <div>
            <label htmlFor="confirmarSenha" className="text-white ml-4">
              Confirmar senha:
            </label>
            <Input type="text" id="nome" />
          </div>
          <div className="flex justify-between w-full mt-4">
            <div className="flex gap-2 bg-white rounded-2xl">
              <label htmlFor="sexo" className="ml-4 self-center">
                Sexo:
              </label>
              <select id="sexo" className="outline-none rounded-md">
                <option value="M">Masculino</option>
                <option value="F" selected>
                  Feminino
                </option>
              </select>
            </div>
            <button
              type="submit"
              className="bg-green-500 text-white font-bold text-lg p-1 rounded-2xl w-[120px]"
            >
              cadastrar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
