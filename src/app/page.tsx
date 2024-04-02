import Link from "next/link";

import { api } from "@/trpc/server";

export default async function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center text-white"></main>
  );
}
