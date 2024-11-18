import { z } from "zod";

import {
  adminProcedure,
  createTRPCRouter,
  protectedProcedure,
  adminOrVendorProcedure,
  adminOrCustomerProcedure,
} from "@/server/api/trpc";
import { comments } from "@/server/db/schema";

export const commentRouter = createTRPCRouter({
  getCommentsForTicket: protectedProcedure
    .input(z.object({ ticketId: z.string() }))
    .query(async ({ ctx, input }) => {
      const comments = await ctx.db.query.comments.findMany({
        where: (comments, { eq }) => eq(comments.ticketId, input.ticketId),
        orderBy: (comments, { asc }) => [asc(comments.createdAt)],
      });
      return comments;
    }),

  addCommentToTicket: protectedProcedure
    .input(
      z.object({
        ticketId: z.string(),
        content: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const comment = await ctx.db.insert(comments).values({
        ticketId: input.ticketId,
        content: input.content,
        userId: ctx.session.userId,
      });
      return comment;
    }),
});
