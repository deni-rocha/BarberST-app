"use client";

import { APP_ROUTES } from "@/constants/app-routes";
import { checkUserAuthenticated } from "@/functions/check-user-authenticated";
import { useRouter, usePathname } from "next/navigation";
import { ReactNode, useEffect } from "react";
import Image from "next/image";
import GifLoading from "@/public/gifs/Pulse-1s-200px.gif";
import { checkIsPublicRoute } from "@/functions/check-is-public-route";

type PrivateRouteProps = {
  children: ReactNode;
};

const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const { push } = useRouter();
  const pathName = usePathname();

  const isUserAuthenticated = checkUserAuthenticated();
  const isPublicRoute = checkIsPublicRoute(pathName);

  useEffect(() => {
    if (isPublicRoute) return;

    if (!isUserAuthenticated) {
      push(APP_ROUTES.public.userLogin);
    }
  }, [isUserAuthenticated, push, isPublicRoute]);

  return (
    <>
      {!isPublicRoute && !isUserAuthenticated && (
        <div className="w-screen h-screen bg-bgPrimary flex flex-col justify-center">
          <Image
            src={GifLoading}
            alt="loader"
            className="w-[130px] h-[130px] mx-auto"
          />
        </div>
      )}
      {(isPublicRoute && children) || (isUserAuthenticated && children)}
    </>
  );
};

export default PrivateRoute;
