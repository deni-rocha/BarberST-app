"use client";

import { APP_ROUTES } from "@/constants/app-routes";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";
import { useAuth } from "@/Context/AuthContext";
import Swal from "sweetalert2";

type PrivateRouteProps = {
  children: ReactNode;
};

const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const { push } = useRouter();
  const { usuario } = useAuth();

  useEffect(() => {
    if (!usuario) {
      return push(APP_ROUTES.public.userLogin);
    }

    // alerta de conectado
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "conectado",
      showConfirmButton: false,
      timer: 1500,
      customClass: {
        popup: "popupStyle",
      },
    });
  }, [usuario, push]);

  return <>{children}</>;
};

export default PrivateRoute;
