import { cookies } from "next/headers";

export const checkUserAuthenticated = () => {
  const cookie = cookies();
  const user = cookie.has("user");

  return user;
};
