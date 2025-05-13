"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ChevronLeft,
  ChevronRight,
  Copy,
  CreditCard,
  File,
  GraduationCap,
  Home,
  KanbanSquareDashedIcon,
  LayoutDashboard,
  LineChart,
  ListFilter,
  MoreVertical,
  Package,
  Package2,
  PanelLeft,
  Search,
  Settings,
  ShoppingCart,
  SquareKanbanIcon,
  Truck,
  UserCog,
  UserRoundCheck,
  Users2,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { usePathname } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { cn } from "@/lib/utils";
import UserAuthButton from "@/components/elements/user-auth-button";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";

export const Navbar2 = () => {
  const pathName = usePathname();
  const { user } = useUser();
  const userMetadata =
    user?.publicMetadata as CustomJwtSessionClaims["metadata"];
  const userRole = userMetadata?.role;

  return (
    <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
      <TooltipProvider>
        <nav className="flex flex-col items-center gap-4 px-2 sm:py-3">
          <Link
            href="/"
            className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full text-lg font-semibold  text-primary-foreground md:h-11 md:w-11 md:text-base"
          >
            {/* <Package2 className="h-4 w-4 transition-all group-hover:scale-110" /> */}
            <Image src="/logo-512.png" alt="logo" width={45} height={45} />
            <span className="sr-only">Greencard Inc</span>
          </Link>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href="/dashboard"
                className={cn(
                  "flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8",
                  pathName === "/dashboard" && "bg-accent text-foreground",
                )}
              >
                <Home className="h-5 w-5" />
                <span className="sr-only">Dashboard</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">Dashboard</TooltipContent>
          </Tooltip>
          {userRole === "customer" && (
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="/dashboard/onboarding"
                  className={cn(
                    "flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8",
                    pathName === "/dashboard/onboarding" &&
                      "bg-accent text-foreground",
                  )}
                >
                  <Package className="h-5 w-5" />
                  <span className="sr-only">Onboaring</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Onboaring</TooltipContent>
            </Tooltip>
          )}

          {userRole === "customer" && (
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="/dashboard/builder"
                  className={cn(
                    "flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8",
                    pathName === "/dashboard/builder" &&
                      "bg-accent text-foreground",
                  )}
                >
                  <SquareKanbanIcon className="h-5 w-5" />

                  <span className="sr-only">Profile Builder</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Profile Builder</TooltipContent>
            </Tooltip>
          )}

          {userRole === "customer" && (
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="/dashboard/profile-tracker"
                  className={cn(
                    "flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8",
                    pathName === "/dashboard/profile-tracker" &&
                      "bg-accent text-foreground",
                  )}
                >
                  <LayoutDashboard className="h-5 w-5" />
                  <span className="sr-only">Profile Tracker</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Profile Tracker</TooltipContent>
            </Tooltip>
          )}

          {userRole === "admin" && (
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="/dashboard/profile-management"
                  className={cn(
                    "flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8",
                    pathName === "/dashboard/profile-management" &&
                      "bg-accent text-foreground",
                  )}
                >
                  <LayoutDashboard className="h-5 w-5" />
                  <span className="sr-only">Admin Management</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Admin Management</TooltipContent>
            </Tooltip>
          )}

          {userRole === "admin" && (
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="/dashboard/master-list"
                  className={cn(
                    "flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8",
                    pathName === "/dashboard/master-list" && "bg-accent",
                  )}
                >
                  <GraduationCap className="h-5 w-5" />
                  <span className="sr-only">Master List</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Master List</TooltipContent>
            </Tooltip>
          )}

          {userRole === "vendor" && (
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="/dashboard/vendor"
                  className={cn(
                    "flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8",
                    pathName === "/dashboard/user-management" &&
                      "bg-accent text-foreground",
                  )}
                >
                  <UserRoundCheck className="h-5 w-5" />
                  <span className="sr-only">Vendor Management</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Vendor Management</TooltipContent>
            </Tooltip>
          )}

          {userRole === "admin" && (
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="/dashboard/admin"
                  className={cn(
                    "flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8",
                    pathName === "/dashboard/user-management" &&
                      "bg-accent text-foreground",
                  )}
                >
                  <UserRoundCheck className="h-5 w-5" />
                  <span className="sr-only">Admin Management</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Admin Management</TooltipContent>
            </Tooltip>
          )}

          {userRole === "admin" && (
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="/dashboard/user-management"
                  className={cn(
                    "flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8",
                    pathName === "/dashboard/user-management" &&
                      "bg-accent text-foreground",
                  )}
                >
                  <UserCog className="h-5 w-5" />
                  <span className="sr-only">User Management</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">User Management</TooltipContent>
            </Tooltip>
          )}
        </nav>
        <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-5">
          {user ? (
            <UserButton afterSignOutUrl="/" />
          ) : (
            <SignInButton mode="modal">
              <Button variant={"secondary"}>Sign in</Button>
            </SignInButton>
          )}
          {/* <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href="#"
                className={cn("flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8", pathName === "" && "bg-accent")}
              >
                <Settings className="h-5 w-5" />
                <span className="sr-only">Settings</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">Settings</TooltipContent>
          </Tooltip> */}
        </nav>
      </TooltipProvider>
    </aside>
  );
};
