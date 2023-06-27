import { UserProviders } from "@/providers/UserProviders";
import "./globals.css";

export const metadata = {
  title: "Barber-St",
  description: "Site da barbearia St",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-br">
      <link rel="shortcut icon" href="/icons/icon.svg" type="image/x-icon" />
      <body>
        <UserProviders>{children}</UserProviders>
      </body>
    </html>
  );
}
