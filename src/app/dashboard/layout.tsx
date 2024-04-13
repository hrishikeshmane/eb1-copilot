import Link from "next/link";
import {
  CircleUser,
  Home,
  LineChart,
  Menu,
  Package,
  Package2,
  Search,
  ShoppingCart,
  SquareKanbanIcon,
  Users,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ModeToggle } from "@/components/elements/mode-toggle";
import Image from "next/image";
import Logo from "@/components/elements/logo";
import UserAuthButton from "@/components/elements/user-auth-button";
import Navbar from "./_components/navbar";
import NavSheet from "./_components/nav-sheet";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[245px_1fr]">
      <Navbar />
      <div className="flex flex-col">
        <NavSheet />
        <main className="h-[calc(100vh-3.8rem)] w-full">{children}</main>
      </div>
    </div>
  );
}
