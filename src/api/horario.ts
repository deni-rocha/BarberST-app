import { AxiosError } from "axios";
import api from ".";

const horario = {
  datasDisponiveis: async () => {
    try {
      const res = await api.get("/horario/datas-disponiveis");

      return res.data;
    } catch (err) {
      const error = err as AxiosError;

      return error.response;
    }
  },
};

export default horario;
