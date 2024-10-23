import Link from "next/link";
export default function Home() {
  return (
    <div className="container text-2xl font-bold text-blue-800">
      <div className="flex flex-col">
        <Link href="/admin">/Admin</Link>
        <Link href="/user">/User</Link>
      </div>
    </div>
  );
}
