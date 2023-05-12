import Link from "next/link";

export default function Page() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>
        Início index page,{" "}
        <Link href="/login">
          <button className="bg-bgSecondary text-white p-2 rounded-md">
            página de Login
          </button>
        </Link>
      </h1>
    </main>
  );
}
