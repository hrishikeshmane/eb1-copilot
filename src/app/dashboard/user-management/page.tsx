import React from "react";
import { UserTable } from "./_components/user-table";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

const UserManagementPage = async () => {
  const role = auth().sessionClaims?.metadata.role;
  if (role !== "admin") {
    redirect("/dashboard");
  }

  return (
    <div>
      <UserTable />
    </div>
  );
};

export default UserManagementPage;
