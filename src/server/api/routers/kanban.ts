import { z } from "zod";

import {
  adminProcedure,
  createTRPCRouter,
  protectedProcedure,
  adminOrVendorProcedure,
} from "@/server/api/trpc";
import { auth, clerkClient } from "@clerk/nextjs/server";
import { TRPCError } from "@trpc/server";
import { eq } from "drizzle-orm";
import { tickets } from "@/server/db/schema";

export const kanbanRouter = createTRPCRouter({
  getAllUsersTickets: protectedProcedure.query(async ({ ctx }) => {
    const tickets = await ctx.db.query.tickets.findMany({
      where: (table) => eq(table.customerId, ctx.session.userId),
    });

    return tickets;
  }),

  getTicketsByUserId: adminProcedure
    .input(z.object({ userId: z.string() }))
    .query(async ({ ctx, input }) => {
      const tickets = await ctx.db.query.tickets.findMany({
        where: (table) => eq(table.customerId, input.userId),
      });
      return tickets;
    }),

  addTicket: adminProcedure
    .input(
      z.object({
        title: z.string(),
        description: z.string().optional(),
        customerId: z.string(),
        pillars: z.array(
          z.enum([
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
        ),
        column: z
          .enum(["backlog", "todo", "doing", "review", "done"])
          .optional(),
        order: z.number(),
        assigneeId: z.string().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const ticket = await ctx.db.insert(tickets).values({
        title: input.title,
        description: input.description,
        customerId: input.customerId,
        pillars: input.pillars,
        column: input.column,
        order: input.order,
        assigneeId: input.assigneeId,
        createdBy: ctx.session.userId,
      });

      return ticket;
    }),

  updateTicket: adminOrVendorProcedure
    .input(
      z.object({
        ticketId: z.string(),
        title: z.string(),
        description: z.string().optional(),
        customerId: z.string(),
        pillars: z.array(
          z.enum([
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
        ),
        column: z
          .enum(["backlog", "todo", "doing", "review", "done"])
          .optional(),
        order: z.number(),
        assigneeId: z.string().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.db
        .update(tickets)
        .set({
          title: input.title,
          description: input.description,
          customerId: input.customerId,
          pillars: input.pillars,
          column: input.column,
          order: input.order,
          assigneeId: input.assigneeId,
          createdBy: ctx.session.userId,
        })
        .where(eq(tickets.ticketId, input.ticketId));
    }),
});
