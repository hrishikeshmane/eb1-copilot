import { z } from "zod";
import {
  adminOrVendorProcedure,
  adminProcedure,
  createTRPCRouter,
  protectedProcedure,
} from "@/server/api/trpc";
import { clerkClient } from "@clerk/nextjs/server";
import { TRPCError } from "@trpc/server";
import { eq } from "drizzle-orm";
import { customerDetails, users } from "@/server/db/schema";
import { TransformedUser } from "@/types/globals";

export const userManagementRouter = createTRPCRouter({
  getAllUsers: adminProcedure.query(async ({ ctx }) => {
    const usersWithInfo = await ctx.db.query.users.findMany({
      with: {
        userInfo: true,
      },
      orderBy: (users, { desc }) => [desc(users.createdAt)],
    });

    const usersWithAdditionalInfo = usersWithInfo.map(
      (user) =>
        ({
          id: user.userId,
          firstName: user.firstName,
          lastName: user.lastName,
          imageUrl: user.imageUrl,
          emailAddresses:
            (user.emailAddresses as { emailAddress: string }[] | null)?.[0]
              ?.emailAddress ?? "",
          onBoarded: user.onBoarded,
          role: user.role,
          priorityCallSheduled: user.priorityCallSheduled,
          phone: user.userInfo?.phone,
          linkedin: user.userInfo?.linkedIn,
          customerPaid: user.customerPaid,
          customerType: user.customerType,
          contactNumber: null,
          disableOnboardingForm: user.disableOnboardingForm,
        }) satisfies TransformedUser as TransformedUser,
    );

    return usersWithAdditionalInfo;
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
      orderBy: "-updated_at",
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

  getUser: protectedProcedure
    .input(z.object({ userId: z.string() }))
    .query(async ({ ctx, input }) => {
      const user = await clerkClient.users.getUser(input.userId);
      return user;
    }),

  // TODO: we should make changes in our code to use DB only instead of clerk. this is a big tech debt
  getUserFromDB: protectedProcedure
    .input(z.object({ userId: z.string() }))
    .query(async ({ ctx, input }) => {
      const user = await ctx.db.query.users.findFirst({
        where: (table) => eq(table.userId, input.userId),
        // with: {
        //   userInfo: true,
        // },
      });
      return user;
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

  disableOnboardingForm: adminProcedure
    .input(z.object({ userId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      try {
        await ctx.db
          .update(users)
          .set({
            disableOnboardingForm: true,
          })
          .where(eq(users.userId, input.userId))
          .execute();
      } catch (e) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to disable Onboarding Form for User",
        });
      }
    }),

  getUserInfoById: adminOrVendorProcedure
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

  getAccountManagerAndResearchAssistants: adminProcedure.query(async () => {
    let emailAddress = [
      "aksakansha9@gmail.com",
      "soumanti2@gmail.com",
      "bswati19@gmail.com",
      "hrishi.mane26@gmail.com",
    ];

    const accountManagers = await clerkClient.users.getUserList({
      emailAddress,
    });

    emailAddress = ["hrishi.mane26@gmail.com"];

    const researchAssistants = await clerkClient.users.getUserList({
      emailAddress,
    });
    return { accountManagers, researchAssistants };
  }),

  addUserToProgram: adminProcedure
    .input(
      z.object({
        userId: z.string(),
        accountMangerId: z.string(),
        researchAssistantId: z.string(),
        customerType: z.enum(["copilot", "autopilot"]),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.db.insert(customerDetails).values({
        userId: input.userId,
        accountManager: input.accountMangerId,
        researchAssistant: input.researchAssistantId,
        customerType: input.customerType,
      });
    }),

  getAllCustomerDetails: adminProcedure
    .input(
      z.object({
        page: z.number().default(1),
        pageSize: z.number().default(100),
      }),
    )
    .query(async ({ ctx, input }) => {
      const customerDetails = await ctx.db.query.customerDetails.findMany({
        limit: input.pageSize,
        offset: (input.page - 1) * input.pageSize,
        with: {
          user: true,
        },
      });
      return customerDetails;
    }),

  updateCustomerDetails: adminProcedure
    .input(
      z.object({
        userId: z.string(),
        accountManager: z.optional(z.string()),
        researchAssistant: z.optional(z.string()),
        profileStatus: z.optional(
          z.enum([
            "onboarding",
            "onboarded",
            "profile-building",
            "filing",
            "i-140-approved",
            "i-485-approved",
            "rfe-issued",
            "drafting-i-485",
            "dropped",
          ]),
        ),
        raIntroCallDone: z.optional(z.boolean()),
        attorneyCall: z.optional(z.boolean()),
        customerType: z.optional(z.enum(["copilot", "autopilot"])),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.db
        .update(customerDetails)
        .set({
          accountManager: input.accountManager,
          researchAssistant: input.researchAssistant,
          profileStatus: input.profileStatus,
          raIntroCallDone: input.raIntroCallDone,
          attorneyCall: input.attorneyCall,
          customerType: input.customerType,
        })
        .where(eq(customerDetails.userId, input.userId))
        .execute();
    }),

  batchUpdateCustomerDetails: adminProcedure
    .input(
      z.object({
        userIds: z.array(z.string()),
        accountManager: z.optional(z.string()),
        researchAssistant: z.optional(z.string()),
        profileStatus: z.optional(
          z.enum([
            "onboarding",
            "onboarded",
            "profile-building",
            "filing",
            "i-140-approved",
            "i-485-approved",
            "rfe-issued",
            "drafting-i-485",
            "dropped",
          ]),
        ),
        raIntroCallDone: z.optional(z.boolean()),
        attorneyCall: z.optional(z.boolean()),
        customerType: z.optional(z.enum(["copilot", "autopilot"])),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      // loop through userIds and update customer details in a single transaction
      await ctx.db.transaction(async (db) => {
        for (const userId of input.userIds) {
          await db
            .update(customerDetails)
            .set({
              accountManager: input.accountManager,
              researchAssistant: input.researchAssistant,
              profileStatus: input.profileStatus,
              raIntroCallDone: input.raIntroCallDone,
              attorneyCall: input.attorneyCall,
              customerType: input.customerType,
            })
            .where(eq(customerDetails.userId, userId))
            .execute();
        }
      });
    }),
});
