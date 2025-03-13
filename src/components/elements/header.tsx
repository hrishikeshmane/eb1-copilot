"use client";

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
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className,
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 flex h-16 w-full items-center border-b border-border/40 bg-background/95 px-4 backdrop-blur backdrop-filter supports-[backdrop-filter]:bg-background/60 lg:px-20">
      <Logo />

      <div className="ml-8 hidden gap-4 text-sm sm:flex">
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Learn</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[400px] gap-3 p-4">
                  <li>
                    <Link
                      className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                      href="https://www.unshackled.club/read-unshackled"
                      target="_blank"
                    >
                      <div className="text-sm font-medium leading-none">
                        Read Unshackled
                      </div>
                      <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                        Read the first book that simplifies legal immigration
                      </p>
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                      href="#"
                    >
                      <div className="text-sm font-medium leading-none">
                        Take a Course
                      </div>
                      <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                        Comprehensive course on talent visas
                      </p>
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                      href="http://unshackled.club/newsletter"
                      target="_blank"
                    >
                      <div className="text-sm font-medium leading-none">
                        Newsletter
                      </div>
                      <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                        Stay updated with our weekly immigration insights
                      </p>
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                      href="http://go.readunshackled.com/webinar"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <div className="text-sm font-medium leading-none">
                        Join a Webinar
                      </div>
                      <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                        Join our interactive webinar sessions
                      </p>
                    </Link>
                  </li>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Explore</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[400px] gap-3 p-4">
                  <li>
                    <Link
                      className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                      href="https://www.unshackled.club/community"
                      target="_blank"
                    >
                      <div className="text-sm font-medium leading-none">
                        Community
                      </div>
                      <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                        Join our vibrant community of ambitious immigrants
                      </p>
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                      href="http://go.readunshackled.com/gci-uac"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <div className="text-sm font-medium leading-none">
                        [NEW] Conference
                      </div>
                      <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                        Attend our upcoming conference
                      </p>
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                      href="https://www.unshackled.club/marketplace"
                      target="_blank"
                    >
                      <div className="text-sm font-medium leading-none">
                        [NEW] Marketplace
                      </div>
                      <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                        All your talent visa needs in one place
                      </p>
                    </Link>
                  </li>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Get EB1 Support</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[400px] gap-3 p-4">
                  <li>
                    <Link
                      className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                      href="/copilot"
                    >
                      <div className="text-sm font-medium leading-none">
                        EB1 Copilot
                      </div>
                      <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                        Get guided support for your EB1 journey
                      </p>
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                      href="https://go.greencard.inc/evaluation"
                    >
                      <div className="text-sm font-medium leading-none">
                        EB1 Autopilot
                      </div>
                      <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                        Automated assistance for your EB1 process
                      </p>
                    </Link>
                  </li>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
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

              <div className="py-2">
                <h3 className="mb-1 font-semibold">Learn</h3>
                <Link
                  className="block py-1 pl-2 text-sm text-muted-foreground hover:text-foreground"
                  href="https://www.unshackled.club/read-unshackled"
                  target="_blank"
                >
                  Read Unshackled
                </Link>
                <Link
                  className="block py-1 pl-2 text-sm text-muted-foreground hover:text-foreground"
                  href="#"
                >
                  Take a Course
                </Link>
                <Link
                  className="block py-1 pl-2 text-sm text-muted-foreground hover:text-foreground"
                  href="#"
                >
                  Join a Webinar
                </Link>
              </div>

              <Separator />

              <div className="py-2">
                <h3 className="mb-1 font-semibold">Explore</h3>
                <Link
                  className="block py-1 pl-2 text-sm text-muted-foreground hover:text-foreground"
                  href="https://www.unshackled.club/community"
                  target="_blank"
                >
                  Community
                </Link>
                <Link
                  className="block py-1 pl-2 text-sm text-muted-foreground hover:text-foreground"
                  href="http://go.readunshackled.com/gci-uac"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  [NEW] Conference
                </Link>
                <Link
                  className="block py-1 pl-2 text-sm text-muted-foreground hover:text-foreground"
                  href="https://www.unshackled.club/marketplace"
                  target="_blank"
                >
                  [NEW] Marketplace
                </Link>
              </div>

              <Separator />

              <div className="py-2">
                <h3 className="mb-1 font-semibold">Get EB1 Support</h3>
                <Link
                  className="block py-1 pl-2 text-sm text-muted-foreground hover:text-foreground"
                  href="/copilot"
                >
                  EB1 Copilot
                </Link>
                <Link
                  className="block py-1 pl-2 text-sm text-muted-foreground hover:text-foreground"
                  href="#"
                >
                  EB1 Autopilot
                </Link>
              </div>

              <div className="mt-4">
                <GetStartedButton className="w-full" />
              </div>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};

export default Header;
