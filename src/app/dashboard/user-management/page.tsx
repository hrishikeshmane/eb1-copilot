import React from "react";
import { UserTable } from "./_components/user-table";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

const UserManagementPage = async () => {
  const role = auth().sessionClaims?.metadata.role;
  if (role !== "admin") {
    redirect("/dashboard");
  }

  return (
    <ScrollArea className="h-full w-full">
      <UserTable />
      <ScrollBar />
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
};

export default UserManagementPage;
