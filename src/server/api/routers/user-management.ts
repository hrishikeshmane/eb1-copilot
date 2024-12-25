import { z } from "zod";

import {
  adminProcedure,
  createTRPCRouter,
  protectedProcedure,
} from "@/server/api/trpc";
import { auth, clerkClient } from "@clerk/nextjs/server";
import { TRPCError } from "@trpc/server";
import { eq } from "drizzle-orm";
import { IUsersWithInfo } from "@/server/db/schema";

export const userManagementRouter = createTRPCRouter({
  getAllUsers: adminProcedure.query(async ({ ctx }) => {
    //TODO: Paginated user list
    const client = await clerkClient();
    const allUsers = await client.users.getUserList({
      orderBy: "-created_at",
      limit: 500,
    });
    const usersWithInfo: IUsersWithInfo[] = await ctx.db.query.users.findMany({
      with: {
        userInfo: true,
      },
    });

    // add fields- phone, linkedIn, priorityCallSheduled in allUsers
    const usersWithAdditionalInfo = allUsers.data.map((user) => {
      const userInfo = usersWithInfo.find(
        (userInfo) => userInfo.userId === user.id,
      );
      return {
        ...user,
        priorityCallSheduled: userInfo?.priorityCallSheduled,
        phone: userInfo?.userInfo?.phone,
        linkedIn: userInfo?.userInfo?.linkedIn,
        customerPaid: userInfo?.customerPaid,
        customerType: userInfo?.customerType,
        createdAt: userInfo?.createdAt,
        updatedAt: userInfo?.updatedAt,
      };
    });
    return usersWithAdditionalInfo;
    // return allUsers;
  }),

  getAllVendors: adminProcedure.query(async ({ ctx }) => {
    const client = await clerkClient();
    const allUsers = await client.users.getUserList({
      limit: 500,
    });
    const vendors = allUsers.data.filter(
      (user) => user.publicMetadata.role === "vendor",
    );
    return vendors;
  }),

  getAllCustomers: adminProcedure.query(async ({ ctx }) => {
    //TODO: Paginated user list
    const client = await clerkClient();
    const allUsers = await client.users.getUserList({
      limit: 500,
    });
    const customers = allUsers.data.filter(
      (user) => user.publicMetadata.role === "customer",
    );
    return customers;
  }),

  getAllOnBoardedUsers: adminProcedure.query(async ({ ctx }) => {
    //TODO: Paginated user list
    const client = await clerkClient();
    const allUsers = await client.users.getUserList({
      orderBy: "-updated_at",
      limit: 500,
    });
    const onboardedUsers = allUsers.data.filter(
      (user) => user.publicMetadata.onBoarded,
    );
    return onboardedUsers;
  }),

  getLatestCustomers: adminProcedure.query(async ({ ctx }) => {
    const client = await clerkClient();
    const allUsers = await client.users.getUserList({
      limit: 7,
    });
    const customers = allUsers.data.filter(
      (user) => user.publicMetadata.role === "customer",
    );
    return customers;
  }),

  getUser: protectedProcedure
    .input(z.object({ userId: z.string() }))
    .query(async ({ ctx, input }) => {
      const client = await clerkClient();
      const user = await client.users.getUser(input.userId);
      return user;
    }),

  updateUserRole: adminProcedure
    .input(z.object({ userId: z.string(), role: z.string() }))
    .mutation(async ({ input }) => {
      try {
        const client = await clerkClient();
        const user = await client.users.getUser(input.userId);
        const userMetaData =
          user.publicMetadata as CustomJwtSessionClaims["metadata"];
        await client.users.updateUser(input.userId, {
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
