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
import { comments, customerDetails, users } from "@/server/db/schema";
import { type TransformedUser } from "@/types/globals";
import { google } from 'googleapis';
import { env } from "@/env";

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
          createdAt: user.createdAt,
          comments: user.comments,
          dataRoomLink: user.dataRoomLink,
        }) satisfies TransformedUser as TransformedUser,
    );

    return usersWithAdditionalInfo;
  }),

  getAllVendors: adminProcedure.query(async ({ ctx }) => {
    const allVendors = await ctx.db.query.users.findMany({
      where: (table) => eq(table.role, "vendor"),
    });
    return allVendors;
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

  addComment: adminProcedure
    .input(
      z.object({
        userId: z.string(), // customer userId
        comments: z.array(
          z.object({
            comment: z.string(),
            userId: z.string(),
            timestamp: z.string(),
          }),
        ),
        newComment: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      try {
        await ctx.db
          .update(users)
          .set({
            comments: [
              ...input.comments,
              {
                comment: input.newComment,
                userId: ctx.session.userId,
                timestamp: new Date().getTime().toString(),
              },
            ],
          })
          .where(eq(users.userId, input.userId))
          .execute();
      } catch (e) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to add comment for the User",
        });
      }
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
        readEmails: z.array(z.string()),
        writeEmails: z.array(z.string()),
        userName: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      try {
        const existingCustomer = await ctx.db.query.customerDetails.findFirst({
          where: (table) => eq(table.userId, input.userId)
        });
    
        // Check if user has a dataroom
        const user = await ctx.db.query.users.findFirst({
          where: (table) => eq(table.userId, input.userId)
        });
    
        if (existingCustomer) {
          // User already in program, check/create dataroom
          if (!user?.dataRoomLink) {
            // Create dataroom if it doesn't exist
            const dataRoomLink = await createUserDataroom(ctx, input.userId, input.readEmails, input.writeEmails, input.userName);
            return { message: "User already added to program, dataroom created successfully" };
          }
          return { message: "User already added to program" };
        }
    
        // Add user to program
        await ctx.db.insert(customerDetails).values({
          userId: input.userId,
          accountManager: input.accountMangerId,
          researchAssistant: input.researchAssistantId,
          customerType: input.customerType,
        });
        // Create dataroom if it doesn't exist
        if (!user?.dataRoomLink) {
          const dataRoomLink = await createUserDataroom(ctx, input.userId, input.readEmails, input.writeEmails, input.userName);
        }
    
        return { message: "User added to program successfully" };
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to add user to program or create dataroom",
          cause: error instanceof Error ? error.message : 'Unknown error'
        });
      }
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

const GOOGLE_PRIVATE_KEY = env.GOOGLE_PRIVATE_KEY;
const GOOGLE_CLIENT_EMAIL = env.GOOGLE_CLIENT_EMAIL;
const PARENT_FOLDER_ID = env.PARENT_FOLDER_ID;

// Define folder structure
const folderStructure = {
  "All Evidence Documents": {
    "Authorship | Certificates": null,
    "Authorship Paper": null,
    "Awards": null,
    "Book": null,
    "Conference": null,
    "Critical Role | Employment": null,
    "Editorial Board Membership": null,
    "High Salary": null,
    "Judging": null,
    "Memberships": null,
    "Patent": null,
    "Peer Reviews": null,
    "Press Articles": null
  },
  "All Letters": null,
  "Employer Documents": null,
  "Personal Documents": null,
  "Press": null,
  "Resources": {
    "LOR Guide": null,
    "LOR Templates": null
  }
};

// Helper function to create dataroom
async function createUserDataroom(ctx: any, userId: string, readEmails: string[], writeEmails: string[], userName: string) {
  try {
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: GOOGLE_CLIENT_EMAIL,
        private_key: GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      },
      scopes: ['https://www.googleapis.com/auth/drive.file'],
    });

    const drive = google.drive({ version: 'v3', auth });

    // Helper function to create folder and return its ID
    async function createFolder(name: string, parentId: string): Promise<string> {
      const folderMetadata = {
        name: name,
        mimeType: 'application/vnd.google-apps.folder',
        parents: [parentId],
      };

      const folder = await drive.files.create({
        requestBody: folderMetadata,
        fields: 'id',
      });

      if (!folder.data.id) {
        throw new Error(`Failed to create folder: ${name}`);
      }

      return folder.data.id;
    }

    // Recursive function to create folder structure
    async function createFolderStructure(structure: Record<string, any>, parentId: string) {
      for (const [folderName, subFolders] of Object.entries(structure)) {
        const newFolderId = await createFolder(folderName, parentId);
        if (subFolders !== null) {
          await createFolderStructure(subFolders, newFolderId);
        }
      }
    }

    // Check if root folder exists
    // const existingFolder = await drive.files.list({
    //   q: `name='${userName}' and mimeType='application/vnd.google-apps.folder' and '${PARENT_FOLDER_ID}' in parents and trashed=false`,
    //   fields: 'files(id, webViewLink)',
    // });

    // const files = existingFolder.data.files ?? [];
    
    // if (files.length > 0) {
    //   const folderLink = files[0]?.webViewLink ?? '';
    //   await ctx.db
    //     .update(users)
    //     .set({ dataRoomLink: folderLink })
    //     .where(eq(users.userId, userId));
      
    //   return folderLink;
    // }

    // Create root folder
    const rootFolder = await drive.files.create({
      requestBody: {
        name: userName,
        mimeType: 'application/vnd.google-apps.folder',
        parents: [PARENT_FOLDER_ID],
      },
      fields: 'id, webViewLink',
    });

    if (!rootFolder.data.id || !rootFolder.data.webViewLink) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to create root folder",
      });
    }

    // Create folder structure
    await createFolderStructure(folderStructure, rootFolder.data.id);

    // Set permissions for user

    for (const userEmail of readEmails) {
      await drive.permissions.create({
        fileId: rootFolder.data.id,
        requestBody: {
          type: 'user',
          role:'reader',
          emailAddress: userEmail,
        },
        fields: 'id',
      });
    }

    for (const userEmail of writeEmails) {
      await drive.permissions.create({
        fileId: rootFolder.data.id,
        requestBody: {
          type: 'user',
          role:'writer',
          emailAddress: userEmail,
        },
        fields: 'id',
      })
    }

    // Update user's dataRoomLink
    await ctx.db
      .update(users)
      .set({ dataRoomLink: rootFolder.data.webViewLink })
      .where(eq(users.userId, userId));

      return rootFolder.data.webViewLink;
  } catch (error) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Failed to create dataroom",
      cause: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}
