import React from "react";
import { ModeToggle } from "./mode-toggle";

import Link from "next/link";
import Logo from "./logo";
import { ArrowRightIcon } from "@radix-ui/react-icons";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 flex h-16 w-full items-center border-b border-border/40 bg-background/95 px-4 backdrop-blur  backdrop-filter supports-[backdrop-filter]:bg-background/60 lg:px-20">
      <Logo />
      <div className="ml-auto flex items-center space-x-4">
        <Link
          href="/dashboard"
          className="inline-flex h-9 items-center justify-center gap-1 whitespace-nowrap rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
        >
          Get Started <ArrowRightIcon />
        </Link>
        <ModeToggle />
      </div>
    </header>
  );
};

export default Header;
