import "./globals.css";
import { Metadata } from "next";

import { ProvideAuth } from "@/Context/AuthContext";

export const metadata: Metadata = {
  title: "Barber-St",
  description: "Site da barbearia St",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <link rel="shortcut icon" href="/icons/icon.svg" type="image/x-icon" />
      <body>
        <ProvideAuth>{children}</ProvideAuth>
      </body>
    </html>
  );
}
