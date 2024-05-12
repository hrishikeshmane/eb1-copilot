import { z } from "zod";

import { adminProcedure, createTRPCRouter } from "@/server/api/trpc";
import { auth, clerkClient } from "@clerk/nextjs/server";
import { TRPCError } from "@trpc/server";
import { eq } from "drizzle-orm";

export const userManagementRouter = createTRPCRouter({
  getAllUsers: adminProcedure.query(async ({ ctx }) => {
    //TODO: Paginated user list
    const allUsers = await clerkClient.users.getUserList({
      limit: 500,
    });
    return allUsers;
  }),

  getAllVendors: adminProcedure.query(async ({ ctx }) => {
    const allUsers = await clerkClient.users.getUserList({
      limit: 500,
    });
    const vendors = allUsers.filter(
      (user) => user.publicMetadata.role === "vendor",
    );
    return vendors;
  }),

  getAllCustomers: adminProcedure.query(async ({ ctx }) => {
    //TODO: Paginated user list
    const allUsers = await clerkClient.users.getUserList({
      limit: 500,
    });
    const customers = allUsers.filter(
      (user) => user.publicMetadata.role === "customer",
    );
    return customers;
  }),

  getLatestCustomers: adminProcedure.query(async ({ ctx }) => {
    const allUsers = await clerkClient.users.getUserList({
      limit: 7,
    });
    const customers = allUsers.filter(
      (user) => user.publicMetadata.role === "customer",
    );
    return customers;
  }),

  changeUserRole: adminProcedure
    .input(
      z.object({
        userId: z.string(),
        role: z.enum(["admin", "vendor", "customer"]),
      }),
    )
    .mutation(async ({ input }) => {
      const user = await clerkClient.users.getUser(input.userId);
      if (!user) {
        throw new TRPCError({ code: "NOT_FOUND", message: "User not found" });
      }
      await clerkClient.users.updateUser(input.userId, {
        publicMetadata: {
          ...user.publicMetadata,
          role: input.role,
        },
      });
      return user;
    }),

  getUserInfoById: adminProcedure
    .input(
      z.object({
        userId: z.string(),
      }),
    )
    .query(async ({ input, ctx }) => {
      const userInfoData = await ctx.db.query.userInfo.findFirst({
        where: (table) => eq(table.userId, input.userId),
      });
      return userInfoData;
    }),
});
