import React from "react";
import { ModeToggle } from "./mode-toggle";

import Link from "next/link";
import Logo from "./logo";
import GetStartedButton from "./get-started-button";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 flex h-16 w-full items-center border-b border-border/40 bg-background/95 px-4 backdrop-blur  backdrop-filter supports-[backdrop-filter]:bg-background/60 lg:px-20">
      <Logo />
      <div className="ml-8 flex gap-7 text-sm">
        <Link className="transition-all hover:underline" href="/">
          Home
        </Link>
        <Link className="transition-all hover:underline" href="/blog">
          Blog
        </Link>
        <Link className="transition-all hover:underline" href="/faqs">
          FAQs
        </Link>
        <Link className="transition-all hover:underline" href="/pricing">
          Pricing
        </Link>
      </div>
      <div className="ml-auto flex items-center space-x-4">
        <GetStartedButton />
        <ModeToggle />
      </div>
    </header>
  );
};

export default Header;
