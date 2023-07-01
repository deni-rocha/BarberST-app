"use client";

type ClientLinkProps = {
  children: React.ReactNode;
  path: string;
};

// component criado para substituir o <Link /> do next,
// pois não está funcionando como o esperado. A url muda, mas o DOM não rerenderiza.

export const ClientLink = ({ children, path }: ClientLinkProps) => {
  function pushRoute() {
    document.location.pathname = path;
  }

  return (
    <div
      className="cursor-pointer"
      onClick={() => {
        pushRoute();
      }}
    >
      {children}
    </div>
  );
};
