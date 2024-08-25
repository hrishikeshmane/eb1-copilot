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

  getAllOnBoardedUsers: adminProcedure.query(async ({ ctx }) => {
    //TODO: Paginated user list
    const allUsers = await clerkClient.users.getUserList({
      limit: 500,
    });
    const onboardedUsers = allUsers.filter(
      (user) => user.publicMetadata.onBoarded,
    );
    return onboardedUsers;
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

  updateUserRole: adminProcedure
    .input(z.object({ userId: z.string(), role: z.string() }))
    .mutation(async ({ input }) => {
      try {
        const user = await clerkClient.users.getUser(input.userId);
        const userMetaData =
          user.publicMetadata as CustomJwtSessionClaims["metadata"];
        await clerkClient.users.updateUser(input.userId, {
          publicMetadata: { ...userMetaData, role: input.role },
        });
      } catch (e) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to update user role",
        });
      }
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
