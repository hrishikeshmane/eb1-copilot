import { z } from "zod";

import {
  adminProcedure,
  createTRPCRouter,
  protectedProcedure,
  adminOrVendorProcedure,
  adminOrCustomerProcedure,
} from "@/server/api/trpc";
import { and, eq } from "drizzle-orm";
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

  getCompletedTickets: protectedProcedure.query(async ({ ctx }) => {
    const tickets = await ctx.db.query.tickets.findMany({
      where: (table) =>
        and(eq(table.column, "done"), eq(table.customerId, ctx.session.userId)),
    });

    return tickets;
  }),

  getCompletedTicketsByUserId: adminOrVendorProcedure
    .input(z.object({ userId: z.string() }))
    .query(async ({ ctx, input }) => {
      const tickets = await ctx.db.query.tickets.findMany({
        where: (table) =>
          and(eq(table.column, "done"), eq(table.customerId, input.userId)),
      });

      return tickets;
    }),

  addTicket: adminOrCustomerProcedure
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
        dueDate: z.date().optional(),
        assigneeId: z.string().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      let records = {
        title: input.title,
        description: input.description,
        customerId: input.customerId,
        pillars: input.pillars,
        column: input.column,
        order: input.order,
        assigneeId: input.assigneeId,
        createdBy: ctx.session.userId,
      };
      if (input.dueDate) {
        // @ts-ignore
        records.dueDate = input.dueDate;
      }

      const ticket = await ctx.db.insert(tickets).values(records);
      return ticket;
    }),

  updateTicketColumn: protectedProcedure
    .input(
      z.object({
        ticketId: z.string(),
        column: z.enum(["backlog", "todo", "doing", "review", "done"]),
        // order: z.number(), // we cannot update order coz it need to change order for all other tickets in the column
      }),
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.db
        .update(tickets)
        .set({ column: input.column })
        .where(eq(tickets.ticketId, input.ticketId));
    }),

  updateTicket: adminOrCustomerProcedure
    .input(
      z.object({
        ticketId: z.string(),
        title: z.string(),
        description: z.string().optional().nullable(),
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
        dueDate: z.date().optional(),
        // order: z.number(),
        assigneeId: z.string().optional().nullable(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      let records = {
        title: input.title,
        description: input.description,
        customerId: input.customerId,
        pillars: input.pillars,
        column: input.column,
        assigneeId: input.assigneeId,
        createdBy: ctx.session.userId,
      };
      if (input.dueDate) {
        // @ts-ignore
        records.dueDate = input.dueDate;
      }

      await ctx.db
        .update(tickets)
        .set(records)
        .where(eq(tickets.ticketId, input.ticketId));
    }),

  deleteTicketById: adminOrCustomerProcedure
    .input(z.object({ ticketId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db.delete(tickets).where(eq(tickets.ticketId, input.ticketId));
    }),

  getTicketStats: adminProcedure.query(async ({ ctx }) => {
    // get all open ticket counts that is in backlog and todo in this month and last month
    // get all in progress ticket counts in this month and last month
    // get all done ticket counts in this month and last month
    // get all customer counts in this month and last month
  }),

  getVendorTickets: adminOrVendorProcedure
    .input(z.object({ vendorId: z.string().optional() }))
    .query(async ({ ctx, input }) => {
      const assigneeId = input.vendorId ?? ctx.session.userId;
      const tickets = await ctx.db.query.tickets.findMany({
        where: (table) => eq(table.assigneeId, assigneeId),
      });
      return tickets;
    }),
});
