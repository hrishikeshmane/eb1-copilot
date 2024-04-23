// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { desc, sql } from "drizzle-orm";
import {
  int,
  sqliteTableCreator,
  text,
  integer,
  index,
  unique,
  primaryKey,
  blob,
} from "drizzle-orm/sqlite-core";
import { createId } from "@paralleldrive/cuid2";
import { table } from "console";
import { VISA_PILLARS } from "@/lib/constants";

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
});

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

  // // Current Status
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

// Kanban board
export const tickets = createTable(
  "tickets",
  {
    ticketId: text("ticketId", { length: 256 })
      .primaryKey()
      .notNull()
      .$defaultFn(createId),
    title: text("title", { length: 256 }).notNull(),
    description: text("description", { length: 2000 }),
    customerId: text("boardId", { length: 256 })
      .notNull()
      .references(() => users.userId, { onDelete: "cascade" }),
    pillars: blob("pillars", { mode: "json" })
      .$type<VISA_PILLARS | "misc"[]>()
      .default([])
      .notNull(),
    column: text("columnId", {
      enum: ["backlog", "todo", "doing", "review", "done"],
    })
      .notNull()
      .default("backlog"),
    order: integer("order").notNull(),
    assigneeId: text("userId", { length: 256 }).references(() => users.userId, {
      onDelete: "no action",
    }),
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
