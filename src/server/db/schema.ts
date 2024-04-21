// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { sql } from "drizzle-orm";
import {
  int,
  sqliteTableCreator,
  text,
  integer,
  primaryKey,
  blob,
} from "drizzle-orm/sqlite-core";

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
  everBeenJ1OrJ2: integer("everBeenJ1OrJ2", { mode: "boolean" }).notNull(),
  haveCriminalRecord: integer("haveCriminalRecord", {
    mode: "boolean",
  }).notNull(),
  addFamilyMembers: integer("addFamilyMembers", { mode: "boolean" }).notNull(),
  currentEmployerInUS: integer("currentEmployerInUS", {
    mode: "boolean",
  }).notNull(),
  interestedIn: text("interestedIn", {
    enum: ["o1A", "o1b", "eb1a", "notSure", "other"],
  }).notNull(),
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
  // details: text("details", { length: 2000 }).notNull(),
  // details: blob("details")
  //   .$type<{ id: string; title: string; detail: string }[]>()
  //   .notNull(),
});
