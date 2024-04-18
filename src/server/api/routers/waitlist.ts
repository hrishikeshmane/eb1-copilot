import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";

import { db } from "@/server/db";
import { waitlist } from "@/server/db/schema";

export const waitlistRouter = createTRPCRouter({
  addToWaitlist: publicProcedure
    .input(z.object({ email: z.string() }))
    .mutation(async ({ input }) => {
      await db
        .insert(waitlist)
        .values({
          email: input.email,
        })
        .onConflictDoNothing();
    }),
});
