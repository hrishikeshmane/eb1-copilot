"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ChevronLeft,
  ChevronRight,
  Copy,
  CreditCard,
  File,
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

export const Navbar2 = () => {
  const pathName = usePathname();
  const { user } = useUser();
  const userMetadata =
    user?.publicMetadata as CustomJwtSessionClaims["metadata"];
  const userRole = userMetadata?.role;

  return (
    <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
      <TooltipProvider>
        <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
          <Link
            href="/"
            className="group flex h-9 w-9 md:w-11 md:h-11 shrink-0 items-center justify-center gap-2 rounded-full  text-lg font-semibold text-primary-foreground md:text-base"
          >
            {/* <Package2 className="h-4 w-4 transition-all group-hover:scale-110" /> */}
            <Image src="/logo-512.png" alt="logo" width={45} height={45} />
            <span className="sr-only">Greencard Inc</span>
          </Link>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href="/dashboard"
                className={cn("flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8", pathName === "/dashboard" && "bg-accent")}
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
                  className={cn("flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8", pathName === "/dashboard/onboarding" && "bg-accent")}
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
                className={cn("flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8", pathName === "/dashboard/builder" && "bg-accent")}
                >
                <SquareKanbanIcon className="h-5 w-5" />
                
                <span className="sr-only">Profile Builder</span>
              </Link>
                </TooltipTrigger>
                <TooltipContent side="right">Profile Tracker</TooltipContent>
        </Tooltip>
            )}

{userRole === "customer" && (
    <Tooltip>
              <TooltipTrigger asChild>
              <Link
                href="/dashboard/profile-tracker"
                className={cn("flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8", pathName === "/dashboard/profile-tracker" && "bg-accent")}
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
                href="/dashboard/ticket-management"
                className={cn("flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8", pathName === "/dashboard/ticket-management" && "bg-accent")}
                
                >
                <KanbanSquareDashedIcon className="h-5 w-5" />
                <span className="sr-only">Ticket Management</span>
              </Link>
                </TooltipTrigger>
                <TooltipContent side="right">Ticket Management</TooltipContent>
          </Tooltip>
            )}

            {/* profile-management */}
            {userRole === "admin" && (
              <Tooltip>
              <TooltipTrigger asChild>

              <Link
                href="/dashboard/profile-management"
                className={cn("flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8", pathName === "/dashboard/profile-management" && "bg-accent")}
                  >
                <LayoutDashboard className="h-5 w-5" />
                <span className="sr-only">Profile Management</span>
              </Link>
                </TooltipTrigger>
                <TooltipContent side="right">Profile Management</TooltipContent>
          </Tooltip>
            )}

            {userRole === "admin" && (
              <Tooltip>
              <TooltipTrigger asChild>
              <Link
                href="/dashboard/user-management"
                className={cn("flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8", pathName === "/dashboard/user-management" && "bg-accent")}
              >
                <UserCog className="h-5 w-5" />
                <span className="sr-only">User Managementt</span>
              </Link>
              </TooltipTrigger>
            <TooltipContent side="right">User Management</TooltipContent>
          </Tooltip>
            )}
        </nav>
        <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-5">
          <UserAuthButton/>
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

