import { z } from "zod";
import {
  createTRPCRouter,
  adminOrCustomerProcedure,
  protectedProcedure,
} from "@/server/api/trpc";
import { and, eq } from "drizzle-orm";
import { tags, ticketTags } from "@/server/db/schema";

export const tagRouter = createTRPCRouter({
  // get all tags in tags table
  getAllAvailableTags: protectedProcedure.query(async ({ ctx }) => {
    const tags = await ctx.db.query.tags.findMany();
    return tags;
  }),

  // create a new tag in tags table
  createTag: adminOrCustomerProcedure
    .input(z.object({ name: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const randomColor = Math.floor(Math.random() * 16777215).toString(16);
      const tag = await ctx.db
        .insert(tags)
        .values({
          name: input.name,
          color: randomColor,
        })
        .returning();

      return tag;
    }),

  // Add a tag to a ticket
  addTagToTicket: adminOrCustomerProcedure
    .input(z.object({ ticketId: z.string(), tagId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db.insert(ticketTags).values({
        ticketId: input.ticketId,
        tagId: input.tagId,
      });
    }),

  // Remove a tag from a ticket
  removeTagFromTicket: adminOrCustomerProcedure
    .input(z.object({ ticketId: z.string(), tagId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db
        .delete(ticketTags)
        .where(
          and(
            eq(ticketTags.ticketId, input.ticketId),
            eq(ticketTags.tagId, input.tagId),
          ),
        );
    }),
});
