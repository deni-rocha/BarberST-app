import { FormikErrors } from "formik";

export type FormLogin = {
  email: string;
  senha: string;
};

export const validateLogin = (values: FormLogin) => {
  let errors: FormikErrors<FormLogin> = {};

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

  return errors;
};
