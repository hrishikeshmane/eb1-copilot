"use client";

import React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  CircleUser,
  Home,
  KanbanSquareDashedIcon,
  LayoutDashboard,
  LineChart,
  Menu,
  Package,
  Package2,
  Search,
  ShoppingCart,
  SquareKanbanIcon,
  UserCog,
  Users,
} from "lucide-react";
import Logo from "@/components/elements/logo";
import Link from "next/link";
import UserAuthButton from "@/components/elements/user-auth-button";
import { ModeToggle } from "@/components/elements/mode-toggle";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Separator } from "@radix-ui/react-dropdown-menu";
import { useUser } from "@clerk/nextjs";

const NavSheet = () => {
  const pathName = usePathname();
  const { user } = useUser();
  const userMetadata =
    user?.publicMetadata as CustomJwtSessionClaims["metadata"];
  const userRole = userMetadata?.role;

  return (
    <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="shrink-0 md:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="flex flex-col">
          <nav className="grid gap-2 text-lg font-medium">
            <Logo />
            <Separator />
            <Link
              href="/dashboard"
              className={cn(
                "mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-foreground hover:text-foreground",
                pathName.endsWith("/dashboard") && "bg-muted",
              )}
            >
              <Home className="h-5 w-5" />
              Dashboard
            </Link>

            {userRole === "customer" && (
              <Link
                href="/dashboard/onboarding"
                className={cn(
                  "mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-foreground hover:text-foreground",
                  pathName.endsWith("/dashboard/onboarding") && "bg-muted",
                )}
              >
                <Package className="h-5 w-5" />
                Onboaring
              </Link>
            )}

            {userRole === "customer" && (
              <Link
                href="/dashboard/builder"
                className={cn(
                  "mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-foreground hover:text-foreground",
                  pathName.endsWith("/dashboard/builder") && "bg-muted",
                )}
              >
                <SquareKanbanIcon className="h-5 w-5" />
                Profile Builder
              </Link>
            )}
            {/* <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
            6
          </Badge> */}

            {userRole === "customer" && (
              <Link
                href="/dashboard/profile-tracker"
                className={cn(
                  "mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-foreground hover:text-foreground",
                  pathName.endsWith("/dashboard/profile-tracker") && "bg-muted",
                )}
              >
                <LayoutDashboard className="h-5 w-5" />
                Profile Tracker
              </Link>
            )}

            {userRole === "admin" && (
              <Link
                href="/dashboard/ticket-management"
                className={cn(
                  "mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-foreground hover:text-foreground",
                  pathName.endsWith("/dashboard/ticket-management") &&
                    "bg-muted",
                )}
              >
                <KanbanSquareDashedIcon className="h-5 w-5" />
                Ticket Management
              </Link>
            )}

            {userRole === "admin" && (
              <Link
                href="/dashboard/user-management"
                className={cn(
                  "mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-foreground hover:text-foreground",
                  pathName.endsWith("/dashboard/user-management") && "bg-muted",
                )}
              >
                <UserCog className="h-5 w-5" />
                User Management
              </Link>
            )}
          </nav>
          <div className="mt-auto">
            {/* <Card>
              <CardHeader>
                <CardTitle>Upgrade to Pro</CardTitle>
                <CardDescription>
                  Unlock all features and get unlimited access to our support
                  team.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button size="sm" className="w-full">
                  Upgrade
                </Button>
              </CardContent>
            </Card> */}
          </div>
        </SheetContent>
      </Sheet>
      <div className="w-full flex-1">
        {/* <form>
      <div className="relative">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search products..."
          className="w-full appearance-none bg-background pl-8 shadow-none md:w-2/3 lg:w-1/3"
        />
      </div>
    </form> */}
      </div>
      <UserAuthButton />
      <ModeToggle />
    </header>
  );
};

export default NavSheet;
