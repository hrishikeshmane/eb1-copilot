import { createCallerFactory, createTRPCRouter } from "@/server/api/trpc";
import { userDetailsRouter } from "./routers/user-details";
import { waitlistRouter } from "./routers/waitlist";
import { kanbanRouter } from "./routers/kanban";
import { userManagementRouter } from "./routers/user-management";
import { masterList } from "../db/schema";
import { masterListRouter } from "./routers/master-list";
import { commentRouter } from "./routers/comments";
import { tagRouter } from "./routers/tag";

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
  masterList: masterListRouter,
  comment: commentRouter,
  tag: tagRouter,
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
