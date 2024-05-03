import { createCallerFactory, createTRPCRouter } from "@/server/api/trpc";
import { userDetailsRouter } from "./routers/user-details";
import { waitlistRouter } from "./routers/waitlist";
import { kanbanRouter } from "./routers/kanban";
import { userManagementRouter } from "./routers/user-management";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  waitlist: waitlistRouter,
  userDetails: userDetailsRouter,
  kanban: kanbanRouter,
  userManagement: userManagementRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

/**
 * Create a server-side caller for the tRPC API.
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.post.all();
 *       ^? Post[]
 */
export const createCaller = createCallerFactory(appRouter);
