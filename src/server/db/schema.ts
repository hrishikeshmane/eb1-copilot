// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { sql } from "drizzle-orm";
import {
  index,
  int,
  sqliteTableCreator,
  text,
  integer,
  primaryKey,
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
    .default(new Date())
    .notNull(),
  updatedAt: int("updatedAt", { mode: "timestamp" }),
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

  // Visa Pillars
  // haveAwards: integer("haveAwards", { mode: "boolean" }).notNull(),
  // awardDetails: text("awardDetails", { length: 2000 }),
  // haveOriginalContribution: integer("haveOriginalContribution", {
  //   mode: "boolean",
  // }).notNull(),
  // originalContributionDetails: text("originalContributionDetails", {
  //   length: 2000,
  // }),
  // haveAuthored: integer("haveAuthored", { mode: "boolean" }).notNull(),
  // authoredDetails: text("authoredDetails", { length: 2000 }),
  // haveJudged: integer("haveJudged", { mode: "boolean" }).notNull(),
  // judgedDetails: text("judgedDetails", { length: 2000 }),
  // havePress: integer("havePress", { mode: "boolean" }).notNull(),
  // pressDetails: text("pressDetails", { length: 2000 }),
  // haveMembership: integer("haveMembership", { mode: "boolean" }).notNull(),
  // membershipDetails: text("membershipDetails", { length: 2000 }),
  // haveCriticalCapacity: integer("haveCriticalCapacity", {
  //   mode: "boolean",
  // }).notNull(),
  // criticalCapacityDetails: text("criticalCapacityDetails", { length: 2000 }),
  // haveExhibited: integer("haveExhibited", { mode: "boolean" }).notNull(),
  // exhibitedDetails: text("exhibitedDetails", { length: 2000 }),
  // haveHighCompensation: integer("haveHighCompensation", {
  //   mode: "boolean",
  // }).notNull(),
  // highCompensationDetails: text("highCompensationDetails", { length: 2000 }),
  // haveCommercialSuccess: integer("haveCommercialSuccess", {
  //   mode: "boolean",
  // }).notNull(),
  // commercialSuccessDetails: text("commercialSuccessDetails", { length: 2000 }),
  // haveVolunteeredOrLed: integer("haveVolunteeredOrLed", {
  //   mode: "boolean",
  // }).notNull(),
  // volunteeredOrLedDetails: text("volunteeredOrLedDetails", { length: 2000 }),
  // haveExpertLORSupport: integer("haveExpertLORSupport", {
  //   mode: "boolean",
  // }).notNull(),
  // expertLORSupportDetails: text("expertLORSupportDetails", { length: 2000 }),
  // haveYourSpace: integer("haveYourSpace", { mode: "boolean" }).notNull(),
  // yourSpaceDetails: text("yourSpaceDetails", { length: 2000 }),
  // haveWorkedWithPrevailingIssues: integer("haveWorkedWithPrevailingIssues", {
  //   mode: "boolean",
  // }).notNull(),
  // workedWithPrevailingIssuesDetails: text("workedWithPrevailingIssuesDetails", {
  //   length: 2000,
  // }),

  createdAt: int("createdAt", { mode: "timestamp" })
    .default(new Date())
    .notNull(),
  updatedAt: int("updatedAt", { mode: "timestamp" })
    .default(new Date())
    .notNull(),
});

export const userVisaPillarDetails = createTable(
  "userVisaPillarDetails",
  {
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
    details: text("details", { length: 2000 }).notNull(),
  },
  (table) => {
    return {
      userIdPillarPK: primaryKey({ columns: [table.userId, table.pillar] }),
    };
  },
);
