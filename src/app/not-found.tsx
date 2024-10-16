import Header from "@/components/elements/header";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Logo from "@/../public/404.svg";

function NotFoundPage() {
  return (
    <main className="h-full w-full">
      <Header />
      <div className="flex h-[calc(100vh-150px)] w-screen flex-col items-center justify-center">
        <Logo className="h-[20rem]" />
        <h1 className="text-7xl font-black">404</h1>
        <h2 className="text-lg">Page not found</h2>
        <div className="pt-4">
          <Link href="/">
            <Button>Take me Home</Button>
          </Link>
        </div>
      </div>
    </main>
  );
}

export default NotFoundPage;
