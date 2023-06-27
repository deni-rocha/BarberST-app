import { getCookie } from "cookies-next";

export const checkUserAuthenticated = () => {
  const user = getCookie("user");

  return !!user;
};
