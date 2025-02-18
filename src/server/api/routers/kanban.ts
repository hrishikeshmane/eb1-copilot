import { z } from "zod";

import {
  adminProcedure,
  createTRPCRouter,
  protectedProcedure,
  adminOrVendorProcedure,
  adminOrCustomerProcedure,
} from "@/server/api/trpc";
import { and, eq } from "drizzle-orm";
import { tickets, ticketTags } from "@/server/db/schema";
import { TRPCError } from "@trpc/server";

export const kanbanRouter = createTRPCRouter({
  getAllUsersTickets: protectedProcedure.query(async ({ ctx }) => {
    const tickets = await ctx.db.query.tickets.findMany({
      where: (table) => eq(table.customerId, ctx.session.userId),
      with: {
        ticketsToTags: {
          with: {
            tag: true,
          },
        },
      },
    });

    return tickets;
  }),

  getTicketsByUserId: adminProcedure
    .input(z.object({ userId: z.string() }))
    .query(async ({ ctx, input }) => {
      const tickets = await ctx.db.query.tickets.findMany({
        where: (table) => eq(table.customerId, input.userId),
        with: {
          ticketsToTags: {
            with: {
              tag: true,
            },
          },
        },
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
        dueDate: z.union([z.number(), z.date()]).optional(),
        assigneeId: z.string().optional(),
        tagIds: z.string().array().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      // const records = {
      //   title: input.title,
      //   description: input.description,
      //   customerId: input.customerId,
      //   pillars: input.pillars,
      //   column: input.column,
      //   order: input.order,
      //   assigneeId: input.assigneeId,
      //   createdBy: ctx.session.userId,
      // };
      // if (input.dueDate) {
      //   // @ts-ignore
      //   records.dueDate = input.dueDate;
      // }

      // const ticket = await ctx.db.insert(tickets).values(records);
      // return ticket;
      return await ctx.db.transaction(async (tx) => {
        // 1. Prepare ticket data
        const ticketData = {
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
          ticketData.dueDate = new Date(input.dueDate);
        }

        // 2. Insert the new ticket
        const [insertedTicket] = await tx
          .insert(tickets)
          .values(ticketData)
          .returning();

        if (insertedTicket === undefined || insertedTicket === null) {
          tx.rollback();
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: "Failed to create a ticket",
          });
        }

        // 3. Associate tags if provided
        if (input.tagIds && input.tagIds.length > 0) {
          await tx.insert(ticketTags).values(
            input.tagIds.map((tagId) => ({
              ticketId: insertedTicket.ticketId,
              tagId: tagId,
            })),
          );
        }
        // 4. Fetch the created ticket with its tags
        const ticketWithTags = await tx.query.tickets.findFirst({
          where: eq(tickets.ticketId, insertedTicket.ticketId),
          with: {
            ticketsToTags: {
              with: {
                tag: true,
              },
            },
          },
        });

        return ticketWithTags;
      });
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

  updateTicket: protectedProcedure
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
        dueDate: z.union([z.number(), z.date()]).optional(),
        // order: z.number(),
        assigneeId: z.string().optional().nullable(),
        tagIds: z.string().array().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.db.transaction(async (tx) => {
        // 1. Update ticket information
        const records = {
          title: input.title,
          description: input.description,
          customerId: input.customerId,
          pillars: input.pillars,
          column: input.column,
          assigneeId: input.assigneeId,
        };
        if (input.dueDate) {
          // @ts-ignore
          records.dueDate = new Date(input.dueDate);
        }

        await tx
          .update(tickets)
          .set(records)
          .where(eq(tickets.ticketId, input.ticketId));

        // 2. Update tag associations
        if (input.tagIds !== undefined) {
          // Remove existing tag associations
          await tx
            .delete(ticketTags)
            .where(eq(ticketTags.ticketId, input.ticketId));

          // Add new tag associations
          if (input.tagIds.length > 0) {
            await tx.insert(ticketTags).values(
              input.tagIds.map((tagId) => ({
                ticketId: input.ticketId,
                tagId: tagId,
              })),
            );
          }
        }
      });
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
        with: {
          ticketsToTags: {
            with: {
              tag: true,
            },
          },
        },
      });
      return tickets;
    }),
});
