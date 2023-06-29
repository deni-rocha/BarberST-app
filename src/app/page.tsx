import Link from "next/link";

export default function Page() {
  return (
    <div>
      <h3>Siga para página de </h3>
      <Link href="/user/login">Login</Link>
    </div>
  );
}
