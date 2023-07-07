import { UserHomeHeader } from "@/components/UserHome/UserHomeHeader";
import { UserHomeMain } from "@/components/UserHome/UserHomeMain";

export default async function UserHomePage() {
  return (
    <div
      className="w-full h-screen bg-bgPrimary relative"
      suppressHydrationWarning // solução para o erro (Warning: Extra attributes from the server)
    >
      <UserHomeHeader />
      <UserHomeMain />
    </div>
  );
}
