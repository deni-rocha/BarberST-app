"use client";

import { ProvideAuth } from "@/Context/AuthContext";
import PrivateRoute from "@/components/PrivateRoute";

export const UserProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <ProvideAuth>
      <PrivateRoute>{children}</PrivateRoute>
    </ProvideAuth>
  );
};
