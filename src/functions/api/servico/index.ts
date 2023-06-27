import { AxiosError } from "axios";
import { Servico } from "@/types/Servico";
import api from "../base";

export const servico = {
  listar: async () => {
    try {
      const res = await api.get<Servico[]>(`/servico`);

      return res.data;
    } catch (err) {
      const error = err as AxiosError;

      return error.response;
    }
  },
};
