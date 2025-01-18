// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { InferSelectModel, relations, sql } from "drizzle-orm";
import {
  int,
  sqliteTableCreator,
  text,
  integer,
  index,
  blob,
} from "drizzle-orm/sqlite-core";
import { createId } from "@paralleldrive/cuid2";
import { type VISA_PILLARS_EX } from "@/lib/constants";
/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = sqliteTableCreator((name) => `eb1-copilot_${name}`);

export const waitlist = createTable("waitlist", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  email: text("email", { length: 256 }).unique(),
});

export const users = createTable("users", {
  userId: text("userId", { length: 256 }).primaryKey().notNull(),
  // clerk fields
  firstName: text("firstName", { length: 256 }),
  lastName: text("lastName", { length: 256 }),
  // fullName: text("fullName", { length: 256 }),
  username: text("username", { length: 256 }),
  hasImage: integer("hasImage", { mode: "boolean" }).default(false),
  imageUrl: text("imageUrl", { length: 256 }),
  primaryEmailAddressId: text("primaryEmailAddressId", { length: 256 }),
  emailAddresses: text("emailAddresses", { mode: "json" }),
  publicMetadata: text("publicMetadata", { mode: "json" }),

  role: text("role", {
    enum: ["admin", "moderator", "customer", "vendor"],
  }).notNull(),
  onBoarded: integer("onBoarded", { mode: "boolean" }).notNull(),

  createdAt: int("createdAt", { mode: "timestamp" })
    .default(sql`(unixepoch())`)
    .notNull(),
  updatedAt: int("updatedAt", { mode: "timestamp" }).default(
    sql`(unixepoch())`,
  ),
  priorityCallSheduled: integer("priorityCallSheduled", {
    mode: "boolean",
  }).default(false),
  // .notNull()
  // TODO: remove customerPaid and customerType from this table
  customerPaid: integer("customerPaid", { mode: "boolean" }).default(false),
  // .notNull()
  customerType: text("customerType", {
    enum: ["unpaid", "copilot", "autopilot"],
  }).default("unpaid"),
  // .notNull()
});

export const customerDetails = createTable("customerDetails", {
  userId: text("userId")
    .notNull()
    .primaryKey()
    .references(() => users.userId, { onDelete: "cascade" }),
  accountManager: text("accountManager", { length: 256 }).references(
    () => users.userId,
    { onDelete: "restrict" },
  ),
  researchAssistant: text("researchAssistant", { length: 256 }).references(
    () => users.userId,
    { onDelete: "restrict" },
  ),
  customerType: text("customerType", {
    enum: ["copilot", "autopilot"],
  }),
  // default date is now
  startDate: blob("dueDate")
    .$type<Date>()
    .default(sql`(date('now'))`),
  raIntroCallDone: integer("raIntroCallDone", { mode: "boolean" }).default(
    false,
  ),
  attorneyCall: integer("attorneyCall", { mode: "boolean" }).default(false),
  profileStatus: text("profileStatus", {
    enum: [
      "onboarding",
      "onboarded",
      "profile-building",
      "filing",
      "i-140-approved",
      "i-485-approved",
      "rfe-issued",
      "drafting-i-485",
      "dropped",
    ],
  }).default("onboarding"),
});

export const customerDetailsRelations = relations(
  customerDetails,
  ({ one }) => ({
    user: one(users, {
      fields: [customerDetails.userId],
      references: [users.userId],
    }),
  }),
);

export const userInfo = createTable("userInfo", {
  userId: text("userId")
    .notNull()
    .primaryKey()
    .references(() => users.userId, { onDelete: "cascade" }),
  consent: integer("consent", { mode: "boolean" }).notNull(),

  //personal info
  fullName: text("fullName", { length: 126 }).notNull(),
  email: text("email", { length: 126 }).notNull(),
  phone: text("phone", { length: 15 }).notNull(),
  linkedIn: text("linkedIn", { length: 126 }).notNull(),
  highestEducation: text("highestEducation", {
    enum: ["phd", "masters", "bachelors", "noDegree", "other"],
  }).notNull(),
  major: text("major", { length: 50 }).notNull(),
  brithCountry: text("brithCountry", { length: 50 }).notNull(),
  nationalityCountry: text("nationalityCountry", {
    length: 50,
  }).notNull(),
  hearAboutUs: text("hearAboutUs", {
    enum: ["socialMedia", "friend", "onlineSearch", "other"],
  }).notNull(),
  resumeUrl: text("resumeUrl", { length: 256 }),

  // Current Status
  currentlyInUS: integer("currentlyInUS", { mode: "boolean" }).notNull(),
  everBeenToUS: integer("everBeenToUS", { mode: "boolean" }).notNull(),
  everAppliedForGreenCard: integer("everAppliedForGreenCard", {
    mode: "boolean",
  }).notNull(),
  addFamilyMembers: integer("addFamilyMembers", { mode: "boolean" }).notNull(),
  currentEmployerInUS: integer("currentEmployerInUS", {
    mode: "boolean",
  }).notNull(),
  currentVisa: text("currentVisa", {
    enum: [
      "b1/b2",
      "f1",
      "j1",
      "h1b",
      "h2a",
      "h2b",
      "l1",
      "o1",
      "eb1",
      "eb2",
      "eb3",
      "other",
    ],
  }).notNull(),
  interestedIn: text("interestedIn", {
    enum: ["o1A", "o1b", "eb1a", "notSure", "other"],
  }).notNull(),
  isStudent: integer("isStudent", { mode: "boolean" }).notNull(),
  graduationYear: text("graduationYear").notNull(),
  currentRole: text("currentRole", { length: 200 }).notNull(),
  industryType: text("industryType", {
    enum: [
      "Manufacturing",
      "Finance",
      "Transportation",
      "Agriculture",
      "Construction",
      "Mining",
      "Retail",
      "Entertainment",
      "Hospitality",
      "Secondary",
      "Quaternary",
      "Tertiary",
      "Energy",
      "Foodservice",
      "Aerospace",
      "Computer and Technology",
      "Fashion",
      "Media",
      "Healthcare",
      "Pharaceutucal",
      "Education",
      "Other",
    ],
  }).notNull(),
  priorityDateIfAny: text("priorityDateIfAny", { length: 300 }),
  fieldExpertIn: text("fieldExpertIn", { length: 50 }).notNull(),

  createdAt: int("createdAt", { mode: "timestamp" })
    .default(sql`(unixepoch())`)
    .notNull(),
  updatedAt: int("updatedAt", { mode: "timestamp" }).default(
    sql`(unixepoch())`,
  ),
});

