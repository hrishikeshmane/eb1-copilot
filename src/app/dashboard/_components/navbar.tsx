"use client";

import Logo from "@/components/elements/logo";
import { cn } from "@/lib/utils";
import { useUser } from "@clerk/nextjs";
import {
  Home,
  KanbanSquareDashedIcon,
  LayoutDashboard,
  Package,
  SquareKanbanIcon,
  UserCog,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const Navbar = () => {
  const pathName = usePathname();
  const { user } = useUser();
  const userMetadata =
    user?.publicMetadata as CustomJwtSessionClaims["metadata"];
  const userRole = userMetadata?.role;

  return (
    <div className="hidden border-r bg-muted/40 md:block">
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
          <Logo />
        </div>
        <div className="flex-1">
          <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
            <Link
              href="/dashboard"
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-secondary-foreground dark:hover:text-primary",
                pathName.endsWith("/dashboard") && "bg-muted text-foreground",
              )}
            >
              <Home className="h-4 w-4" />
              Dashboard
            </Link>

            {userRole === "customer" && (
              <Link
                href="/dashboard/onboarding"
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-secondary-foreground dark:hover:text-primary",
                  pathName.endsWith("/dashboard/onboarding") &&
                    "bg-muted text-foreground",
                )}
              >
                <Package className="h-4 w-4" />
                Onboarding
              </Link>
            )}

            {userRole === "customer" && (
              <Link
                href="/dashboard/builder"
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-secondary-foreground dark:hover:text-primary",
                  pathName.endsWith("/dashboard/builder") &&
                    "bg-muted text-foreground",
                )}
              >
                <SquareKanbanIcon className="h-4 w-4" />
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
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-secondary-foreground dark:hover:text-primary",
                  pathName.endsWith("/dashboard/profile-tracker") &&
                    "bg-muted text-foreground",
                )}
              >
                <LayoutDashboard className="h-4 w-4" />
                Profile Tracker
              </Link>
            )}

            {userRole === "admin" && (
              <Link
                href="/dashboard/ticket-management"
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-secondary-foreground dark:hover:text-primary",
                  pathName.endsWith("/dashboard/ticket-management") &&
                    "bg-muted text-foreground",
                )}
              >
                <KanbanSquareDashedIcon className="h-4 w-4" />
                Ticket Management
              </Link>
            )}

            {userRole === "admin" && (
              <Link
                href="/dashboard/user-management"
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-secondary-foreground dark:hover:text-primary",
                  pathName.endsWith("/dashboard/user-management") &&
                    "bg-muted text-foreground",
                )}
              >
                <UserCog className="h-4 w-4" />
                User Management
              </Link>
            )}
          </nav>
        </div>
        <div className="mt-auto p-4">
          {/* <Card>
              <CardHeader className="p-2 pt-0 md:p-4">
                <CardTitle>Upgrade to Pro</CardTitle>
                <CardDescription>
                  Unlock all features and get unlimited access to our support
                  team.
                </CardDescription>
              </CardHeader>
              <CardContent className="p-2 pt-0 md:p-4 md:pt-0">
                <Button size="sm" className="w-full">
                  Upgrade
                </Button>
              </CardContent>
            </Card> */}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
