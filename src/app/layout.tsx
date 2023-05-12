import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

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
      <body className={inter.className}>{children}</body>
    </html>
  );
}
