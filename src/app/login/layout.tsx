import { ProvideAuth } from "@/Context/AuthContext";

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProvideAuth>
      <div className="w-screen h-screen flex">
        <div className="h-full w-1/2 bg-bgPrimary"></div>
        <div className="h-full w-1/2 bg-bgSecondary"></div>
        {children}
      </div>
    </ProvideAuth>
  );
}
