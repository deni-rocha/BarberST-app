import { AxiosError } from "axios";
import api from "../base";

export const horario = {
  datasDisponiveis: async (id: string) => {
    try {
      const res = await api.get(`/horario/datas-disponiveis/${id}`);

      return res.data;
    } catch (err) {
      const error = err as AxiosError;

      return error.response;
    }
  },
};
