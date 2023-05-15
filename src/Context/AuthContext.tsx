"use client";

import axios, { AxiosError } from "axios";
import { getCookie, removeCookies, setCookie } from "cookies-next";
import React, { useState, useEffect, useContext, createContext } from "react";

type authType = {
  msg: string;
  token: null | string;
  usuario: null | User;
  register?: (
    email: string,
    fullname: string,
    password: string,
    shippingAddress: string,
    phone: string
  ) => Promise<{
    success: boolean;
    message: string;
  }>;
  login?: (
    email: string,
    senha: string
  ) => Promise<{
    success: boolean;
    message: string;
  }>;
  logout?: () => void;
};

const initialAuth: authType = {
  msg: "",
  token: null,
  usuario: null,
};

const authContext = createContext<authType>(initialAuth);

type User = {
  _id: string;
  email: string;
  nome: string;
  permissao: string;
};

// Envolver os componentes nesse Provider component e acessar o objeto de autenticação
// ... desse modo qualquer child (filho) pode chamar o useAuth
export function ProvideAuth({ children }: { children: React.ReactNode }) {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

// Chamar o hook e permitir a re-renderização caso aconteça alguma mudança
export const useAuth = () => {
  return useContext(authContext);
};

// Provider hook que cria o objeto de autenticação
function useProvideAuth() {
  const [usuario, setUsuario] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const initialAuthUser = getCookie("user");
    const initialAuthToken = getCookie("token");
    if (initialAuthUser && initialAuthToken) {
      const initUser = JSON.parse(initialAuthUser as string);
      const initToken = JSON.parse(initialAuthUser as string);
      setUsuario(initUser);
      setToken(initToken);
    }
  }, []);

  useEffect(() => {
    setCookie("user", usuario);
    setCookie("token", token);
  }, [usuario, token]);

  const register = async (
    email: string,
    nome: string,
    senha: string,
    sexo: string,
    permissao: string
  ) => {
    try {
      const response = await axios.post<authType>(
        `${process.env.publicAuthUrl}/api/v1/auth/register`,
        {
          email,
          nome,
          senha,
          sexo,
          permissao,
        }
      );
      const registerResponse = response.data;

      setUsuario(usuario);
      return {
        success: true,
        message: registerResponse.msg,
      };
    } catch (err) {
      const errResponse = (err as any).response.data;
      let errorMessage: string;
      if (errResponse.error.type === "alreadyExists") {
        errorMessage = errResponse.error.type;
      } else {
        errorMessage = errResponse.error.detail.message;
      }
      return {
        success: false,
        message: errorMessage,
      };
    }
  };

  const login = async (
    email: string,
    senha: string
  ): Promise<{
    success: boolean;
    message: string;
  }> => {
    try {
      const response = await axios.post(
        `${process.env.publicAuthUrl}/auth/login`,
        {
          email,
          senha,
        }
      );
      const loginResponse = response.data;

      const user: User = {
        _id: loginResponse.usuario._id,
        email,
        nome: loginResponse.usuario.nome,
        permissao: loginResponse.usuario.permissao,
      };

      const token = loginResponse.token;
      setUsuario(user);
      setToken(token);
      return {
        success: true,
        message: loginResponse.msg,
      };
    } catch (err) {
      const error = err as AxiosError<{ msg: string }>;

      const msg = error.response?.data.msg;

      return {
        success: false,
        message: msg as string,
      };
    }
  };

  const logout = () => {
    setUsuario(null);
    setToken(null);
    removeCookies("user");
    removeCookies("token");
  };

  // Retorna o objeto de autenticação e os métodos
  return {
    msg: "",
    token,
    usuario,
    register,
    login,
    logout,
  };
}
