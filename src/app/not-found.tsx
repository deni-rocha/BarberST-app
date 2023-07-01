import { ClientLink } from "@/components/ClientLink";
export default async function NotFound() {
  return (
    <div className="w-full h-screen bg-bgPrimary text-white flex items-center justify-center">
      <div className="w-6/12 h-[200px] bg-bgSecondary flex flex-col items-center justify-center rounded-2xl ">
        <h2 className="text-2xl md:text-lg">Página não encontrada</h2>
        <ClientLink path="/user/home">
          <span className="text-2xl border-b-2 md:text-lg">
            - ir para a página principal -
          </span>
        </ClientLink>
      </div>
    </div>
  );
}