export const userVisaPillarDetails = createTable("userVisaPillarDetails", {
  id: text("id").primaryKey().notNull(),
  userId: text("userId", { length: 256 })
    .notNull()
    .references(() => users.userId, { onDelete: "cascade" }),
  pillar: text("pillar", {
    enum: [
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
    ],
  }).notNull(),
  title: text("title", { length: 256 }).notNull(),
  detail: text("detail", { length: 2000 }).notNull(),
});

export const usersRelations = relations(users, ({ one }) => ({
  userInfo: one(userInfo, {
    fields: [users.userId],
    references: [userInfo.userId],
  }),
}));

// Kanban board
export const tickets = createTable(
  "tickets",
  {
    ticketId: text("ticketId", { length: 256 })
      .primaryKey()
      .notNull()
      .$defaultFn(createId),
    masterTickedId: text("masterTickedId", { length: 256 }).default(sql`null`),
    title: text("title", { length: 256 }).notNull(),
    description: text("description", { length: 2000 }),
    customerId: text("customerId", { length: 256 })
      .notNull()
      .references(() => users.userId, { onDelete: "cascade" }),
    pillars: blob("pillars", { mode: "json" })
      .$type<VISA_PILLARS_EX[]>()
      .notNull(),
    column: text("column", {
      enum: ["backlog", "todo", "doing", "review", "done"],
    })
      .notNull()
      .default("backlog"),
    order: integer("order").notNull(),
    dueDate: blob("dueDate")
      .$type<Date>()
      .default(sql`null`),
    assigneeId: text("assigneeId", { length: 256 }).references(
      () => users.userId,
      {
        onDelete: "no action",
      },
    ),
    createdBy: text("createdBy", { length: 256 })
      .notNull()
      .references(() => users.userId, { onDelete: "no action" }),
    createdAt: int("createdAt", { mode: "timestamp" })
      .default(sql`(unixepoch())`)
      .notNull(),
    updatedAt: int("updatedAt", { mode: "timestamp" }).default(
      sql`(unixepoch())`,
    ),
  },
  (table) => {
    return {
      customerIdIdx: index("customerId_idx").on(table.customerId),
    };
  },
);

export const masterList = createTable("masterList", {
  id: text("id").primaryKey().notNull().$defaultFn(createId),
  title: text("title", { length: 256 }).notNull(),
  description: text("description", { length: 2000 }).notNull(),
});

export const masterListTickets = createTable(
  "masterListTickets",
  {
    ticketId: text("ticketId", { length: 256 })
      .primaryKey()
      .notNull()
      .$defaultFn(createId),
    masterListId: text("masterListId", { length: 256 })
      .notNull()
      .references(() => masterList.id, { onDelete: "cascade" }),
    title: text("title", { length: 256 }).notNull(),
    description: text("description", { length: 2000 }),
    pillars: blob("pillars", { mode: "json" })
      .$type<VISA_PILLARS_EX[]>()
      .notNull(),
    createdAt: int("createdAt", { mode: "timestamp" })
      .default(sql`(unixepoch())`)
      .notNull(),
    updatedAt: int("updatedAt", { mode: "timestamp" }).default(
      sql`(unixepoch())`,
    ),
  },
  (table) => {
    return {
      masterListIdIdx: index("masterListId_idx").on(table.masterListId),
    };
  },
);

export const comments = createTable("comments", {
  commentId: text("commentId", { length: 256 })
    .primaryKey()
    .notNull()
    .$defaultFn(createId),
  ticketId: text("ticketId", { length: 256 })
    .notNull()
    .references(() => tickets.ticketId, { onDelete: "cascade" }),
  userId: text("userId", { length: 256 })
    .notNull()
    .references(() => users.userId, { onDelete: "cascade" }),
  content: text("content", { length: 2000 }).notNull(),
  createdAt: int("createdAt", { mode: "timestamp" })
    .default(sql`(unixepoch())`)
    .notNull(),
});

export type IUser = typeof users.$inferSelect;
export type ISelectUserInfo = typeof userInfo.$inferSelect;
export type IUsersWithInfo = InferSelectModel<typeof users> & {
  userInfo: InferSelectModel<typeof userInfo> | null;
};
export type ISelectMasterTicket = typeof masterListTickets.$inferSelect;
export type ISelectTickets = typeof tickets.$inferSelect;
export type ISelectUserVisaPillarDetails =
  typeof userVisaPillarDetails.$inferSelect;
export type ISelectComment = typeof comments.$inferSelect;
