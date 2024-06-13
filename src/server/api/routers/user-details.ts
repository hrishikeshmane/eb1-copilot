import { z } from "zod";

import {
  adminProcedure,
  createTRPCRouter,
  protectedProcedure,
} from "@/server/api/trpc";
import { userInfo, userVisaPillarDetails } from "@/server/db/schema";
import { clerkClient } from "@clerk/nextjs/server";
import {
  formSchema,
  visaPillarFields,
} from "@/app/dashboard/onboarding/_components/form-utils";
import { db } from "@/server/db";
import { eq } from "drizzle-orm";
import { TRPCError } from "@trpc/server";

export const userDetailsRouter = createTRPCRouter({
  addUser: protectedProcedure
    .input(z.object({ formData: formSchema }))
    .mutation(async ({ input, ctx }) => {
      console.log("addUser mutation", input);
      try {
        await db.transaction(async (tx) => {
          await tx.insert(userInfo).values({
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
            everBeenToUS: input.formData.everBeenToUS === "yes" ? true : false,
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
            priorityDateIfAny: JSON.stringify(input.formData.priorityDateIfAny),
            fieldExpertIn: input.formData.fieldExpertIn,
          });

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

  getUserPillarsByUserId: adminProcedure
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

  // Moved to userManagement Router
  // updateUserRole: adminProcedure
  //   .input(z.object({ userId: z.string(), role: z.string() }))
  //   .mutation(async ({ input }) => {
  //     try {
  //       const user = await clerkClient.users.getUser(input.userId);
  //       const userMetaData =
  //         user.publicMetadata as CustomJwtSessionClaims["metadata"];
  //       await clerkClient.users.updateUser(input.userId, {
  //         publicMetadata: { ...userMetaData, role: input.role },
  //       });
  //     } catch (e) {
  //       throw new TRPCError({
  //         code: "INTERNAL_SERVER_ERROR",
  //         message: "Failed to update user role",
  //       });
  //     }
  //   }),
});
