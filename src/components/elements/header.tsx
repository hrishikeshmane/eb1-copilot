import React from "react";
import { ModeToggle } from "./mode-toggle";

import Link from "next/link";
import Logo from "./logo";
import GetStartedButton from "./get-started-button";
import { Button } from "../ui/button";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Separator } from "../ui/separator";
import UserAuthButton from "./user-auth-button";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 flex h-16 w-full items-center border-b border-border/40 bg-background/95 px-4 backdrop-blur  backdrop-filter supports-[backdrop-filter]:bg-background/60 lg:px-20">
      <Logo />
      <div className="ml-8 hidden gap-7 text-sm sm:flex">
        {/* <Link className="transition-all hover:underline" href="/">
          Home
        </Link> */}
        <Link
          className="transition-all hover:underline"
          href="https://www.unshackled.club/marketplace"
          target="_blank"
        >
          [NEW] Marketplace
        </Link>
        <Link
          className="transition-all hover:underline"
          href="https://www.unshackled.club/read-unshackled"
          target="_blank"
        >
          Read Unshackled
        </Link>
        <Link
          className="transition-all hover:underline"
          href="https://www.unshackled.club/community"
          target="_blank"
        >
          Community
        </Link>
        {/* <Link
          className="transition-all hover:underline"
          href="https://www.unshackled.club/find-lawyers"
          target="_blank"
        >
          Find Lawyers
        </Link> */}
        <Link className="transition-all hover:underline" href="/copilot">
          EB1 Copilot
        </Link>
        <Link
          className="transition-all hover:underline"
          target="_blank"
          rel="noopener noreferrer"
          href="http://go.readunshackled.com/gci-uac"
        >
          [NEW] Conference
        </Link>
        {/* <Link className="transition-all hover:underline" href="/blog">
          Blog
        </Link> */}
        {/* <Link className="transition-all hover:underline" href="/blog">
          Blog
        </Link> */}
        {/* <Link className="transition-all hover:underline" href="/pricing">
          Pricing
        </Link> */}
      </div>
      <div className="ml-auto hidden items-center space-x-4 sm:flex">
        <GetStartedButton />
        <UserAuthButton />

        <ModeToggle />
      </div>
      <div className="ml-auto sm:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="flex flex-col">
            <nav className="grid gap-2 text-lg font-medium">
              <Logo />
              <Separator />
              <Link className="transition-all hover:underline" href="/">
                Home
              </Link>
              <Link
                className="transition-all hover:underline"
                href="https://www.unshackled.club/community"
                target="_blank"
              >
                Community
              </Link>
              {/* <Link
                className="transition-all hover:underline"
                href="https://www.unshackled.club/find-lawyers"
                target="_blank"
              >
                Find Lawyers
              </Link> */}
              <Link className="transition-all hover:underline" href="/copilot">
                EB1 Copilot
              </Link>
              <Link
                className="transition-all hover:underline"
                target="_blank"
                rel="noopener noreferrer"
                href="http://go.readunshackled.com/gci-uac"
              >
                [NEW] Conference
              </Link>
              {/* <Link className="transition-all hover:underline" href="/blog">
                Blog
              </Link> */}
              {/* <Link className="transition-all hover:underline" href="/pricing">
                Pricing
              </Link> */}

              {/* <div className="my-2 flex items-center space-x-4">
                <GetStartedButton className="w-full" />
              </div> */}
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};

export default Header;
