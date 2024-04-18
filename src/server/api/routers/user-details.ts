import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { userInfo, userVisaPillarDetails } from "@/server/db/schema";
import { auth, clerkClient } from "@clerk/nextjs/server";
import {
  FormFileds,
  IVisaPillarFields,
  formSchema,
  visaPillarFields,
} from "@/app/dashboard/onboarding/_components/form-utils";
import { db } from "@/server/db";

export const userDetailsRouter = createTRPCRouter({
  addUser: protectedProcedure
    .input(z.object({ formData: formSchema }))
    .mutation(async ({ input, ctx }) => {
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

          currentlyInUS: input.formData.currentlyInUS === "yes" ? true : false,
          everBeenToUS: input.formData.everBeenToUS === "yes" ? true : false,
          everAppliedForGreenCard:
            input.formData.everAppliedForGreenCard === "yes" ? true : false,
          everBeenJ1OrJ2:
            input.formData.everBeenJ1OrJ2 === "yes" ? true : false,
          haveCriminalRecord:
            input.formData.haveCriminalRecord === "yes" ? true : false,
          addFamilyMembers:
            input.formData.addFamilyMembers === "yes" ? true : false,
          currentEmployerInUS:
            input.formData.currentEmployerInUS === "yes" ? true : false,
          interestedIn: input.formData.interestedIn,
          fieldExpertIn: input.formData.fieldExpertIn,
        });

        // await tx.insert(userVisaPillarDetails).values({
        // });
        // go trough each visa pillar from the form  and insert the data
        visaPillarFields.forEach(async (pillar: IVisaPillarFields) => {
          if (input.formData[pillar.key] === "yes") {
            await tx.insert(userVisaPillarDetails).values({
              userId: ctx.session.userId,
              pillar: pillar.pillar,
              details: input.formData[pillar.detailsField] ?? "",
            });
          }
        });
      });
    }),
});
