import { FormikErrors } from "formik";

export type FormRegister = {
  nome: string;
  email: string;
  senha: string;
  sexo: string;
  confirmarSenha: string;
};

export const validateRegister = (values: FormRegister) => {
  let errors: FormikErrors<FormRegister> = {};
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
