import { z } from "zod";

import {
  adminOrVendorProcedure,
  adminProcedure,
  createTRPCRouter,
  protectedProcedure,
} from "@/server/api/trpc";
import {
  ISelectUserInfo,
  userInfo,
  userVisaPillarDetails,
  users,
} from "@/server/db/schema";
import { clerkClient } from "@clerk/nextjs/server";
import {
  formSchema,
  visaPillarFields,
} from "@/app/dashboard/onboarding/_components/form-utils";
import { db } from "@/server/db";
import { eq } from "drizzle-orm";
import { TRPCError } from "@trpc/server";
import { sendOnBoardingEmail } from "@/app/_actions/emails/send-onboarding-email";
import { VISA_PILLARS_EX_LIST } from "@/lib/constants";
import { nanoid } from "nanoid";

export const userDetailsRouter = createTRPCRouter({
  addUser: protectedProcedure
    .input(z.object({ formData: formSchema }))
    .mutation(async ({ input, ctx }) => {
      try {
        await db.transaction(async (tx) => {
          const userPersonalInfo: ISelectUserInfo[] = await tx
            .insert(userInfo)
            .values({
              userId: ctx.session.userId,
              consent: input.formData.consent,
              fullName: input.formData.fullName,
              email: input.formData.email,
              phone: input.formData.phone,
              linkedIn: input.formData.linkedIn,
              highestEducation: input.formData.highestEducation,
              major: input.formData.major,
              brithCountry: input.formData.brithCountry,
              nationalityCountry: input.formData.nationalityCountry,
              hearAboutUs: input.formData.hearAboutUs,
              resumeUrl: input.formData.resumeUrl,

              currentlyInUS:
                input.formData.currentlyInUS === "yes" ? true : false,
              everBeenToUS:
                input.formData.everBeenToUS === "yes" ? true : false,
              everAppliedForGreenCard:
                input.formData.everAppliedForGreenCard === "yes" ? true : false,
              addFamilyMembers:
                input.formData.addFamilyMembers === "yes" ? true : false,
              currentEmployerInUS:
                input.formData.currentEmployerInUS === "yes" ? true : false,
              currentVisa: input.formData.currentVisa,
              interestedIn: input.formData.interestedIn,
              isStudent: input.formData.isStudent === "yes" ? true : false,
              graduationYear: input.formData.graduationYear,
              currentRole: input.formData.currentRole,
              industryType: input.formData.industryType,
              priorityDateIfAny: JSON.stringify(
                input.formData.priorityDateIfAny,
              ),
              fieldExpertIn: input.formData.fieldExpertIn,
            })
            .returning();

          // convert above foreach to normal for loop
          for (const pillar of visaPillarFields) {
            if (input.formData[pillar.key] === "yes") {
              const detailsForm = input.formData[pillar.detailsBlob];
              for (const form of detailsForm ?? []) {
                await tx.insert(userVisaPillarDetails).values({
                  id: form.id,
                  userId: ctx.session.userId,
                  pillar: pillar.pillar,
                  title: form.title,
                  detail: form.detail,
                });
              }
            }
          }

          // send onboarding email
          if (userPersonalInfo) {
            try {
              await sendOnBoardingEmail(userPersonalInfo[0]!);
            } catch (e) {
              console.error("Resend Email error: ", e);
            }
          }

          // update the user onboarding status
          const publicMetaData = ctx.session.sessionClaims.metadata;

          await clerkClient.users.updateUserMetadata(ctx.session.userId, {
            publicMetadata: {
              ...publicMetaData,
              onBoarded: true,
            },
          });
        });
      } catch (error) {
        console.error(error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to add user",
          cause: error,
        });
      }
    }),

  addSingularPillarDetails: protectedProcedure
    .input(
      z.object({
        pillar: z.enum([
          "awards",
          "original-contributions",
          "authorship",
          "judging",
          "press",
          "memberships",
          "critical-role",
          "exhibitions",
          "high-remuneration",
          "commercial-success",
          "misc",
        ]),
        title: z.string(),
        detail: z.string(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      try {
        await db.insert(userVisaPillarDetails).values({
          id: nanoid(),
          userId: ctx.session.userId,
          pillar: input.pillar,
          title: input.title,
          detail: input.detail,
        });
      } catch (e) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to add user pillar details",
        });
      }
    }),

  addMultiplePillarDetails: protectedProcedure
    .input(
      z.array(
        z.object({
          pillar: z.enum([
            "awards",
            "original-contributions",
            "authorship",
            "judging",
            "press",
            "memberships",
            "critical-role",
            "exhibitions",
            "high-remuneration",
            "commercial-success",
            "misc",
          ]),
          title: z.string(),
          detail: z.string(),
        }),
      ),
    )
    .mutation(async ({ input, ctx }) => {
      const values = input.map((pillar) => {
        return {
          id: nanoid(),
          userId: ctx.session.userId,
          pillar: pillar.pillar,
          title: pillar.title,
          detail: pillar.detail,
        };
      });
      try {
        await db.insert(userVisaPillarDetails).values(values);
      } catch (e) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to add user pillar details",
        });
      }
    }),

  getUserInfo: protectedProcedure.query(async ({ ctx }) => {
    const userInfoData = await db.query.userInfo.findFirst({
      where: (table) => eq(table.userId, ctx.session.userId),
    });
    return userInfoData;
  }),

  getUserPillars: protectedProcedure.query(async ({ ctx }) => {
    const userPillarData = await db.query.userVisaPillarDetails.findMany({
      where: (table) => eq(table.userId, ctx.session.userId),
    });
    return userPillarData;
  }),

  getUserPillarsByUserId: adminOrVendorProcedure
    .input(z.object({ userId: z.string() }))
    .query(async ({ input }) => {
      const userPillarData = await db.query.userVisaPillarDetails.findMany({
        where: (table) => eq(table.userId, input.userId),
      });
      return userPillarData;
    }),

  updateUserPillarDetailsById: protectedProcedure
    .input(
      z.object({ pillarId: z.string(), title: z.string(), detail: z.string() }),
    )
    .mutation(async ({ input }) => {
      try {
        await db
          .update(userVisaPillarDetails)
          .set({
            title: input.title,
            detail: input.detail,
          })
          .where(eq(userVisaPillarDetails.id, input.pillarId));
      } catch (e) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to update user pillar",
        });
      }
    }),

  getUser: protectedProcedure.query(async ({ ctx }) => {
    try {
      const user = await db.query.users.findFirst({
        where: (table) => eq(table.userId, ctx.session.userId),
      });
      return user;
    } catch (e) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to get user",
      });
    }
  }),

  markUserPriorityCallSheduled: protectedProcedure.mutation(async ({ ctx }) => {
    try {
      await db
        .update(users)
        .set({ priorityCallSheduled: true })
        .where(eq(users.userId, ctx.session.userId));
    } catch (e) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to Mark User with Priority Call Sheduled",
      });
    }
  }),

  getUnsafeUserInfo: protectedProcedure
    .input(z.object({ userId: z.string() }))
    .query(async ({ input }) => {
      const user = await clerkClient.users.getUser(input.userId);
      return user;
    }),
});
