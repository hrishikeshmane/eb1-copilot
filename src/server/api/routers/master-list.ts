import { z } from "zod";
import {
  adminProcedure,
  createTRPCRouter,
  protectedProcedure,
  adminOrVendorProcedure,
  customerProcedure,
  adminOrCustomerProcedure,
} from "@/server/api/trpc";
import { and, desc, eq } from "drizzle-orm";
import { masterList, masterListTickets, tickets } from "@/server/db/schema";

export const masterListRouter = createTRPCRouter({
  getAll: protectedProcedure.query(async ({ ctx }) => {
    const masterList = await ctx.db.query.masterList.findMany();
    return masterList;
  }),

  addToMasterList: adminProcedure
    .input(z.object({ title: z.string(), description: z.string() }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db.insert(masterList).values({
        title: input.title,
        description: input.description,
      });
    }),

  getAllTicketsByMasterListId: protectedProcedure
    .input(
      z.object({ masterListId: z.string(), customerId: z.string().optional() }),
    )
    .query(async ({ ctx, input }) => {
      const masterTickets = await ctx.db.query.masterListTickets.findMany({
        where: eq(masterListTickets.masterListId, input.masterListId),
      });

      const customerTickets = await ctx.db.query.tickets.findMany({
        where: eq(tickets.customerId, input.customerId ?? ctx.session.userId),
      });

      // filter masterTickets where masterTickets.ticketId is not in customerTickets
      const filtedTickets = masterTickets.filter((masterTicket) => {
        return !customerTickets.some(
          (customerTicket) =>
            customerTicket.masterTickedId === masterTicket.ticketId,
        );
      });
      return filtedTickets;
    }),

  addTicketToMasterList: adminProcedure
    .input(
      z.object({
        masterListId: z.string(),
        title: z.string(),
        description: z.string(),
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
      }),
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.db.insert(masterListTickets).values({
        masterListId: input.masterListId,
        title: input.title,
        description: input.description,
        pillars: input.pillars,
      });
    }),

  editTicket: adminProcedure
    .input(
      z.object({
        ticketId: z.string(),
        title: z.string(),
        description: z.string(),
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
      }),
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.db
        .update(masterListTickets)
        .set({
          title: input.title,
          description: input.description,
          pillars: input.pillars,
        })
        .where(eq(masterListTickets.ticketId, input.ticketId));
    }),

  deleteTicket: adminProcedure
    .input(z.object({ ticketId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db
        .delete(masterListTickets)
        .where(eq(masterListTickets.ticketId, input.ticketId));
    }),

  importTicketsToProfileBuilder: adminOrCustomerProcedure
    .input(
      z.object({
        ticketIds: z.array(z.string()),
        customerId: z.string().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      // get all tickets with ticketIds from master list
      await ctx.db.transaction(async (tx) => {
        const masterTickets = [];
        for (const ticketId of input.ticketIds) {
          const ticket = await tx.query.masterListTickets.findFirst({
            where: eq(masterListTickets.ticketId, ticketId),
          });
          if (ticket) {
            masterTickets.push(ticket);
          }
        }
        // insert tickets into profile builder table
        for (const ticket of masterTickets) {
          await tx.insert(tickets).values({
            title: ticket.title,
            masterTickedId: ticket.ticketId,
            description: ticket.description,
            pillars: ticket.pillars,
            order: 0,
            assigneeId: ctx.session.userId,
            createdBy: ctx.session.userId,
            customerId: input.customerId ?? ctx.session.userId,
          });
        }
      });
    }),

  massAssignTickets: adminProcedure
    .input(
      z.object({
        ticketIds: z.array(z.string()),
        customerIds: z.array(z.string()),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.db.transaction(async (tx) => {
        const masterTickets = [];
        for (const ticketId of input.ticketIds) {
          const ticket = await tx.query.masterListTickets.findFirst({
            where: eq(masterListTickets.ticketId, ticketId),
          });
          if (ticket) {
            masterTickets.push(ticket);
          }
        }

        for (const ticket of masterTickets) {
          for (const customerId of input.customerIds) {
            await tx.insert(tickets).values({
              title: ticket.title,
              masterTickedId: ticket.ticketId,
              description: ticket.description,
              pillars: ticket.pillars,
              order: 0,
              assigneeId: customerId,
              createdBy: ctx.session.userId,
              customerId: customerId,
            });
          }
        }
      });
    }),
});
