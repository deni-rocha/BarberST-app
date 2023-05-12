export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-screen h-screen flex">
      <div className="h-full w-1/2 bg-bgPrimary"></div>
      <div className="h-full w-1/2 bg-bgSecondary"></div>
      {children}
    </div>
  );
}
