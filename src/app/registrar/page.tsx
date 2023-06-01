"use client";

import { Input } from "@/components/atoms/Input";
import { FormikErrors, useFormik } from "formik";

type FormValues = {
  nome: string;
  email: string;
  senha: string;
  sexo: string;
  confirmarSenha: string;
};
const validate = (values: FormValues) => {
  let errors: FormikErrors<FormValues> = {};
  if (!values.nome) {
    errors.nome = "obrigátorio";
  } else if (values.nome.length > 15) {
    errors.nome = "O nome é muito grande";
  }

  if (!values.email) {
    errors.email = "obrigátorio";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Email inválido";
  }

  if (!values.senha) {
    errors.senha = "obrigátorio";
  } else if (values.senha.length > 20) {
    errors.senha = "Senha muito grande";
  }

  if (!values.confirmarSenha) {
    errors.confirmarSenha = "obrigátorio";
  } else if (values.confirmarSenha !== values.senha) {
    errors.confirmarSenha = "As senhas não coincidem";
  }

  return errors;
};

export default function Registrar() {
  const formik = useFormik({
    initialValues: {
      nome: "",
      email: "",
      senha: "",
      confirmarSenha: "",
      sexo: "",
    },
    validate,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  return (
    <div className="w-full h-screen bg-bgPrimary flex items-center justify-center">
      <div className="w-[400px] h-[500px] flex flex-col justify-center items-center bg-bgSecondary rounded-3xl">
        <h1 className="text-2xl text-white font-bold">Registrar</h1>
        <form
          className="flex flex-col items-center gap-2 w-[300px]"
          onSubmit={formik.handleSubmit}
        >
          <div className="relative">
            <label htmlFor="nome" className="text-white ml-4">
              Nome:
            </label>
            <Input
              type="text"
              id="nome"
              onChange={formik.handleChange}
              value={formik.values.nome}
              onBlur={formik.handleBlur}
            />
            {formik.touched.nome && formik.errors.nome ? (
              <div className="text-end text-white mr-2">
                {formik.errors.nome}
              </div>
            ) : null}
          </div>
          <div className="relative">
            <label htmlFor="email" className="text-white ml-4">
              Email:
            </label>
            <Input
              type="text"
              id="email"
              onChange={formik.handleChange}
              value={formik.values.email}
              onBlur={formik.handleBlur}
            />
            {formik.touched.email && formik.errors.email ? (
              <div className="text-end text-white mr-2">
                {formik.errors.email}
              </div>
            ) : null}
          </div>

          <div>
            <label htmlFor="senha" className="text-white ml-4">
              Senha:
            </label>
            <Input
              type="text"
              id="senha"
              onChange={formik.handleChange}
              value={formik.values.senha}
              onBlur={formik.handleBlur}
            />
            {formik.touched.senha && formik.errors.senha ? (
              <div className="text-end text-white mr-2">
                {formik.errors.senha}
              </div>
            ) : null}
          </div>
          <div>
            <label htmlFor="confirmarSenha" className="text-white ml-4">
              Confirmar senha:
            </label>
            <Input
              type="text"
              id="confirmarSenha"
              onChange={formik.handleChange}
              value={formik.values.confirmarSenha}
              onBlur={formik.handleBlur}
            />
            {formik.touched.confirmarSenha && formik.errors.confirmarSenha ? (
              <div className="text-end text-white mr-2">
                {formik.errors.confirmarSenha}
              </div>
            ) : null}
          </div>
          <div className="flex justify-between w-full mt-4">
            <div className="flex gap-2 bg-white rounded-2xl">
              <label htmlFor="sexo" className="ml-4 self-center">
                Sexo:
              </label>
              <select
                id="sexo"
                className="outline-none rounded-md"
                onChange={formik.handleChange}
                value={formik.values.sexo}
                onBlur={formik.handleBlur}
              >
                <option value="M">Masculino</option>
                <option value="F" selected>
                  Feminino
                </option>
              </select>
              {formik.errors.sexo ? <div>{formik.errors.sexo}</div> : null}
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
