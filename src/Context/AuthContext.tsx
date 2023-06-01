"use client";

import axios, { AxiosError } from "axios";
import { getCookie, deleteCookie, setCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import React, { useState, useEffect, useContext, createContext } from "react";

type authType = {
  message: string;
  token: null | string;
  usuario: null | User;
  loading?: boolean;
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
  message: "",
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

  const [loading, setLoading] = useState(true); // para exibir página de carregamento

  const router = useRouter();

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

  // mudar rota para login caso o usuário não exista
  useEffect(() => {
    // tempo de 500ms antes de atualizar a tela, para evitar conflito de componentes mudando bruscamente de tela
    setTimeout(() => {
      setLoading(false);
    }, 600);

    const rotaPublica = "/registrar";

    // essa rota pode ser acessada mesmo que o usuário não esteja autenticado
    if (location.pathname === rotaPublica) return router.push(rotaPublica);

    if (!usuario) {
      // vai para a página de login caso não haja um usuário
      router.push("/login");
    } else {
      // caso exista usuário vai para página principal
      router.push("/");
    }
  }, [usuario, router]);

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
        message: registerResponse.message,
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
        message: loginResponse.message,
      };
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;

      const message = error.response?.data.message;

      console.log(error);
      return {
        success: false,
        message: message as string,
      };
    }
  };

  const logout = () => {
    setUsuario(null);
    setToken(null);
    deleteCookie("user");
    deleteCookie("token");
  };

  // Retorna o objeto de autenticação e os métodos
  return {
    message: "",
    token,
    usuario,
    register,
    login,
    logout,
    loading,
  };
}
